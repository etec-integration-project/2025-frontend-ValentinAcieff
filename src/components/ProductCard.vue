<template>
  <div class="product-card">
    <div class="image-container">
      <img :src="product.image" :alt="product.name" class="product-image"/>
      <div v-if="product.discount" class="discount-badge">
        -{{ product.discount }}%
      </div>
    </div>
    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      <div class="rating">
        <span class="stars">★★★★★</span>
        <span class="review-count">({{ product.reviews }})</span>
      </div>
      <div class="price-container">
        <span class="current-price">${{ calculateDiscountedPrice }}</span>
        <span v-if="product.discount" class="original-price">${{ product.price }}</span>
      </div>
      <div class="action-buttons">
        <button @click="addToCart" class="add-to-cart-btn">
          Añadir al carrito
        </button>
        <button @click="toggleWishlist" class="wishlist-btn">
          <span v-if="isInWishlist">❤️</span>
          <span v-else>🤍</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isInWishlist: false
    };
  },
  computed: {
    calculateDiscountedPrice() {
      if (!this.product.discount) return this.product.price;
      return (this.product.price * (100 - this.product.discount) / 100).toFixed(2);
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.product);
    },
    toggleWishlist() {
      this.isInWishlist = !this.isInWishlist;
      this.$emit('toggle-wishlist', this.product);
    }
  }
};
</script>

<style scoped>
.product-card {
  @apply bg-white rounded-lg overflow-hidden shadow-lg 
         transform transition-all duration-300 hover:shadow-xl;
}

.image-container {
  @apply relative aspect-square overflow-hidden;
}

.product-image {
  @apply w-full h-full object-cover 
         transform transition-transform duration-300;
}

.product-card:hover .product-image {
  @apply scale-110;
}

.discount-badge {
  @apply absolute top-4 right-4 bg-red-500 text-white 
         px-3 py-1 rounded-full font-bold;
}

.product-info {
  @apply p-4;
}

.product-name {
  @apply text-lg font-semibold mb-2;
}

.rating {
  @apply flex items-center gap-2 mb-2;
}

.stars {
  @apply text-yellow-400;
}

.review-count {
  @apply text-gray-500 text-sm;
}

.price-container {
  @apply flex items-center gap-2 mb-4;
}

.current-price {
  @apply text-xl font-bold;
}

.original-price {
  @apply text-gray-400 line-through;
}

.action-buttons {
  @apply flex items-center gap-2;
}

.add-to-cart-btn {
  @apply flex-1 bg-blue-600 text-white py-2 rounded-full
         transition-all duration-300 hover:bg-blue-700;
}

.wishlist-btn {
  @apply p-2 rounded-full border border-gray-200
         transition-all duration-300 hover:border-red-500;
}
</style>