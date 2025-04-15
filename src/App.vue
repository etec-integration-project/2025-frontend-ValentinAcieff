<template>
  <div id="app">
    <header :class="{ 'header-scrolled': isScrolled }">
      <div class="header-content">
        <div class="logo-container">
          <h1>
            <span class="logo-text">Sportify</span>
            
          </h1>
        </div>
        
        <nav>
          <router-link to="/" class="nav-link">
            <i class="fas fa-home"></i>
            <span>Inicio</span>
          </router-link>
          <router-link to="/register" class="nav-link">
            <i class="fas fa-user-plus"></i>
            <span>Registro</span>
          </router-link>
          <router-link to="/login" class="nav-link">
            <i class="fas fa-sign-in-alt"></i>
            <span>Iniciar sesión</span>
          </router-link>
        </nav>

        <div class="header-actions">
          <button class="cart-button">
            <i class="fas fa-shopping-cart"></i>
            <span class="cart-count">0</span>
          </button>
        </div>
      </div>
    </header>
    
    <div class="page-transition">
      <main>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>

    <footer>
      <div class="footer-content">
        <div class="footer-section">
          <h3>Sportify</h3>
          <p>Tu destino premium para equipamiento deportivo de alta calidad.</p>
        </div>
        
        <div class="footer-section">
          <h4>Enlaces Rápidos</h4>
          <ul>
            <li><a href="#">Sobre Nosotros</a></li>
            <li><a href="#">Productos</a></li>
            <li><a href="#">Contacto</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>Síguenos</h4>
          <div class="social-links">
            <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
            <a href="#" class="social-link"><i class="fab fa-facebook"></i></a>
            <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>© 2024 Sportify. Todos los derechos reservados.</p>
        <div class="payment-methods">
          <i class="fab fa-cc-visa"></i>
          <i class="fab fa-cc-mastercard"></i>
          <i class="fab fa-cc-paypal"></i>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isScrolled: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --primary-color: #00ff88;
  --secondary-color: #00ffbb;
  --accent-color: #00ffd5;
  --neon-glow: 0 0 10px rgba(0, 255, 136, 0.5), 0 0 20px rgba(0, 255, 136, 0.3), 0 0 30px rgba(0, 255, 136, 0.1);
  --background-dark: #000000;
  --background-light: #111111;
  --text-primary: #FFFFFF;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --header-bg: rgba(0, 0, 0, 0.95);
  --header-scrolled-bg: rgba(0, 0, 0, 0.98);
}

body {
  font-family: 'Poppins', sans-serif;
  color: var(--text-primary);
  background: var(--background-dark);
  min-height: 100vh;
  line-height: 1.6;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Header Styles */
header {
  background: var(--header-bg);
  backdrop-filter: blur(10px);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(0, 255, 136, 0.1);
}

.header-scrolled {
  background: var(--header-scrolled-bg);
  box-shadow: 0 2px 20px rgba(0, 255, 136, 0.15);
  border-bottom: 1px solid var(--primary-color);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo-text {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: 1px;
  text-shadow: var(--neon-glow);
}

.logo-icon {
  font-size: 1.8rem;
  margin-left: 0.5rem;
  filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.5));
}

/* Navigation */
nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
  transform: translateX(-100%);
  transition: transform 0.4s ease;
}

.nav-link:hover::before {
  transform: translateX(100%);
}

.nav-link i {
  font-size: 1.1rem;
  transition: color 0.3s ease;
}

.nav-link:hover {
  background: rgba(0, 255, 136, 0.1);
  transform: translateY(-2px);
}

.nav-link:hover i {
  color: var(--primary-color);
  text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
}

.nav-link.router-link-active {
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid rgba(0, 255, 136, 0.2);
  box-shadow: inset 0 0 10px rgba(0, 255, 136, 0.1);
}

.nav-link.router-link-active i {
  color: var(--primary-color);
  text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
}

/* Cart Button */
.cart-button {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border: none;
  padding: 0.8rem;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 0 0 15px rgba(0, 255, 136, 0.3);
}

.cart-button:hover {
  transform: scale(1.1);
  box-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
}

.cart-button i {
  color: var(--background-dark);
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #FF4081;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
  box-shadow: 0 0 10px rgba(255, 64, 129, 0.5);
}

/* Rest of the styles remain the same */
main {
  margin-top: 80px;
  flex: 1;
  padding: 2rem;
  max-width: 1400px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

footer {
  background: var(--background-light);
  padding: 4rem 2rem 2rem;
  margin-top: 4rem;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-section h3 {
  color: var(--primary-color);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
}

.footer-section h4 {
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.footer-section p {
  color: var(--text-secondary);
  line-height: 1.8;
}

.footer-section ul {
  list-style: none;
}

.footer-section ul li {
  margin-bottom: 0.8rem;
}

.footer-section ul a {
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.3s ease;
}

.footer-section ul a:hover {
  color: var(--primary-color);
  padding-left: 5px;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  color: var(--text-primary);
  font-size: 1.5rem;
  transition: all 0.3s ease;
}

.social-link:hover {
  color: var(--primary-color);
  transform: translateY(-3px);
  text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
}

.footer-bottom {
  max-width: 1400px;
  margin: 0 auto;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-secondary);
}

.payment-methods {
  display: flex;
  gap: 1rem;
  font-size: 1.5rem;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  nav {
    width: 100%;
    justify-content: center;
  }

  .nav-link span {
    display: none;
  }

  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>