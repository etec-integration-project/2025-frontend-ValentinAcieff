FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias para instalar los paquetes
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del backend al contenedor
COPY . .

# Expone el puerto 5000, que es el puerto donde corre tu servidor Express
EXPOSE 5000

# Comando para iniciar la aplicación usando el script "start" definido en package.json
CMD ["npm", "start"]
