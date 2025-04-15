<template>
  <div class="login-page">
    <div class="login-container">
      <!-- Panel Izquierdo - Branding -->
      <div class="brand-panel">
        <div class="brand-content">
          <img src="@/assets/logo.jpg" alt="Sportify Logo" class="brand-logo"/>
          <div class="brand-text">
            <h1>SPORTIFY ELITE</h1>
            <p class="brand-slogan">ALCANZA TU MÁXIMO POTENCIAL</p>
          </div>
          
          <!-- Características destacadas -->
          <div class="features">
            <div class="feature-card">
              <span class="feature-icon">⚡</span>
              <div class="feature-text">
                <h3>Equipamiento Pro</h3>
                <p>Marcas premium seleccionadas</p>
              </div>
            </div>
            <div class="feature-card">
              <span class="feature-icon">🎯</span>
              <div class="feature-text">
                <h3>Asesoría Elite</h3>
                <p>Expertos a tu servicio</p>
              </div>
            </div>
            <div class="feature-card">
              <span class="feature-icon">🏃</span>
              <div class="feature-text">
                <h3>Envío Express</h3>
                <p>Entrega en 24 horas</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Panel Derecho - Formulario -->
      <div class="form-panel">
        <div class="form-container">
          <div class="form-header">
            <h2>Bienvenido de nuevo</h2>
            <p>Accede a tu cuenta para descubrir las últimas novedades</p>
          </div>

          <form @submit.prevent="loginUser" class="login-form">
            <!-- Usuario -->
            <div class="form-group">
              <label>Usuario</label>
              <div class="input-wrapper">
                <span class="input-icon">👤</span>
                <input 
                  v-model="username"
                  type="text"
                  placeholder="Tu nombre de usuario"
                  :class="{ 'error': errors.username }"
                />
              </div>
              <span v-if="errors.username" class="error-text">{{ errors.username }}</span>
            </div>

            <!-- Contraseña -->
            <div class="form-group">
              <div class="password-header">
                <label>Contraseña</label>
                <router-link to="/reset-password" class="forgot-password">
                  ¿Olvidaste tu contraseña?
                </router-link>
              </div>
              <div class="input-wrapper">
                <span class="input-icon">🔒</span>
                <input 
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Tu contraseña"
                  :class="{ 'error': errors.password }"
                />
                <button 
                  type="button"
                  @click="togglePassword"
                  class="toggle-password"
                >
                  {{ showPassword ? '👁️' : '👁️‍🗨️' }}
                </button>
              </div>
              <span v-if="errors.password" class="error-text">{{ errors.password }}</span>
            </div>

            <!-- Remember Me -->
            <div class="remember-me">
              <label class="checkbox-wrapper">
                <input type="checkbox" v-model="rememberMe"/>
                <span class="checkbox-text">Mantener sesión iniciada</span>
              </label>
            </div>

            <!-- Botón Login -->
            <button 
              type="submit" 
              class="login-button"
              :disabled="loading"
            >
              <span v-if="!loading">INICIAR SESIÓN</span>
              <div v-else class="loader"></div>
            </button>

            <!-- Mensaje de estado -->
            <div 
              v-if="message" 
              :class="['status-message', success ? 'success' : 'error']"
            >
              {{ message }}
            </div>

            <!-- Separador -->
            <div class="divider">
              <span>O CONTINÚA CON</span>
            </div>

            <!-- Botones Sociales -->
            <div class="social-login">
              <button type="button" class="social-button google">
                <img src="/google-icon.svg" alt="Google"/>
                <span>Google</span>
              </button>
              <button type="button" class="social-button facebook">
                <img src="/facebook-icon.svg" alt="Facebook"/>
                <span>Facebook</span>
              </button>
            </div>

            <!-- Registro -->
            <p class="register-prompt">
              ¿Nuevo en Sportify? 
              <router-link to="/register" class="register-link">
                Crear cuenta
              </router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserLogin',
  data() {
    return {
      username: '',
      password: '',
      showPassword: false,
      rememberMe: false,
      loading: false,
      success: false,
      message: '',
      errors: {
        username: '',
        password: ''
      }
    };  // Añadido punto y coma aquí
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    validateForm() {
      let isValid = true;
      this.errors = {
        username: '',
        password: ''
      };

      if (!this.username) {
        this.errors.username = 'El usuario es requerido';
        isValid = false;
      }

      if (!this.password) {
        this.errors.password = 'La contraseña es requerida';
        isValid = false;
      }

      return isValid;
    },
    async loginUser() {
      if (!this.validateForm()) return;

      this.loading = true;
      this.message = '';

      try {
        await new Promise(resolve => setTimeout(resolve, 1500));

      const response = await fetch('http://localhost:5000/api/auth/login', { // Ajusta el puerto según tu configuración
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        });

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("La respuesta del servidor no es JSON válido");
        }

        const data = await response.json();

        if (response.ok) {
          this.success = true;
          this.message = '¡Bienvenido de nuevo!';
          setTimeout(() => {
            this.$router.push('/dashboard');
          }, 1000);
        } else {
          throw new Error(data.message || 'Error al iniciar sesión');
        }
      } catch (error) {
        this.success = false;
        if (error.message === "La respuesta del servidor no es JSON válido") {
          this.message = "Error de conexión con el servidor. Por favor, inténtalo más tarde.";
        } else {
          this.message = error.message;
        }
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>


<style scoped>
.login-page {
  min-height: 100vh;
  background: #111111;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.login-container {
  width: 100%;
  max-width: 1200px;
  min-height: 600px;
  display: flex;
  background: #1a1a1a;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

/* Panel de Marca */
.brand-panel {
  width: 45%;
  background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%);
  padding: 3rem;
  position: relative;
  overflow: hidden;
}

.brand-panel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(61, 255, 124, 0.1) 0%, transparent 70%);
}

