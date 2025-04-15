<template>
  <div class="page-container">
    <div class="register-container">
      <div class="logo-section">
        <h1 class="brand-name">Sportify</h1>
        <p class="brand-slogan">Tu destino deportivo</p>
      </div>
      
      <div class="form-card">
        <h2>Crear Cuenta</h2>
        <p class="welcome-text">Únete a la comunidad deportiva más grande</p>
        
        <form @submit.prevent="registerUser" class="form">
          <div class="form-group">
            <label for="username">Nombre de Usuario</label>
            <div class="input-container">
              <input
                type="text"
                id="username"
                v-model="username"
                required
                placeholder="Ej: john.doe"
              />
              <span class="input-icon">👤</span>
            </div>
          </div>

          <div class="form-group">
            <label for="password">Contraseña</label>
            <div class="input-container">
              <input
                type="password"
                id="password"
                v-model="password"
                required
                placeholder="Mínimo 8 caracteres"
              />
              <span class="input-icon">🔒</span>
            </div>
          </div>

          <button type="submit" class="btn-register">
            Crear cuenta
            <span class="btn-icon">→</span>
          </button>
        </form>

        <div class="messages">
          <p v-if="successMessage" class="success">
            <span class="message-icon">✓</span>
            {{ successMessage }}
          </p>
          <p v-if="errorMessage" class="error">
            <span class="message-icon">✕</span>
            {{ errorMessage }}
          </p>
        </div>

        <div class="footer-links">
          <p>¿Ya tienes una cuenta? 
            <router-link to="/login" class="login-link">
              Iniciar sesión
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      successMessage: '',
      errorMessage: ''
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/register', {
          username: this.username,
          password: this.password
        });
        this.successMessage = response.data.message;
        this.errorMessage = '';
      } catch (error) {
        this.successMessage = '';
        this.errorMessage = error.response.data.message || 'Error al registrar el usuario';
      }
    }
  }
};
</script>

<style>
.page-container {
  min-height: 100vh;
  background-color: #111111;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.register-container {
  width: 100%;
  max-width: 480px;
  text-align: center;
}

.logo-section {
  margin-bottom: 2rem;
}

.brand-name {
  color: #3DFF7C;
  font-size: 2.5rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0;
  text-shadow: 0 0 20px rgba(61, 255, 124, 0.3);
}

.brand-slogan {
  color: #ffffff;
  font-size: 1rem;
  margin-top: 0.5rem;
  opacity: 0.8;
}

.form-card {
  background: linear-gradient(145deg, #1a1a1a, #242424);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(61, 255, 124, 0.1);
}

h2 {
  color: #ffffff;
  font-size: 1.75rem;
  margin: 0 0 0.5rem 0;
}

.welcome-text {
  color: #888888;
  font-size: 0.9rem;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

label {
  display: block;
  color: #ffffff;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
}

input {
  width: 100%;
  padding: 0.875rem 1rem;
  padding-right: 2.5rem;
  background-color: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(61, 255, 124, 0.1);
  border-radius: 12px;
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.3s ease;
}

input::placeholder {
  color: #666666;
}

input:focus {
  outline: none;
  border-color: #3DFF7C;
  background-color: rgba(61, 255, 124, 0.05);
  box-shadow: 0 0 0 4px rgba(61, 255, 124, 0.1);
}

.input-icon {
  position: absolute;
  right: 1rem;
  color: #666666;
  font-size: 1.2rem;
}

.btn-register {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(45deg, #3DFF7C, #32CD32);
  color: #111111;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.btn-register:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(61, 255, 124, 0.3);
}

.btn-icon {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.btn-register:hover .btn-icon {
  transform: translateX(4px);
}

.messages {
  margin: 1.5rem 0;
}

.success, .error {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
}

.success {
  background-color: rgba(61, 255, 124, 0.1);
  color: #3DFF7C;
}

.error {
  background-color: rgba(255, 61, 61, 0.1);
  color: #FF3D3D;
}

.message-icon {
  font-size: 1.1rem;
}

.footer-links {
  margin-top: 1.5rem;
  color: #888888;
  font-size: 0.9rem;
}

.login-link {
  color: #3DFF7C;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.login-link:hover {
  color: #32CD32;
  text-decoration: underline;
}

@media (max-width: 480px) {
  .register-container {
    padding: 1rem;
  }
  
  .form-card {
    padding: 1.5rem;
  }
  
  .brand-name {
    font-size: 2rem;
  }
}
</style>