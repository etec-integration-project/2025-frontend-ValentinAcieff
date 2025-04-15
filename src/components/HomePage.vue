<template>
  <div class="home-container">
    <!-- Hero Carousel Section -->
    <div class="carousel">
      <div class="carousel-container">
        <div 
          class="carousel-track" 
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          @mouseenter="stopAutoplay"
          @mouseleave="startAutoplay"
        >
          <div 
            v-for="(slide, index) in slides" 
            :key="index" 
            class="carousel-slide"
          >
            <div class="image-overlay"></div>
            <img 
              :src="slide.image" 
              :alt="slide.title" 
              class="carousel-image"
              :class="{ 'active': currentSlide === index }"
            >
            <div 
              class="carousel-content"
              :class="{ 'active': currentSlide === index }"
            >
              <div class="content-wrapper">
                <span class="pre-title">Nueva Colección</span>
                <h2>{{ slide.title }}</h2>
                <p>{{ slide.description }}</p>
                <button class="cta-button">
                  Explorar Ahora
                  <span class="arrow">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Controls -->
      <div class="navigation-controls">
        <button 
          @click="prevSlide" 
          class="carousel-button prev" 
          aria-label="Previous slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
        
        <div class="carousel-indicators">
          <button 
            v-for="(slide, index) in slides" 
            :key="index"
            @click="goToSlide(index)"
            :class="['carousel-indicator', { active: currentSlide === index }]"
            :aria-label="`Go to slide ${index + 1}`"
          >
            <span class="indicator-label">{{ slide.title.split(' ')[0] }}</span>
          </button>
        </div>

        <button 
          @click="nextSlide" 
          class="carousel-button next" 
          aria-label="Next slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <!-- Progress Bar -->
      <div class="progress-container">
        <div 
          class="progress-bar" 
          :style="{ width: `${(currentSlide + 1) * (100 / slides.length)}%` }"
        ></div>
      </div>
    </div>

    <!-- Featured Categories -->
    <div class="featured-categories">
      <h3 class="section-title">Categorías Destacadas</h3>
      <div class="categories-grid">
        <div 
          v-for="(category, index) in featuredCategories" 
          :key="index" 
          class="category-card"
        >
          <div class="category-image">
            <img :src="category.image" :alt="category.name">
          </div>
          <h4>{{ category.name }}</h4>
          <p>{{ category.itemCount }} productos</p>
        </div>
      </div>
    </div>
  </div>

  <div>
    

  </div>
</template>

<script>


export default {

  

  
  name: 'HomePage',
  data() {
    return {
      currentSlide: 0,
      slides: [
        {
          image: require('@/assets/categories/basketball.jpg'),
          title: 'EQUIPAMIENTO DEPORTIVO PREMIUM',
          description: 'Descubre nuestra nueva colección de indumentaria deportiva de alta calidad'
        },
        {
          image: require('@/assets/categories/football.jpg'),
          title: 'ENTRENA COMO UN PROFESIONAL',
          description: 'Equipamiento diseñado para maximizar tu rendimiento'
        },
        {
          image: require('@/assets/categories/running.jpg'),
          title: 'ESTILO Y RENDIMIENTO',
          description: 'La mejor tecnología deportiva para tus entrenamientos'
        },
        {
          image: require('@/assets/categories/box.jpg'),
          title: 'SUPERA TUS LÍMITES',
          description: 'Alcanza tus metas con el mejor equipamiento deportivo'
        },
        {
          image: require('@/assets/categories/tenis.jpg'),
          title: 'DOMINA LA CANCHA',
          description: 'Equipamiento profesional para tenistas de todos los niveles'
        },
        {
          image: require('@/assets/categories/training.jpg'),
          title: 'ENTRENA SIN LÍMITES',
          description: 'La mejor selección de equipamiento para tu entrenamiento'
        }
      ],
      featuredCategories: [
        { name: 'Basketball', image: require('@/assets/categories/basketball.jpg'), itemCount: 42 },
        { name: 'Football', image: require('@/assets/categories/football.jpg'), itemCount: 56 },
        { name: 'Running', image: require('@/assets/categories/running.jpg'), itemCount: 38 },
        { name: 'Training', image: require('@/assets/categories/training.jpg'), itemCount: 45 }
      ],
      autoplayInterval: null,
      autoplayDuration: 6000
    };
  },
  mounted() {
    this.startAutoplay();
  },
  beforeUnmount() {
    this.stopAutoplay();
  },
  methods: {
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    },
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    },
    goToSlide(index) {
      this.currentSlide = index;
    },
    startAutoplay() {
      this.stopAutoplay(); // Clear any existing interval
      this.autoplayInterval = setInterval(this.nextSlide, this.autoplayDuration);
    },
    stopAutoplay() {
      if (this.autoplayInterval) {
        clearInterval(this.autoplayInterval);
      }
    }
  }
};
</script>

