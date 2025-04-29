Proyecto Frontend Dockerizado

Este proyecto frontend ha sido configurado para ejecutarse dentro de contenedores Docker, lo que facilita su despliegue y asegura consistencia en diferentes entornos.

Requisitos Previos

Antes de comenzar, asegúrate de tener instalado en tu sistema:

Docker

Docker Compose

Instalación y Ejecución

Sigue estos pasos para clonar y ejecutar el proyecto:

Clona este repositorio:

git clone https://github.com/etec-integration-project/2025-frontend-ValentinAcieff.git
cd 2025-frontend-ValentinAcieff

Construye y levanta los contenedores:

docker-compose up --build

Accede a la aplicación en tu navegador:

http://localhost:8080

Nota: Asegúrate de que el puerto 8080 esté disponible en tu máquina. Si has configurado otro puerto en docker-compose.yml, ajusta la URL en consecuencia.

Estructura de Archivos Relacionados con Docker

Dockerfile: Define la imagen Docker para el proyecto frontend.

docker-compose.yml: Orquesta los servicios necesarios para ejecutar la aplicación.

Comandos Útiles

Construir y levantar contenedores:

docker-compose up --build

Detener contenedores:

docker-compose down

Ver logs de los contenedores:

docker-compose logs

Acceder a un contenedor en ejecución:

docker exec -it nombre_del_contenedor sh

Reemplaza nombre_del_contenedor con el nombre real del contenedor que deseas acceder.

Variables de Entorno

Si tu aplicación requiere variables de entorno, puedes definirlas en un archivo .env en la raíz del proyecto. Asegúrate de que este archivo esté incluido en .gitignore para evitar subir información sensible al repositorio.

Notas Adicionales

Configuración de puertos: Si necesitas cambiar el puerto predeterminado, modifica el archivo docker-compose.yml.

Errores comunes:

Error: puerto en uso: Verifica que el puerto especificado esté disponible en tu máquina.

Problemas de acceso: Asegúrate de que Docker esté ejecutándose con permisos adecuados.

Contribuciones

Las contribuciones son bienvenidas. Por favor, sigue las buenas prácticas de desarrollo y asegúrate de que cualquier cambio relacionado con Docker esté bien documentado y probado.

Realiza un fork de este repositorio.

Crea una rama para tu función o corrección: git checkout -b feature/nueva-funcion.

Realiza tus cambios y commitea: git commit -m 'Agrega nueva función'.

Envía un pull request.

Licencia

Este proyecto está licenciado bajo la Licencia Pública General de GNU (GPLv3). Puedes usar, modificar y distribuir el software bajo los términos de esta licencia.

Consulta el archivo LICENSE para más detalles.CON TODO ESTO ESCRITO YA ESTA LO DE LA LICENCIA ?

# my-new-project

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