.brand-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  z-index: 1;
}

.brand-logo {
  width: 120px;
  height: auto;
  margin-bottom: 1rem;
}

.brand-text h1 {
  color: #3DFF7C;
  font-size: 2.5rem;
  font-weight: 800;
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

.features {
  margin-top: 3rem;
}

.feature-card {
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(61, 255, 124, 0.1);
  transition: transform 0.3s ease;
  position: relative;
  overflow: hidden;
}

.feature-card:hover {
  transform: translateX(10px);
}

.feature-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent, rgba(61, 255, 124, 0.1));
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.feature-card:hover::after {
  transform: translateX(0);
}

.feature-icon {
  font-size: 1.5rem;
  margin-right: 1rem;
}

.feature-text h3 {
  color: #3DFF7C;
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}

.feature-text p {
  color: #000000;
  margin: 0;
  font-size: 0.875rem;
  opacity: 0.7;
}

/* Panel de Formulario */
.form-panel {
  flex: 1;
  background: #ffffff;
  padding: 3rem;
  display: flex;
  align-items: center;
}

.form-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.form-header {
  text-align: center;
  margin-bottom: 2.5rem;
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
  animation-delay: 0.2s;
}

.form-header h2 {
  font-size: 2rem;
  color: #111111;
  margin: 0;
  font-weight: 700;
}

.form-header p {
  color: #666666;
  margin-top: 0.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
}

.form-group:nth-child(1) {
  animation-delay: 0.4s;
}

.form-group:nth-child(2) {
  animation-delay: 0.6s;
}

label {
  display: block;
  color: #111111;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.input-wrapper {
  position: relative;
}

input {
  width: 100%;
  padding: 0.875rem 1rem;
  padding-left: 2.5rem;
  background: #f8f8f8;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  color: #333333;
}

input:focus {
  outline: none;
  border-color: #3DFF7C;
  background: #ffffff;
  box-shadow: 0 0 0 4px rgba(61, 255, 124, 0.1);
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666666;
}

.toggle-password {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666666;
  cursor: pointer;
  padding: 0;
}

.password-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.forgot-password {
  color: #000000;
  font-size: 0.875rem;
  text-decoration: none;
  transition: color 0.3s ease;
}

.forgot-password:hover {
  color: #32CD32;
}

.remember-me {
  margin-bottom: 1.5rem;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox-wrapper input {
  width: auto;
  margin-right: 0.5rem;
}

.checkbox-text {
  color: #000000;
  font-size: 0.875rem;
}

.login-button {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(45deg, #3DFF7C, #32CD32);
  color: #111111;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(61, 255, 124, 0.3);
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loader {
  width: 20px;
  height: 20px;
  border: 3px solid #ffffff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
}

.status-message {
  text-align: center;
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
}

.status-message.success {
  background: rgba(61, 255, 124, 0.1);
  color: #32CD32;
}

.status-message.error {
  background: rgba(255, 61, 61, 0.1);
  color: #FF3D3D;
}

.divider {
  text-align: center;
  position: relative;
  margin: 2rem 0;
}

.divider::before,
.divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 35%;
  height: 1px;
  background: #e0e0e0;
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

.divider span {
  background: #ffffff;
  padding: 0 1rem;
  color: #666666;
  font-size: 0.75rem;
  font-weight: 500;
}

.social-login {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
  animation-delay: 0.8s;
}

.social-button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem;
  background: #ffffff;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #111111;
  cursor: pointer;
  transition: all 0.3s ease;
}

.social-button:hover {
  background: #f8f8f8;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.social-button img {
  width: 20px;
  height: 20px;
}

.register-prompt {
  text-align: center;
  color: #666666;
  font-size: 0.875rem;
  margin: 0;
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
  animation-delay: 1s;
}

.register-link {
  color: #3DFF7C;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.register-link:hover {
  color: #32CD32;
}

/* Animaciones */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Estilos para errores */
.error {
  border-color: #FF3D3D !important;
}

.error-text {
  color: #FF3D3D;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

/* Media Queries para Responsividad */
@media (max-width: 1024px) {
  .login-container {
    max-width: 900px;
  }
  
  .brand-panel {
    padding: 2rem;
  }
  
  .brand-text h1 {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
  }
  
  .brand-panel {
    width: 100%;
    padding: 2rem;
    min-height: 300px;
  }
  
  .features {
    display: none;
  }
  
  .form-panel {
    padding: 2rem;
  }
}

@media (max-width: 480px) {
  .login-page {
    padding: 1rem;
  }
  
  .form-header h2 {
    font-size: 1.5rem;
  }
  
  .social-login {
    flex-direction: column;
  }
  
  .login-container {
    border-radius: 12px;
  }
}
</style>