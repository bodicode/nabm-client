<template>
  <div class="team-card">
    <div class="team-header">
      <div class="team-logo">
        <img :src="logo" :alt="name" />
      </div>
      <div class="team-info">
        <h3 class="team-name">{{ name }}</h3>
        <p class="team-level text-accent">{{ level }}</p>
      </div>
    </div>
    <div class="team-stats">
      <div class="stat">
        <span class="stat-value">{{ wins }}</span>
        <span class="stat-label">Wins</span>
      </div>
      <div class="stat">
        <span class="stat-value">{{ losses }}</span>
        <span class="stat-label">Losses</span>
      </div>
    </div>
    <div class="card-actions">
      <button class="btn btn-primary full-width">Challenge</button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  level: string
  wins: number
  losses: number
  logo: string
}>()
</script>

<style scoped>
.team-card {
  background-color: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  border: 1px solid var(--bg-tertiary);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  transition: border-color 0.2s;
}

.team-card:hover {
  border-color: var(--color-primary);
}

.team-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.team-logo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--bg-tertiary);
  overflow: hidden;
  border: 2px solid var(--bg-tertiary);
}

.team-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.team-name {
  font-size: 1.125rem;
  font-weight: 700;
}

.team-level {
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.team-stats {
  display: flex;
  justify-content: space-around;
  background-color: var(--bg-tertiary);
  padding: var(--spacing-sm);
  border-radius: var(--radius-md);
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-weight: 800;
  font-size: 1.25rem;
}

.stat-label {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
}

.full-width {
  width: 100%;
}
</style>
