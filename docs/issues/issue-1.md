# Issue #1: Agregar Documentación Automática Basada en Cambios en Milestones, Issues y Pull Requests de GitHub

- Estado: closed
- Creado por: dqmdz-etec
- Creado el: 4/28/2025, 12:53:14 PM
- Actualizado el: 4/29/2025, 12:43:10 PM

## Descripción
# Agregar Documentación Automática Basada en Cambios en Milestones, Issues y Pull Requests de GitHub

## Descripción
Implementar una funcionalidad que genere y actualice automáticamente la documentación basada en los cambios en milestones, issues y pull requests de GitHub. El objetivo es optimizar el proceso de documentación reflejando el progreso y los cambios del proyecto en tiempo real.

## Requerimientos
- **Integración con Milestones**:
  - Extraer títulos, descripciones y fechas de vencimiento de los milestones.
  - Generar una sección de resumen en la documentación para cada milestone, incluyendo su estado (abierto/cerrado) y porcentaje de progreso.
- **Integración con Issues**:
  - Obtener detalles relevantes de los issues (título, descripción, etiquetas, asignados, estado).
  - Clasificar los issues por etiquetas (ej. error, funcionalidad, mejora) en la documentación.
  - Incluir una sección de changelog que se actualice al cerrar issues.
- **Integración con Pull Requests**:
  - Capturar títulos, descripciones, issues relacionados y estado de los pull requests.
  - Documentar los PRs fusionados en una sección de "Notas de Lanzamiento", con enlaces a issues y milestones relacionados.
- **Automatización**:
  - Utilizar GitHub Actions para activar actualizaciones de la documentación en eventos como creación/cierre de issues, fusión de PRs o cambios en milestones.
  - Almacenar la documentación generada en una carpeta designada del repositorio (ej. `docs/`).
  - Soportar el formato Markdown para la documentación generada.
- **Configuración**:
  - Proveer un archivo de configuración (ej. `.github/doc-config.yml`) para personalizar qué milestones, issues o PRs incluir/excluir.
  - Permitir especificar rutas de archivos de salida y plantillas de documentación.

## Criterios de Aceptación
- La documentación se actualiza automáticamente en un máximo de 5 minutos tras un evento relevante de GitHub (cambio en issue, PR o milestone).
- La documentación generada es precisa, bien estructurada y sigue la plantilla configurada.
- Los resúmenes de milestones incluyen métricas de progreso (ej. "80% completado, 4/5 issues cerrados").
- Los issues están agrupados por etiquetas, y los issues cerrados aparecen en el changelog.
- Los PRs fusionados se listan en "Notas de Lanzamiento" con enlaces a issues/milestones relacionados.
- La solución se prueba en un repositorio de ejemplo y maneja casos límite (ej. descripciones faltantes, gran cantidad de issues).
- Se incluye una sección en el README que explica cómo configurar y usar la automatización.

## Detalles Técnicos
- **Herramientas**: GitHub Actions, API de GitHub, biblioteca para generar Markdown (ej. `markdown-it` para Node.js o similar).
- **Lenguaje**: Recomendar Node.js o Python para los scripts, pero abierto a otras sugerencias.
- **Almacenamiento**: Los archivos de documentación deben guardarse en la subcarpeta `docs/` del repositorio.
- **Manejo de Errores**: Gestionar correctamente límites de la API, datos faltantes o configuraciones inválidas.

## Tareas
1. Investigar los endpoints de la API de GitHub para milestones, issues y PRs.
2. Diseñar una plantilla de documentación en Markdown.
3. Crear un flujo de trabajo de GitHub Actions que se active en eventos relevantes.
4. Implementar scripts para obtener datos y generar archivos Markdown.
5. Agregar soporte para un archivo de configuración personalizable.
6. Escribir pruebas para validar la salida de la documentación.
7. Actualizar el README del repositorio con instrucciones de configuración.

## Notas Adicionales
- Considerar la escalabilidad para repositorios con cientos de issues/PRs.
- Asegurar que la solución sea mantenible y extensible para futuras mejoras (ej. soporte para otros formatos como reStructuredText).
- Si es posible, incluir un modo de prueba ("dry-run") para previsualizar cambios en la documentación sin realizar commits.



## Comentarios
