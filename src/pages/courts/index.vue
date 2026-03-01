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
      <div v-if="pending" class="text-center w-full py-8 text-secondary">Đang tải danh sách sân...</div>
      <div v-else-if="error" class="text-center w-full py-8 text-accent">Lỗi tải dữ liệu. Vui lòng thử lại.</div>
      <CourtCard v-else v-for="court in courts" :key="court.id" :id="court.id" :name="court.name"
        :location="court.address || 'Đang cập nhật'" :price="court.pricePerHour ? court.pricePerHour + 'k' : 'Liên hệ'"
        :rating="court.rating || 0"
        :image="court.images?.[0] || 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800'"
        :tags="court.facilities || []" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: courts, pending, error } = await useApi<any[]>('/courts')
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
