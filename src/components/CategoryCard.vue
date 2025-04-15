<template>
  <div class="category-card" @click="$emit('click')">
    <div class="image-container">
      <img :src="category.image" :alt="category.name" class="category-image"/>
      <div class="overlay">
        <h3>{{ category.name }}</h3>
        <p>{{ category.description }}</p>
        <button class="explore-btn">Explorar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryCard',
  props: {
    category: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.category-card {
  @apply relative overflow-hidden rounded-lg cursor-pointer 
         transform transition-transform duration-300 hover:scale-105;
}

.image-container {
  @apply relative aspect-square;
}

.category-image {
  @apply w-full h-full object-cover;
}

.overlay {
  @apply absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center
         text-white p-4 opacity-0 transition-opacity duration-300;
}

.category-card:hover .overlay {
  @apply opacity-100;
}

.explore-btn {
  @apply mt-4 px-6 py-2 bg-white text-black rounded-full 
         transform transition-transform duration-300 hover:scale-110;
}
</style>