import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importa el router

const app = createApp(App);
app.use(router); // Asegúrate de usar el router aquí
app.mount('#app');
