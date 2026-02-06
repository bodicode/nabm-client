<template>
  <header class="header">
    <div class="container header-content">
      <NuxtLink to="/" class="logo">
        3hours<span class="text-accent">.</span>
      </NuxtLink>
      
      <nav class="nav-links">
        <NuxtLink to="/" class="nav-link">Trang Chủ</NuxtLink>
        <NuxtLink to="/courts" class="nav-link">Đặt Sân</NuxtLink>
        <NuxtLink to="/matchmaking" class="nav-link">Tìm Đối Thủ</NuxtLink>
      </nav>

      <div class="cta-actions">
        <ThemeToggle />
        <template v-if="user">
          <span class="user-greeting">Hi, {{ user.name }}</span>
          <button @click="logout" class="btn btn-outline small">Đăng Xuất</button>
        </template>
        <template v-else>
          <NuxtLink to="/login" class="btn btn-outline small">Đăng Nhập</NuxtLink>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const { user, logout } = useAuth()
</script>

<style scoped>
.header {
  background-color: var(--bg-overlay);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--bg-tertiary);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: var(--spacing-md) 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -1px;
}

.nav-links {
  display: flex;
  gap: var(--spacing-xl);
}

.nav-link {
  font-weight: 500;
  color: var(--color-text-secondary);
  transition: color 0.2s;
}

.nav-link:hover, .nav-link.router-link-active {
  color: var(--color-white);
}

.cta-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.small {
  padding: var(--spacing-xs) var(--spacing-md);
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .nav-links {
    display: none; /* Mobile menu to be added later */
  }
}

.user-greeting {
  font-weight: 600;
  color: var(--color-text-primary);
}

</style>
