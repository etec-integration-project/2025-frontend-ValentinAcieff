const { Octokit } = require('@octokit/rest');
const fs = require('fs-extra');
const path = require('path');
const marked = require('marked');

// Configuración de la API de GitHub
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Obtener detalles del repositorio desde las variables de entorno
const [owner, repo] = process.env.REPO_NAME.split('/');

// Crear directorios para la documentación
const docsDir = path.join(process.cwd(), 'docs');
const issuesDir = path.join(docsDir, 'issues');
const prDir = path.join(docsDir, 'pull-requests');
const milestonesDir = path.join(docsDir, 'milestones');

async function main() {
  try {
    // Crear estructura de directorios
    await fs.ensureDir(docsDir);
    await fs.ensureDir(issuesDir);
    await fs.ensureDir(prDir);
    await fs.ensureDir(milestonesDir);

    // Generar índice principal de documentación
    await generateMainIndex();

    // Generar documentación para issues, PRs y milestones
    await generateIssuesDocs();
    await generatePullRequestsDocs();
    await generateMilestonesDocs();

    console.log('Documentación generada exitosamente');
  } catch (error) {
    console.error('Error al generar la documentación:', error);
    process.exit(1);
  }
}

async function generateMainIndex() {
  const content = `# Documentación Automática del Proyecto

Este directorio contiene documentación generada automáticamente basada en la actividad del repositorio.

- [Issues](./issues/README.md) - Seguimiento de problemas y tareas
- [Pull Requests](./pull-requests/README.md) - Cambios integrados y en progreso
- [Milestones](./milestones/README.md) - Hitos y objetivos del proyecto

*Última actualización: ${new Date().toLocaleString()}*
`;

  await fs.writeFile(path.join(docsDir, 'README.md'), content);
}

async function generateIssuesDocs() {
  // Obtener todas las issues
  const { data: issues } = await octokit.issues.listForRepo({
    owner,
    repo,
    state: 'all',
    per_page: 100,
  });

  // Filtrar issues reales (excluir PRs que también aparecen como issues)
  const realIssues = issues.filter(issue => !issue.pull_request);

  // Generar índice de issues
  let indexContent = `# Issues del Proyecto

## Resumen
- Total de issues: ${realIssues.length}
- Issues abiertas: ${realIssues.filter(i => i.state === 'open').length}
- Issues cerradas: ${realIssues.filter(i => i.state === 'closed').length}

## Lista de Issues

| ID | Estado | Título | Asignado a | Etiquetas | Creado | Actualizado |
|---|---|---|---|---|---|---|
`;

  // Agregar cada issue a la tabla
  for (const issue of realIssues) {
    const labels = issue.labels.map(label => label.name).join(', ');
    const assignee = issue.assignee ? issue.assignee.login : 'No asignado';
    
    indexContent += `| [#${issue.number}](./issue-${issue.number}.md) | ${issue.state === 'open' ? '🟢 Abierto' : '🔴 Cerrado'} | ${issue.title} | ${assignee} | ${labels} | ${new Date(issue.created_at).toLocaleDateString()} | ${new Date(issue.updated_at).toLocaleDateString()} |\n`;
    
    // Crear archivo detallado para cada issue
    await generateIssueDetailPage(issue);
  }

  await fs.writeFile(path.join(issuesDir, 'README.md'), indexContent);
}

async function generateIssueDetailPage(issue) {
  // Obtener comentarios de la issue
  const { data: comments } = await octokit.issues.listComments({
    owner,
    repo,
    issue_number: issue.number,
  });

  let content = `# Issue #${issue.number}: ${issue.title}

- **Estado:** ${issue.state === 'open' ? '🟢 Abierto' : '🔴 Cerrado'}
- **Creado por:** ${issue.user.login}
- **Creado el:** ${new Date(issue.created_at).toLocaleString()}
- **Actualizado el:** ${new Date(issue.updated_at).toLocaleString()}
`;

  if (issue.assignees && issue.assignees.length > 0) {
    content += `- **Asignado a:** ${issue.assignees.map(a => a.login).join(', ')}\n`;
  }

  if (issue.labels && issue.labels.length > 0) {
    content += `- **Etiquetas:** ${issue.labels.map(l => l.name).join(', ')}\n`;
  }

  if (issue.milestone) {
    content += `- **Milestone:** [${issue.milestone.title}](../milestones/milestone-${issue.milestone.number}.md)\n`;
  }

  content += `\n## Descripción\n\n${issue.body || 'Sin descripción'}\n\n`;

  if (comments.length > 0) {
    content += `## Comentarios\n\n`;
    
    for (const comment of comments) {
      content += `### ${comment.user.login} comentó el ${new Date(comment.created_at).toLocaleString()}\n\n${comment.body || 'Sin contenido'}\n\n---\n\n`;
    }
  }

  await fs.writeFile(path.join(issuesDir, `issue-${issue.number}.md`), content);
}

