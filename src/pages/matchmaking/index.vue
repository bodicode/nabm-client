<template>
  <div class="matchmaking-page container">
    <header class="page-header">
      <div>
        <h1 class="page-title">Sảnh Tìm Đối</h1>
        <p class="text-secondary">Tìm đối thủ xứng tầm và cáp kèo ngay.</p>
      </div>
      <button class="btn btn-primary">Tạo Kèo Mới</button>
    </header>

    <div class="filters">
      <div class="filter-group">
        <label>Trình Độ</label>
        <select>
          <option>Tất Cả</option>
          <option>Cơ Bản</option>
          <option>Trung Bình</option>
          <option>Nâng Cao</option>
        </select>
      </div>
      <div class="filter-group">
        <label>Khu Vực</label>
        <select>
          <option>Tất Cả</option>
          <option>Quận 1</option>
          <option>Quận 7</option>
          <option>Thủ Đức</option>
        </select>
      </div>
    </div>

    <div class="teams-grid grid-cols-3">
      <TeamCard 
        v-for="team in teams"
        :key="team.id"
        v-bind="team"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// Using same mock data for now, would fetch from API in real app
const teams = [
  { id: 1, name: "Red Bulls", level: "Advanced", wins: 12, losses: 3, logo: "https://ui-avatars.com/api/?name=Red+Bulls&background=ff5722&color=fff" },
  { id: 2, name: "Street Kings", level: "Intermediate", wins: 8, losses: 6, logo: "https://ui-avatars.com/api/?name=Street+Kings&background=333&color=fff" },
  { id: 3, name: "Rookie Ballers", level: "Beginner", wins: 2, losses: 10, logo: "https://ui-avatars.com/api/?name=Rookie+B&background=1e1e1e&color=fff" },
  { id: 4, name: "Net Rippers", level: "Advanced", wins: 15, losses: 1, logo: "https://ui-avatars.com/api/?name=Net+Rippers&background=2c2c2c&color=fff" },
  { id: 5, name: "Hoops Dreams", level: "Intermediate", wins: 5, losses: 5, logo: "https://ui-avatars.com/api/?name=Hoops+Dreams&background=1e1e1e&color=fff" },
  { id: 6, name: "Sunday Squad", level: "Beginner", wins: 1, losses: 4, logo: "https://ui-avatars.com/api/?name=Sunday+Squad&background=333&color=fff" },
]
</script>

<style scoped>
.matchmaking-page {
  padding-top: var(--spacing-xl);
  padding-bottom: var(--spacing-xl);
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xl);
}

.page-title {
  font-size: 2.5rem;
  font-weight: 800;
  text-transform: uppercase;
}

.filters {
  display: flex;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-md);
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.filter-group label {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  font-weight: 600;
}

.filter-group select {
  background-color: var(--bg-tertiary);
  color: var(--color-white);
  border: 1px solid transparent;
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  min-width: 150px;
}

.filter-group select:focus {
  outline: none;
  border-color: var(--color-primary);
}
</style>
