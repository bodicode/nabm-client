<template>
  <NuxtLink :to="`/courts/${id}`" class="court-card block no-underline text-inherit">
    <div class="card-image">
      <img :src="image" :alt="name" />
      <div class="price-tag">{{ price }}/h</div>
    </div>
    <div class="card-body">
      <div class="card-header">
        <h3 class="court-name">{{ name }}</h3>
        <div class="rating">
          ⭐ {{ rating }}
        </div>
      </div>
      <p class="location text-secondary">📍 {{ location }}</p>
      <div class="tags">
        <span v-for="tag in tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
      <button class="btn btn-primary full-width">Book Now</button>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  id: string | number
  name: string
  location: string
  price: string
  rating: number
  image: string
  tags: string[]
}>()
</script>

<style scoped>
.court-card {
  display: flex;
  flex-direction: column;
  background-color: var(--bg-secondary);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: transform 0.2s;
  border: 1px solid var(--bg-tertiary);
  text-decoration: none;
  color: inherit;
}

.court-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-primary);
}

.card-image {
  height: 200px;
  position: relative;
  background-color: var(--bg-tertiary);
  /* Placeholder color */
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.price-tag {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  font-weight: bold;
  font-size: 0.875rem;
}

.card-body {
  padding: var(--spacing-md);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-xs);
}

.court-name {
  font-size: 1.125rem;
  font-weight: 700;
}

.rating {
  font-size: 0.875rem;
  color: #FFC107;
}

.location {
  font-size: 0.875rem;
  margin-bottom: var(--spacing-md);
}

.tags {
  display: flex;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-md);
  flex-wrap: wrap;
}

.tag {
  background-color: var(--bg-tertiary);
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: var(--radius-full);
  color: var(--color-text-secondary);
}

.full-width {
  width: 100%;
}
</style>
