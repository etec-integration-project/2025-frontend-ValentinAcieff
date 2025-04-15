<template>
    <div class="additional-sections">
      <!-- Trending Products Section -->
      <section class="trending-products">
        <h3 class="section-title">Productos Destacados</h3>
        <div class="products-grid">
          <div v-for="product in trendingProducts" :key="product.id" class="product-card">
            <div class="product-badge" v-if="product.badge">{{ product.badge }}</div>
            <div class="product-image">
              <img :src="product.image" :alt="product.name">
              <div class="quick-actions">
                <button class="action-button"><span class="icon">♥</span></button>
                <button class="action-button"><span class="icon">👁</span></button>
              </div>
            </div>
            <div class="product-info">
              <span class="product-category">{{ product.category }}</span>
              <h4>{{ product.name }}</h4>
              <div class="product-rating">
                <span class="stars">★★★★★</span>
                <span class="rating-count">({{ product.reviews }})</span>
              </div>
              <div class="product-price">
                <span class="current-price">${{ product.price }}</span>
                <span class="original-price" v-if="product.originalPrice">${{ product.originalPrice }}</span>
              </div>
              <button class="add-to-cart">Agregar al Carrito</button>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Benefits Section -->
      <section class="benefits-section">
        <div class="benefits-grid">
          <div v-for="benefit in benefits" :key="benefit.id" class="benefit-card">
            <div class="benefit-icon">{{ benefit.icon }}</div>
            <h4>{{ benefit.title }}</h4>
            <p>{{ benefit.description }}</p>
          </div>
        </div>
      </section>
  
      <!-- Newsletter Section -->
      <section class="newsletter-section">
        <div class="newsletter-content">
          <h3>¡Únete a Nuestra Comunidad Deportiva!</h3>
          <p>Recibe las últimas novedades, ofertas exclusivas y consejos deportivos.</p>
          <form class="newsletter-form">
            <input type="email" placeholder="Tu correo electrónico" required>
            <button type="submit">Suscribirse</button>
          </form>
        </div>
      </section>
  
      <!-- Popular Sports Section -->
      <section class="popular-sports">
        <h3 class="section-title">Deportes Populares</h3>
        <div class="sports-grid">
          <div v-for="sport in popularSports" :key="sport.id" class="sport-card">
            <div class="sport-icon">{{ sport.icon }}</div>
            <h4>{{ sport.name }}</h4>
            <p>{{ sport.productCount }} productos</p>
            <div class="sport-tags">
              <span v-for="tag in sport.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AdditionalSections',
    data() {
      return {
        trendingProducts: [
          {
            id: 1,
            name: 'Nike Air Zoom Pegasus 38',
            category: 'Running',
            price: 129.99,
            originalPrice: 159.99,
            image: require('@/assets/products/shoe1.jpg'),
            badge: 'Nuevo',
            reviews: 128
          },
          // Add more products...
        ],
        benefits: [
          {
            id: 1,
            icon: '🚚',
            title: 'Envío Gratis',
            description: 'En compras superiores a $99'
          },
          {
            id: 2,
            icon: '↩️',
            title: 'Devolución Gratuita',
            description: '30 días para cambios y devoluciones'
          },
          {
            id: 3,
            icon: '🛡️',
            title: 'Garantía de Calidad',
            description: 'Productos originales garantizados'
          },
          {
            id: 4,
            icon: '💬',
            title: 'Soporte 24/7',
            description: 'Asistencia profesional disponible'
          }
        ],
        popularSports: [
          {
            id: 1,
            name: 'Running',
            icon: '🏃',
            productCount: 156,
            tags: ['Zapatillas', 'Ropa', 'Accesorios']
          },
          // Add more sports...
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  .additional-sections {
    padding: 2rem 0;
  }
  
  /* Trending Products Styles */
  .trending-products {
    padding: 4rem 8%;
  }
  
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }
  
  .product-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }
  
  .product-card:hover {
    transform: translateY(-5px);
  }
  
  .product-badge {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: rgb(180, 249, 206);
    color: black;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    z-index: 1;
  }
  
  .product-image {
    height: 300px;
    position: relative;
    overflow: hidden;
  }
  
  .product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .quick-actions {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    opacity: 0;
    transform: translateX(20px);
    transition: all 0.3s ease;
  }
  
  .product-card:hover .quick-actions {
    opacity: 1;
    transform: translateX(0);
  }
  
  .action-button {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }
  
  .action-button:hover {
    background: rgb(180, 249, 206);
  }
  
  .product-info {
    padding: 1.5rem;
  }
  
  .product-category {
    color: #666;
    font-size: 0.9rem;
  }
  
  .product-rating {
    margin: 0.5rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .stars {
    color: #ffd700;
  }
  
  .rating-count {
    color: #666;
    font-size: 0.9rem;
  }
  
  .product-price {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 1rem 0;
  }
  
  .current-price {
    font-size: 1.3rem;
    font-weight: 600;
  }
  
  .original-price {
    color: #666;
    text-decoration: line-through;
  }
  
  .add-to-cart {
    width: 100%;
    padding: 1rem;
    background: black;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .add-to-cart:hover {
    background: rgb(180, 249, 206);
    color: black;
  }
  
  /* Benefits Section Styles */
  .benefits-section {
    padding: 4rem 8%;
    background: #f8f9fa;
  }
  
  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }
  
  .benefit-card {
    text-align: center;
    padding: 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  }
  
  .benefit-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  /* Newsletter Section Styles */
  .newsletter-section {
    padding: 6rem 8%;
    background: black;
    color: white;
    text-align: center;
  }
  
  .newsletter-content {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .newsletter-form {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
  }
  
  .newsletter-form input {
    flex: 1;
    padding: 1rem;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
  }
  
  .newsletter-form button {
    padding: 1rem 2rem;
    background: rgb(180, 249, 206);
    color: black;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .newsletter-form button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(180, 249, 206, 0.3);
  }
  
  /* Popular Sports Section Styles */
  .popular-sports {
    padding: 4rem 8%;
  }
  
  .sports-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }
  
  .sport-card {
    text-align: center;
    padding: 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
  
  .sport-card:hover {
    transform: translateY(-5px);
  }
  
  .sport-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .sport-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
    margin-top: 1rem;
  }
  
  .tag {
    background: #f8f9fa;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.8rem;
    color: #666;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .newsletter-form {
      flex-direction: column;
    }
    
    .products-grid,
    .benefits-grid,
    .sports-grid {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }
  }
  
  @media (max-width: 480px) {
    .additional-sections section {
      padding: 2rem 5%;
    }
    
    .products-grid,
    .benefits-grid,
    .sports-grid {
      grid-template-columns: 1fr;
    }
  }
  </style>