async function generatePullRequestsDocs() {
  // Obtener todos los pull requests
  const { data: prs } = await octokit.pulls.list({
    owner,
    repo,
    state: 'all',
    per_page: 100,
  });

  // Generar índice de PRs
  let indexContent = `# Pull Requests del Proyecto

## Resumen
- Total de Pull Requests: ${prs.length}
- PRs abiertos: ${prs.filter(pr => pr.state === 'open').length}
- PRs cerrados: ${prs.filter(pr => pr.state === 'closed').length}

## Lista de Pull Requests

| ID | Estado | Título | Autor | Branch | Creado | Actualizado |
|---|---|---|---|---|---|---|
`;

  // Agregar cada PR a la tabla
  for (const pr of prs) {
    indexContent += `| [#${pr.number}](./pr-${pr.number}.md) | ${pr.state === 'open' ? '🟢 Abierto' : pr.merged ? '🟣 Fusionado' : '🔴 Cerrado'} | ${pr.title} | ${pr.user.login} | \`${pr.head.ref}\` → \`${pr.base.ref}\` | ${new Date(pr.created_at).toLocaleDateString()} | ${new Date(pr.updated_at).toLocaleDateString()} |\n`;
    
    // Crear archivo detallado para cada PR
    await generatePRDetailPage(pr);
  }

  await fs.writeFile(path.join(prDir, 'README.md'), indexContent);
}

async function generatePRDetailPage(pr) {
  // Obtener detalles adicionales del PR
  const { data: prDetails } = await octokit.pulls.get({
    owner,
    repo,
    pull_number: pr.number,
  });

  // Obtener comentarios del PR
  const { data: comments } = await octokit.pulls.listReviewComments({
    owner,
    repo,
    pull_number: pr.number,
  });

  // Obtener commits del PR
  const { data: commits } = await octokit.pulls.listCommits({
    owner,
    repo,
    pull_number: pr.number,
  });

  let content = `# Pull Request #${pr.number}: ${pr.title}

- **Estado:** ${pr.state === 'open' ? '🟢 Abierto' : (prDetails.merged ? '🟣 Fusionado' : '🔴 Cerrado')}
- **Autor:** ${pr.user.login}
- **Branch:** \`${pr.head.ref}\` → \`${pr.base.ref}\`
- **Creado el:** ${new Date(pr.created_at).toLocaleString()}
- **Actualizado el:** ${new Date(pr.updated_at).toLocaleString()}
`;

  if (prDetails.merged) {
    content += `- **Fusionado el:** ${new Date(prDetails.merged_at).toLocaleString()}\n`;
    content += `- **Fusionado por:** ${prDetails.merged_by.login}\n`;
  }

  if (prDetails.requested_reviewers && prDetails.requested_reviewers.length > 0) {
    content += `- **Revisores solicitados:** ${prDetails.requested_reviewers.map(r => r.login).join(', ')}\n`;
  }

  content += `\n## Descripción\n\n${pr.body || 'Sin descripción'}\n\n`;

  if (commits.length > 0) {
    content += `## Commits (${commits.length})\n\n`;
    
    for (const commit of commits) {
      content += `- \`${commit.sha.substring(0, 7)}\` - ${commit.commit.message.split('\n')[0]} (${commit.author ? commit.author.login : commit.commit.author.name})\n`;
    }
    
    content += `\n`;
  }

  if (comments.length > 0) {
    content += `## Comentarios de Revisión\n\n`;
    
    for (const comment of comments) {
      content += `### ${comment.user.login} comentó sobre \`${comment.path}\` (línea ${comment.line || comment.original_line})\n\n${comment.body || 'Sin contenido'}\n\n---\n\n`;
    }
  }

  // Obtener los archivos modificados
  try {
    const { data: files } = await octokit.pulls.listFiles({
      owner,
      repo,
      pull_number: pr.number,
    });

    if (files.length > 0) {
      content += `## Archivos Modificados (${files.length})\n\n`;
      
      for (const file of files) {
        const status = file.status === 'added' ? '➕ Añadido' : 
                      file.status === 'removed' ? '❌ Eliminado' : 
                      file.status === 'modified' ? '✏️ Modificado' : 
                      file.status === 'renamed' ? '🔄 Renombrado' : 
                      file.status;
        
        content += `- ${status}: \`${file.filename}\` (${file.additions} adiciones, ${file.deletions} eliminaciones)\n`;
      }
    }
  } catch (error) {
    content += `\n*No se pudieron obtener los archivos modificados.*\n`;
  }

  await fs.writeFile(path.join(prDir, `pr-${pr.number}.md`), content);
}

