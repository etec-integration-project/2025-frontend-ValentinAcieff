// Convertido a ESM
import { Octokit } from '@octokit/rest';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener el directorio actual en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de la API de GitHub
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Obtener detalles del repositorio desde las variables de entorno
const [owner, repo] = process.env.REPO_NAME.split('/');

const docsDir = path.join(process.cwd(), 'docs');
const issuesDir = path.join(docsDir, 'issues');
const prDir = path.join(docsDir, 'pull-requests');
const milestonesDir = path.join(docsDir, 'milestones');

async function main() {
  try {
    await createDocsStructure();
    await generateMainIndex();
    await generateIssuesDocs();
    await generatePullRequestsDocs();
    await generateMilestonesDocs();
    console.log('📄 Documentación generada exitosamente.');
  } catch (error) {
    console.error('❌ Error al generar la documentación:', error.message);
    process.exit(1);
  }
}

async function createDocsStructure() {
  await fs.ensureDir(docsDir);
  await fs.ensureDir(issuesDir);
  await fs.ensureDir(prDir);
  await fs.ensureDir(milestonesDir);
}

async function generateMainIndex() {
  const content = `# Documentación Automática del Proyecto

Este directorio contiene documentación generada automáticamente basada en la actividad del repositorio.

- [Issues](./issues/README.md): Seguimiento de problemas y tareas
- [Pull Requests](./pull-requests/README.md): Cambios integrados y en progreso
- [Milestones](./milestones/README.md): Hitos y objetivos del proyecto

*Última actualización: ${new Date().toLocaleString()}*
`;
  await fs.writeFile(path.join(docsDir, 'README.md'), content);
}

async function generateIssuesDocs() {
  try {
    const { data: issues } = await octokit.issues.listForRepo({
      owner,
      repo,
      state: 'all',
      per_page: 100,
    });

    const realIssues = issues.filter(issue => !issue.pull_request);
    let indexContent = `# Issues del Proyecto

- Total: ${realIssues.length}
- Abiertas: ${realIssues.filter(i => i.state === 'open').length}
- Cerradas: ${realIssues.filter(i => i.state === 'closed').length}

| ID | Estado | Título | Asignado a | Etiquetas | Creado | Actualizado |
|---|---|---|---|---|---|---|\n`;

    for (const issue of realIssues) {
      const labels = issue.labels.map(label => label.name).join(', ');
      const assignee = issue.assignee ? issue.assignee.login : 'No asignado';
      indexContent += `| [#${issue.number}](./issue-${issue.number}.md) | ${issue.state} | ${issue.title} | ${assignee} | ${labels} | ${new Date(issue.created_at).toLocaleDateString()} | ${new Date(issue.updated_at).toLocaleDateString()} |\n`;
      await generateIssueDetailPage(issue);
    }
    await fs.writeFile(path.join(issuesDir, 'README.md'), indexContent);
  } catch (error) {
    console.error('Error al generar la documentación de issues:', error.message);
  }
}

async function generateIssueDetailPage(issue) {
  try {
    const { data: comments } = await octokit.issues.listComments({
      owner,
      repo,
      issue_number: issue.number,
    });

    let content = `# Issue #${issue.number}: ${issue.title}

- Estado: ${issue.state}
- Creado por: ${issue.user.login}
- Creado el: ${new Date(issue.created_at).toLocaleString()}
- Actualizado el: ${new Date(issue.updated_at).toLocaleString()}

## Descripción
${issue.body || 'Sin descripción'}

## Comentarios
`;

    for (const comment of comments) {
      content += `- ${comment.user.login} comentó el ${new Date(comment.created_at).toLocaleString()}:\n  ${comment.body}\n\n`;
    }
    await fs.writeFile(path.join(issuesDir, `issue-${issue.number}.md`), content);
  } catch (error) {
    console.error(`Error al generar la documentación para issue #${issue.number}:`, error.message);
  }
}

async function generatePullRequestsDocs() {
  try {
    const { data: prs } = await octokit.pulls.list({
      owner,
      repo,
      state: 'all',
      per_page: 100,
    });

    let indexContent = `# Pull Requests del Proyecto

- Total: ${prs.length}
- Abiertos: ${prs.filter(pr => pr.state === 'open').length}
- Cerrados: ${prs.filter(pr => pr.state === 'closed').length}

| ID | Estado | Título | Autor | Branch | Creado | Actualizado |
|---|---|---|---|---|---|---|\n`;

    for (const pr of prs) {
      indexContent += `| [#${pr.number}](./pr-${pr.number}.md) | ${pr.state} | ${pr.title} | ${pr.user.login} | ${pr.head.ref} → ${pr.base.ref} | ${new Date(pr.created_at).toLocaleDateString()} | ${new Date(pr.updated_at).toLocaleDateString()} |\n`;
      await generatePRDetailPage(pr);
    }
    await fs.writeFile(path.join(prDir, 'README.md'), indexContent);
  } catch (error) {
    console.error('Error al generar la documentación de pull requests:', error.message);
  }
}

async function generatePRDetailPage(pr) {
  try {
    let content = `# Pull Request #${pr.number}: ${pr.title}

- Estado: ${pr.state}
- Autor: ${pr.user.login}
- Branch: ${pr.head.ref} → ${pr.base.ref}

## Descripción
${pr.body || 'Sin descripción'}
`;
    await fs.writeFile(path.join(prDir, `pr-${pr.number}.md`), content);
  } catch (error) {
    console.error(`Error al generar la documentación para PR #${pr.number}:`, error.message);
  }
}

async function generateMilestonesDocs() {
  try {
    const { data: milestones } = await octokit.issues.listMilestonesForRepo({
      owner,
      repo,
      state: 'all',
    });

    let indexContent = `# Milestones del Proyecto

| ID | Estado | Título | Progreso | Creado | Actualizado |
|---|---|---|---|---|---|\n`;

    for (const milestone of milestones) {
      const progress = `${Math.round((milestone.closed_issues / (milestone.closed_issues + milestone.open_issues)) * 100)}%`;
      indexContent += `| [#${milestone.number}](./milestone-${milestone.number}.md) | ${milestone.state} | ${milestone.title} | ${progress} | ${new Date(milestone.created_at).toLocaleDateString()} | ${new Date(milestone.updated_at).toLocaleDateString()} |\n`;
      await generateMilestoneDetailPage(milestone);
    }
    await fs.writeFile(path.join(milestonesDir, 'README.md'), indexContent);
  } catch (error) {
    console.error('Error al generar la documentación de milestones:', error.message);
  }
}

async function generateMilestoneDetailPage(milestone) {
  try {
    let content = `# Milestone: ${milestone.title}

- Estado: ${milestone.state}
- Progreso: ${Math.round((milestone.closed_issues / (milestone.closed_issues + milestone.open_issues)) * 100)}%
`;
    await fs.writeFile(path.join(milestonesDir, `milestone-${milestone.number}.md`), content);
  } catch (error) {
    console.error(`Error al generar la documentación para milestone #${milestone.number}:`, error.message);
  }
}

// Ejecutar la función principal
main();