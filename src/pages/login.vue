<template>
  <div class="auth-split-layout">
    <!-- Left Side: Form -->
    <div class="auth-panel form-panel">
      <div class="form-content">
        <NuxtLink to="/" class="auth-logo">
          3hours<span class="text-accent">.</span>
        </NuxtLink>

        <header class="auth-header">
          <h1 class="auth-title">Chào mừng trở lại!</h1>
          <p class="auth-subtitle">Nhập thông tin để tiếp tục trận đấu của bạn.</p>
        </header>

        <form @submit.prevent="handleLogin" class="auth-form">
          <div class="form-group fade-in-1">
            <label>Email</label>
            <div class="input-wrapper">
              <span class="input-icon">✉️</span>
              <input type="email" v-model="email" placeholder="name@example.com" class="form-input" required />
            </div>
          </div>

          <div class="form-group fade-in-2">
            <label>Mật Khẩu</label>
            <div class="input-wrapper">
              <span class="input-icon">🔒</span>
              <input type="password" v-model="password" placeholder="Mật khẩu của bạn" class="form-input" required />
            </div>
          </div>

          <div class="form-actions fade-in-3">
            <label class="checkbox-label">
              <input type="checkbox" />
              <span>Ghi nhớ tôi</span>
            </label>
            <a href="#" class="forgot-password">Quên mật khẩu?</a>
          </div>

          <button type="submit" class="btn btn-primary full-width large fade-in-4" :disabled="loading">
            {{ loading ? 'Đang xử lý...' : 'Đăng Nhập' }}
          </button>
        </form>

        <div class="social-section fade-in-5">
          <div class="divider"><span>Hoặc đăng nhập với</span></div>
          <div class="social-buttons">
            <a :href="googleLoginUrl" class="social-btn google">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width="24" />
              Login with Google
            </a>
          </div>
        </div>

        <p class="auth-footer fade-in-6">
          Chưa có tài khoản? <NuxtLink to="/register" class="text-accent link">Đăng ký mới</NuxtLink>
        </p>
      </div>
    </div>

    <!-- Right Side: Image/Brand -->
    <div class="auth-panel image-panel">
      <div class="image-overlay">
        <div class="quote-container">
          <blockquote>"Hard work beats talent when talent fails to work hard."</blockquote>
          <cite>— Kevin Durant</cite>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

const email = ref('')
const password = ref('')
const loading = ref(false)
const router = useRouter()

const config = useRuntimeConfig()
const route = useRoute()
const { setToken, fetchUser, user } = useAuth()


const checkNewUser = () => {
  if (process.client) {
    const hasOnboarded = localStorage.getItem('has_onboarded')
    if (hasOnboarded) return false

    // Check if user was created within the last 1 hour
    if (user.value?.createdAt) {
      const createdTime = new Date(user.value.createdAt).getTime()
      const now = new Date().getTime()
      return (now - createdTime) < 60 * 60 * 1000 // 1 hour
    }
  }
  return false
}


const googleLoginUrl = computed(() => {
  return `${config.public.backendUrl}/auth/google`
})

onMounted(async () => {
  const token = route.query.token
  if (token) {
    setToken(token as string)
    await fetchUser()
    if (checkNewUser()) {
      window.location.href = '/onboarding'
    } else {
      window.location.href = '/'
    }
  }
})

const handleLogin = async () => {
  loading.value = true
  try {
    const { data, error } = await useApi<{ access_token: string }>('/auth/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value
      }
    })

    if (error.value) {
      alert('Đăng nhập thất bại: ' + (error.value.data?.message || error.value.message))
    } else if (data.value) {
      console.log('Login success:', data.value)
      setToken(data.value.access_token)
      await fetchUser()
      if (checkNewUser()) {
        router.push('/onboarding')
      } else {
        router.push('/')
      }
    }
  } catch (err) {
    console.error(err)
    alert('Đã có lỗi xảy ra')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-split-layout {
  display: flex;
  min-height: 100vh;
  background-color: var(--bg-primary);
}

.auth-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Form Panel Styling */
.form-panel {
  max-width: 600px;
  /* Force it to not be too wide */
  padding: 4rem;
  background-color: var(--bg-primary);
}

.form-content {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.auth-logo {
  display: inline-block;
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 3rem;
  color: var(--text-main);
}

.auth-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: var(--text-main);
  letter-spacing: -0.02em;
}

.auth-subtitle {
  color: var(--color-text-secondary);
  font-size: 1rem;
  margin-bottom: 2.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-main);
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.1rem;
  filter: grayscale(100%);
  opacity: 0.7;
}

.form-input {
  width: 100%;
  padding: 12px 16px 12px 42px;
  /* Space for icon */
  border-radius: var(--radius-md);
  border: 1px solid var(--bg-tertiary);
  background-color: var(--bg-secondary);
  color: var(--text-main);
  font-size: 1rem;
  transition: all 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary);
  background-color: var(--bg-primary);
  box-shadow: 0 0 0 4px rgba(255, 87, 34, 0.1);
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  font-size: 0.875rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: var(--color-text-secondary);
}

.forgot-password {
  color: var(--color-primary);
  font-weight: 600;
}

.large {
  padding: 14px;
  font-size: 1rem;
}

.full-width {
  width: 100%;
}

/* Social Login */
.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 2rem 0;
  color: var(--color-text-muted);
  font-size: 0.875rem;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid var(--bg-tertiary);
}

.divider span {
  padding: 0 10px;
}

.social-buttons {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px;
  border-radius: var(--radius-md);
  border: 1px solid var(--bg-tertiary);
  background-color: var(--bg-secondary);
  color: var(--text-main);
  font-weight: 600;
  transition: all 0.2s;
}

.social-btn:hover {
  background-color: var(--bg-tertiary);
  transform: translateY(-2px);
}

.auth-footer {
  text-align: center;
  margin-top: 2rem;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
}

.link {
  font-weight: 600;
}

/* Image Panel Styling (Right Side) */
.image-panel {
  background-image: url('https://images.unsplash.com/photo-1518407613690-d9fc990e795f?q=80&w=1920&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  position: relative;
}

.image-overlay {
  background: linear-gradient(135deg, rgba(18, 18, 18, 0.8), rgba(255, 87, 34, 0.4));
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  padding: 4rem;
}

.quote-container blockquote {
  font-size: 2rem;
  font-weight: 800;
  font-style: italic;
  color: #fff;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.quote-container cite {
  color: rgba(255, 255, 255, 0.8);
  font-style: normal;
  font-weight: 600;
  font-size: 1.1rem;
}

/* Response Design */
@media (max-width: 992px) {
  .auth-split-layout {
    flex-direction: column;
  }

  .image-panel {
    display: none;
    /* Hide image on mobile for simpler view, or reduce height */
  }

  .form-panel {
    max-width: 100%;
    padding: 2rem;
  }
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-1 {
  animation: fadeInUp 0.5s ease forwards 0.1s;
  opacity: 0;
}

.fade-in-2 {
  animation: fadeInUp 0.5s ease forwards 0.2s;
  opacity: 0;
}

.fade-in-3 {
  animation: fadeInUp 0.5s ease forwards 0.3s;
  opacity: 0;
}

.fade-in-4 {
  animation: fadeInUp 0.5s ease forwards 0.4s;
  opacity: 0;
}

.fade-in-5 {
  animation: fadeInUp 0.5s ease forwards 0.5s;
  opacity: 0;
}

.fade-in-6 {
  animation: fadeInUp 0.5s ease forwards 0.6s;
  opacity: 0;
}
</style>
