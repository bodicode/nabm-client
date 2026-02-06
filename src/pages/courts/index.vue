<template>
  <div class="courts-page container">
    <header class="page-header">
      <h1 class="page-title">Đặt Sân</h1>
      <p class="text-secondary">Tìm kiếm những sân bóng chất lượng nhất.</p>
    </header>

    <div class="search-bar">
      <input type="text" placeholder="Tìm theo tên sân hoặc khu vực..." />
      <button class="btn btn-primary">Tìm Kiếm</button>
    </div>

    <div class="grid-cols-3">
      <CourtCard 
        v-for="court in courts" 
        :key="court.id"
        v-bind="court"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const courts = [
  { id: 1, name: "Downtown Hoops Center", location: "District 1, HCMC", price: "200k", rating: 4.8, image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800", tags: ["Indoor", "Air Con"] },
  { id: 2, name: "Streetball Park A", location: "District 7, HCMC", price: "150k", rating: 4.5, image: "https://images.unsplash.com/photo-1505666287802-931dc83948e9?auto=format&fit=crop&q=80&w=800", tags: ["Outdoor", "Lighting"] },
  { id: 3, name: "Elite Sports Complex", location: "Thu Duc City", price: "300k", rating: 5.0, image: "https://images.unsplash.com/photo-1533591380348-14193f1de18f?auto=format&fit=crop&q=80&w=800", tags: ["Indoor", "Premium"] },
  { id: 4, name: "Community Center", location: "District 3, HCMC", price: "100k", rating: 4.0, image: "https://images.unsplash.com/photo-1519861531473-920026393112?auto=format&fit=crop&q=80&w=800", tags: ["Outdoor"] },
  { id: 5, name: "Pro Arena", location: "Binh Thanh", price: "250k", rating: 4.9, image: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?auto=format&fit=crop&q=80&w=800", tags: ["Indoor", "Pro Floor"] },
  { id: 6, name: "Sunset Courts", location: "District 2", price: "180k", rating: 4.6, image: "https://images.unsplash.com/photo-1525916801717-9406bcfdf9f0?auto=format&fit=crop&q=80&w=800", tags: ["Outdoor", "View"] },
]
</script>

<style scoped>
.courts-page {
  padding-top: var(--spacing-xl);
  padding-bottom: var(--spacing-xl);
}

.page-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.page-title {
  font-size: 3rem;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: var(--spacing-sm);
}

.search-bar {
  max-width: 600px;
  margin: 0 auto var(--spacing-2xl);
  display: flex;
  gap: var(--spacing-sm);
}

.search-bar input {
  flex: 1;
  background-color: var(--bg-secondary);
  border: 1px solid var(--bg-tertiary);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  color: var(--color-white);
  font-size: 1rem;
}

.search-bar input:focus {
  outline: none;
  border-color: var(--color-primary);
}
</style>
