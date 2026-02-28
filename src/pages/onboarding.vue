<template>
  <!-- trigger hmr -->
  <div class="onboarding-page">
    <div class="container text-center">
      <NuxtLink to="/" class="auth-logo">
        3hours<span class="text-accent">.</span>
      </NuxtLink>
      
      <h1 class="onboarding-title fade-in-1">Bạn tham gia 3hours với mục đích gì?</h1>
      <p class="onboarding-subtitle fade-in-2">Chọn vai trò phù hợp nhất để chúng tôi tối ưu trải nghiệm cho bạn nhé.</p>

      <div class="role-cards">
        <!-- Player Role -->
        <div class="role-card fade-in-3" @click="selectRole('player')">
          <div class="card-icon">🏀</div>
          <h2 class="card-title">Người chơi</h2>
          <p class="card-desc">Tìm kiếm sân bóng, cáp kèo thi đấu và giao lưu với cộng đồng bóng rổ.</p>
          <div class="card-action">
            <span>Bắt đầu trải nghiệm</span>
            <span class="arrow">→</span>
          </div>
        </div>

        <!-- Court Owner Role -->
        <div class="role-card fade-in-4" @click="selectRole('owner')">
          <div class="card-icon">🏟️</div>
          <h2 class="card-title">Chủ sân / Quản lý</h2>
          <p class="card-desc">Đăng ký sân bóng của bạn để quản lý lịch đặt sân và tiếp cận hàng ngàn người chơi.</p>
          <div class="card-action">
            <span>Đăng ký đối tác</span>
            <span class="arrow">→</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

const router = useRouter()

const selectRole = (role: string) => {
  // Save to localStorage so we don't show this again
  if (process.client) {
    localStorage.setItem('has_onboarded', 'true')
  }
  
  if (role === 'player') {
    router.push('/')
  } else if (role === 'owner') {
    // Navigate to a partner registration page (or home if not exist yet)
    router.push('/partner-registration')
  }
}
</script>

<style scoped>
.onboarding-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: var(--bg-primary);
}

.auth-logo {
  display: inline-block;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 2rem;
  color: var(--text-main);
  text-decoration: none;
}

.onboarding-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: var(--text-main);
}

.onboarding-subtitle {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.role-cards {
  display: flex;
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
  justify-content: center;
}

.role-card {
  flex: 1;
  max-width: 400px;
  background-color: var(--bg-secondary);
  border: 1px solid var(--bg-tertiary);
  border-radius: var(--radius-lg);
  padding: 3rem 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  text-align: left;
}

.role-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--color-primary);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.role-card:hover {
  transform: translateY(-5px);
  border-color: var(--color-primary);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

/* Light mode shadow */
:global([data-theme="light"]) .role-card:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.role-card:hover::before {
  transform: scaleX(1);
}

.card-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text-main);
}

.card-desc {
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 2rem;
  min-height: 80px;
}

.card-action {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  color: var(--color-primary);
  font-size: 1rem;
  transition: all 0.2s ease;
}

.card-action .arrow {
  transition: transform 0.2s ease;
}

.role-card:hover .card-action .arrow {
  transform: translateX(5px);
}

@media (max-width: 768px) {
  .role-cards {
    flex-direction: column;
    align-items: center;
  }
  
  .role-card {
    width: 100%;
  }
}

/* Animations */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in-1 { animation: fadeInUp 0.6s ease forwards 0.1s; opacity: 0; }
.fade-in-2 { animation: fadeInUp 0.6s ease forwards 0.2s; opacity: 0; }
.fade-in-3 { animation: fadeInUp 0.6s ease forwards 0.3s; opacity: 0; }
.fade-in-4 { animation: fadeInUp 0.6s ease forwards 0.4s; opacity: 0; }
</style>