async function generateMilestonesDocs() {
  // Obtener todos los milestones
  const { data: milestones } = await octokit.issues.listMilestonesForRepo({
    owner,
    repo,
    state: 'all',
  });

  // Generar índice de milestones
  let indexContent = `# Milestones del Proyecto

## Resumen
- Total de Milestones: ${milestones.length}
- Milestones abiertos: ${milestones.filter(m => m.state === 'open').length}
- Milestones cerrados: ${milestones.filter(m => m.state === 'closed').length}

## Lista de Milestones

| ID | Estado | Título | Progreso | Fecha límite | Creado | Actualizado |
|---|---|---|---|---|---|---|
`;

  // Agregar cada milestone a la tabla
  for (const milestone of milestones) {
    const progress = Math.round((milestone.closed_issues / (milestone.closed_issues + milestone.open_issues)) * 100) || 0;
    const dueDateText = milestone.due_on ? new Date(milestone.due_on).toLocaleDateString() : 'No definida';
    
    indexContent += `| [#${milestone.number}](./milestone-${milestone.number}.md) | ${milestone.state === 'open' ? '🟢 Abierto' : '🔴 Cerrado'} | ${milestone.title} | ${progress}% | ${dueDateText} | ${new Date(milestone.created_at).toLocaleDateString()} | ${new Date(milestone.updated_at).toLocaleDateString()} |\n`;
    
    // Crear archivo detallado para cada milestone
    await generateMilestoneDetailPage(milestone);
  }

  await fs.writeFile(path.join(milestonesDir, 'README.md'), indexContent);
}

async function generateMilestoneDetailPage(milestone) {
  // Obtener issues asociadas con este milestone
  const { data: issues } = await octokit.issues.listForRepo({
    owner,
    repo,
    milestone: milestone.number,
    state: 'all',
    per_page: 100,
  });

  // Filtrar issues reales (excluir PRs)
  const realIssues = issues.filter(issue => !issue.pull_request);
  
  // Calcular progreso
  const progress = Math.round((milestone.closed_issues / (milestone.closed_issues + milestone.open_issues)) * 100) || 0;

  let content = `# Milestone: ${milestone.title}

- **Estado:** ${milestone.state === 'open' ? '🟢 Abierto' : '🔴 Cerrado'}
- **Progreso:** ${progress}% (${milestone.closed_issues} cerrados / ${milestone.open_issues} abiertos)
- **Creado el:** ${new Date(milestone.created_at).toLocaleString()}
- **Actualizado el:** ${new Date(milestone.updated_at).toLocaleString()}
`;

  if (milestone.due_on) {
    content += `- **Fecha límite:** ${new Date(milestone.due_on).toLocaleString()}\n`;
  }

  content += `\n## Descripción\n\n${milestone.description || 'Sin descripción'}\n\n`;

  if (realIssues.length > 0) {
    content += `## Issues Relacionados\n\n`;
    
    content += `| ID | Estado | Título | Asignado a | Creado | Actualizado |\n`;
    content += `|---|---|---|---|---|---|\n`;
    
    for (const issue of realIssues) {
      const assignee = issue.assignee ? issue.assignee.login : 'No asignado';
      content += `| [#${issue.number}](../issues/issue-${issue.number}.md) | ${issue.state === 'open' ? '🟢 Abierto' : '🔴 Cerrado'} | ${issue.title} | ${assignee} | ${new Date(issue.created_at).toLocaleDateString()} | ${new Date(issue.updated_at).toLocaleDateString()} |\n`;
    }
  }

  await fs.writeFile(path.join(milestonesDir, `milestone-${milestone.number}.md`), content);
}

// Ejecutar la función principal
main();