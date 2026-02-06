<template>
  <div class="auth-layout-wrapper">
    <header class="auth-controls">
      <NuxtLink to="/" class="btn-home">
        <span class="arrow">←</span> Trang Chủ
      </NuxtLink>
      <ThemeToggle />
    </header>
    <main class="auth-content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.auth-layout-wrapper {
  min-height: 100vh;
  position: relative;
  background-color: var(--bg-primary);
}

.auth-controls {
  position: absolute;
  top: var(--spacing-md);
  left: var(--spacing-md);
  right: var(--spacing-md);
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none; /* Let clicks pass through if needed, but buttons need pointer-events: auto */
}

.auth-controls > * {
  pointer-events: auto;
}

.btn-home {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: var(--text-main);
  background-color: var(--bg-secondary); /* Add subtle bg for readability on image */
  padding: 8px 16px;
  border-radius: var(--radius-full);
  border: 1px solid var(--bg-tertiary);
  transition: all 0.2s;
  backdrop-filter: blur(10px);
}

.btn-home:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  transform: translateX(-4px);
}

.arrow {
  font-size: 1.2rem;
  line-height: 1;
}

@media (max-width: 768px) {
  .btn-home span.arrow {
    display: inline;
  }
}
</style>
