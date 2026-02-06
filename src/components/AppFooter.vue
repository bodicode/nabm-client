<template>
  <footer class="footer">
    <div class="container footer-content">
      <div class="footer-brand">
        <h3>3hours<span class="text-accent"></span></h3>
        <p class="text-secondary">Kết nối - Đam mê - Chinh phục.</p>
      </div>
      <div class="footer-copy">
        <p>&copy; 2026 3hours. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--bg-secondary);
  padding: var(--spacing-2xl) 0;
  margin-top: auto;
  border-top: 1px solid var(--bg-tertiary);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-brand h3 {
  font-weight: 800;
  margin-bottom: var(--spacing-xs);
}

.footer-copy {
  color: var(--color-text-muted);
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
    gap: var(--spacing-pd);
  }
}
</style>