<style scoped>
.home-container {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  overflow-x: hidden;
  position: relative;
  background: #f8f9fa;
}
.carousel {
  position: relative;
  width: 100vw;
  height: 85vh;
  min-height: 600px;
  max-height: 900px;
  background: #000;
}

.carousel-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  height: 100%;
  transition: transform 1s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100vw;
}

.carousel-slide {
  flex: 0 0 100vw;
  position: relative;
  overflow: hidden;
  width: 100vw;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.4) 30%,
    rgba(0, 0, 0, 0.1) 100%
  );
  z-index: 1;
}

.carousel-image {
  width: 100vw;
  height: 100%;
  object-fit: cover;
  transform: scale(1.1);
  transition: transform 1.5s ease;
}

.carousel-image.active {
  transform: scale(1);
}

.carousel-content {
  position: absolute;
  top: 50%;
  left: 8%;
  transform: translateY(-50%);
  color: white;
  z-index: 2;
  opacity: 0;
  transition: all 0.8s ease;
  max-width: 650px;
}

.carousel-content.active {
  opacity: 1;
  left: 10%;
}

.content-wrapper {
  padding: 2rem;
}

.pre-title {
  display: inline-block;
  font-size: 1.2rem; /* Aumentado */
  text-transform: uppercase;
  background: rgba(180, 249, 206, 0.2);
  padding: 0.6rem 1.2rem; /* Aumentado */
  border-radius: 4px;
  margin-bottom: 1.5rem; /* Aumentado */
  color: rgb(180, 249, 206);
  letter-spacing: 2px;
}
.carousel-content h2 {
  font-size: 2rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.carousel-content p {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.9;
  max-width: 500px;
}

.cta-button {
  background: rgb(180, 249, 206);
  color: #000;
  border: none;
  padding: 1rem 2.5rem; /* Aumentado */
  font-size: 1.3rem; /* Aumentado */
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.8rem; /* Aumentado */
}

.cta-button:hover {
  background: #fff;
  transform: translateY(-2px);
}

.cta-button .arrow {
  transition: transform 0.3s ease;
}

.cta-button:hover .arrow {
  transform: translateX(5px);
}

.navigation-controls {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 3rem; /* Aumentado */
  z-index: 3;
  background: rgba(0, 0, 0, 0.6);
  padding: 1.2rem 2.5rem; /* Aumentado */
  border-radius: 50px;
  backdrop-filter: blur(10px);
}

.carousel-button {
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.carousel-button:hover {
  background: rgb(180, 249, 206);
  border-color: rgb(180, 249, 206);
  color: #000;
}

.carousel-indicators {
  display: flex;
  gap: 1rem;
}

.carousel-indicator {
  background: transparent;
  border: none;
  padding: 0.5rem 1rem;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.carousel-indicator::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: rgb(180, 249, 206);
  transition: width 0.3s ease;
}

.carousel-indicator.active {
  color: rgb(180, 249, 206);
}

.carousel-indicator.active::after {
  width: 100%;
}

.indicator-label {
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.progress-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  z-index: 3;
}

.progress-bar {
  height: 100%;
  background: rgb(180, 249, 206);
  transition: width 0.3s linear;
}

/* Featured Categories Section */
.featured-categories {
  padding: 4rem 8%;
  background: #fff;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.category-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.category-card:hover {
  transform: translateY(-5px);
}

.category-image {
  height: 200px;
  overflow: hidden;
}

.category-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.category-card:hover .category-image img {
  transform: scale(1.1);
}

.category-card h4 {
  padding: 1rem;
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.category-card p {
  padding: 0 1rem 1rem;
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .carousel-content h2 {
    font-size: 2.8rem;
  }
  
  .carousel {
    height: 70vh;
  }
}

@media (max-width: 768px) {
  .carousel {
    height: 60vh;
  }

  .carousel-content {
    left: 5%;
    max-width: 90%;
  }

  .carousel-content h2 {
    font-size: 2rem;
  }

  .carousel-content p {
    font-size: 1rem;
  }

  .navigation-controls {
    bottom: 5%;
    width: 90%;
    padding: 0.8rem 1rem;
    gap: 1rem;
  }

  .carousel-button {
    width: 35px;
    height: 35px;
  }

  .carousel-indicators {
    gap: 0.5rem;
  }

  .indicator-label {
    font-size: 0.8rem;
  }

  .pre-title {
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
  }

  .cta-button {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }

  .featured-categories {
    padding: 2rem 5%;
  }

  .section-title {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }

  .categories-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }

  .category-image {
    height: 160px;
  }
}

@media (max-width: 480px) {
  .carousel {
    height: 50vh;
  }

  .carousel-content h2 {
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }

  .carousel-content p {
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }

  .carousel-content {
    left: 0;
    padding: 0 1rem;
  }

  .content-wrapper {
    padding: 1rem;
  }

  .navigation-controls {
    bottom: 2%;
    padding: 0.6rem 0.8rem;
  }

  .carousel-button {
    width: 30px;
    height: 30px;
  }

  .carousel-indicators {
    display: none; /* Ocultar los indicadores en móviles muy pequeños */
  }

  .pre-title {
    font-size: 0.8rem;
    padding: 0.3rem 0.6rem;
  }

  .cta-button {
    padding: 0.7rem 1.2rem;
    font-size: 0.9rem;
  }

  .featured-categories {
    padding: 1.5rem 3%;
  }

  .section-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .categories-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .category-card h4 {
    font-size: 1.1rem;
    padding: 0.8rem;
  }

  .category-card p {
    padding: 0 0.8rem 0.8rem;
  }
}

/* Animaciones */
@keyframes slideIn {
  from {
    transform: translateX(50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fadeUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Efectos de hover adicionales */
.carousel-slide:hover .carousel-image {
  transform: scale(1.05);
}

.carousel-content .pre-title,
.carousel-content h2,
.carousel-content p,
.carousel-content .cta-button {
  opacity: 0;
  animation: fadeUp 0.8s forwards;
}

.carousel-content.active .pre-title {
  animation-delay: 0.2s;
}

.carousel-content.active h2 {
  animation-delay: 0.4s;
}

.carousel-content.active p {
  animation-delay: 0.6s;
}

.carousel-content.active .cta-button {
  animation-delay: 0.8s;
}

/* Mejoras de accesibilidad */
.carousel-button:focus,
.carousel-indicator:focus,
.cta-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(180, 249, 206, 0.5);
}

/* Estilos para el modo oscuro */
@media (prefers-color-scheme: dark) {
  .featured-categories {
    background: #1a1a1a;
  }

  .category-card {
    background: #2a2a2a;
  }

  .category-card h4 {
    color: #fff;
  }

  .category-card p {
    color: #999;
  }

  .section-title {
    color: #fff;
  }
}
</style>