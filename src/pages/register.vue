<template>
  <div class="auth-split-layout">
    <!-- Left Side: Form -->
    <div class="auth-panel form-panel">
      <div class="form-content">
        <NuxtLink to="/" class="auth-logo">
          3hours<span class="text-accent">.</span>
        </NuxtLink>

        <header class="auth-header">
          <h1 class="auth-title">Tạo tài khoản mới</h1>
          <p class="auth-subtitle">Tham gia cộng đồng bóng rổ lớn nhất ngay hôm nay.</p>
        </header>

        <form @submit.prevent="handleRegister" class="auth-form">
          <div class="form-group fade-in-1">
            <label>Họ và Tên</label>
            <div class="input-wrapper">
              <span class="input-icon">👤</span>
              <input type="text" v-model="fullName" placeholder="Nguyễn Văn A" class="form-input" required />
            </div>
          </div>

          <div class="form-group fade-in-2">
            <label>Email</label>
            <div class="input-wrapper">
              <span class="input-icon">✉️</span>
              <input type="email" v-model="email" placeholder="name@example.com" class="form-input" required />
            </div>
          </div>

          <div class="form-group fade-in-3">
            <label>Mật Khẩu</label>
            <div class="input-wrapper">
              <span class="input-icon">🔒</span>
              <input type="password" v-model="password" placeholder="Tạo mật khẩu" class="form-input" required />
            </div>
          </div>

          <div class="form-group fade-in-4">
            <label>Xác Nhận Mật Khẩu</label>
            <div class="input-wrapper">
              <span class="input-icon">🛡️</span>
              <input type="password" v-model="confirmPassword" placeholder="Nhập lại mật khẩu" class="form-input"
                required />
            </div>
          </div>

          <button type="submit" class="btn btn-primary full-width large fade-in-5" :disabled="loading">
            {{ loading ? 'Đang xử lý...' : 'Đăng Ký' }}
          </button>
        </form>

        <p class="auth-footer fade-in-6">
          Đã có tài khoản? <NuxtLink to="/login" class="text-accent link">Đăng nhập ngay</NuxtLink>
        </p>
      </div>
    </div>

    <!-- Right Side: Image/Brand -->
    <div class="auth-panel image-panel">
      <div class="image-overlay">
        <div class="quote-container">
          <blockquote>"The key is not the 'will to win'... everybody has that. It is the will to prepare to win that is
            important."</blockquote>
          <cite>— Bobby Knight</cite>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const router = useRouter()

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Mật khẩu xác nhận không khớp!')
    return
  }

  loading.value = true
  try {
    const config = useRuntimeConfig()
    const data = await $fetch('/auth/register', {
      baseURL: config.public.apiBase,
      method: 'POST',
      body: {
        name: fullName.value,
        email: email.value,
        password: password.value
      }
    })

    console.log('Register success:', data)
    alert('Đăng ký thành công! Vui lòng đăng nhập.')
    router.push('/login')
  } catch (err: any) {
    console.error(err)
    alert('Đăng ký thất bại: ' + (err.data?.message || err.message))
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

.form-panel {
  max-width: 600px;
  padding: 2rem 4rem;
  background-color: var(--bg-primary);
  overflow-y: auto;
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
  margin-bottom: 2rem;
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
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.25rem;
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

.large {
  padding: 14px;
  font-size: 1rem;
  margin-top: 1rem;
}

.full-width {
  width: 100%;
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

.image-panel {
  background-image: url('https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1920&auto=format&fit=crop');
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

@media (max-width: 992px) {
  .auth-split-layout {
    flex-direction: column;
  }

  .image-panel {
    display: none;
  }

  .form-panel {
    max-width: 100%;
    padding: 2rem;
  }
}

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
