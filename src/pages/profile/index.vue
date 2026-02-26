<template>
  <div class="profile-page container">
    <!-- Header skeleton -->
    <div v-if="pending" class="profile-header skeleton">
      <div class="avatar-skeleton"></div>
      <div class="info-skeleton">
        <div class="line title-line"></div>
        <div class="line subtitle-line"></div>
      </div>
    </div>
    
    <!-- Profile Header -->
    <div v-else-if="user" class="profile-header">
      <div class="avatar-container">
        <img :src="user.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + user.name" alt="User Avatar" class="profile-avatar" />
        <button class="edit-avatar-btn" title="Thay đổi ảnh đại diện">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
        </button>
      </div>
      <div class="profile-title">
        <h1>{{ user.name || 'Người dùng mới' }}</h1>
        <p class="role-badge">{{ user.role }}</p>
      </div>
    </div>

    <div class="profile-content grid-layout">
      <!-- Sidebar / Navigation -->
      <div class="profile-sidebar">
        <nav class="profile-nav">
          <button 
            :class="['nav-item', { active: activeTab === 'info' }]" 
            @click="activeTab = 'info'"
          >
            Thông tin cá nhân
          </button>
          <button 
            :class="['nav-item', { active: activeTab === 'security' }]" 
            @click="activeTab = 'security'"
          >
            Bảo mật
          </button>
        </nav>
      </div>

      <!-- Main Content Area -->
      <div class="profile-main">
        <!-- Notification Toast -->
        <div v-if="notification.show" :class="['notification-toast', notification.type]">
          {{ notification.message }}
        </div>

        <!-- Info Card -->
        <div v-if="activeTab === 'info'" class="profile-card">
          <div class="card-header">
            <h2>Chỉnh sửa thông tin</h2>
            <p class="text-secondary">Cập nhật thông tin công khai của bạn.</p>
          </div>
          <form @submit.prevent="handleUpdateProfile" class="profile-form">
            <div class="form-group grid-2">
              <div class="input-group">
                <label for="name">Họ và tên</label>
                <input type="text" id="name" v-model="profileForm.name" class="form-input" placeholder="Nhập họ và tên..." />
              </div>
              <div class="input-group">
                <label for="email">Email</label>
                <input type="email" id="email" :value="user?.email" class="form-input" disabled title="Khổng thể thay đổi email" />
              </div>
            </div>

            <div class="form-group grid-2">
              <div class="input-group">
                <label for="phoneNumber">Số điện thoại</label>
                <input type="tel" id="phoneNumber" v-model="profileForm.phoneNumber" class="form-input" placeholder="Ví dụ: 0912345678" />
              </div>
              <div class="input-group">
                <label for="location">Khu vực</label>
                <input type="text" id="location" v-model="profileForm.location" class="form-input" placeholder="Ví dụ: TP. Hồ Chí Minh" />
              </div>
            </div>

            <div class="form-group grid-2">
              <div class="input-group">
                <label for="position">Vị trí thi đấu</label>
                <select id="position" v-model="profileForm.position" class="form-input">
                  <option value="">Chọn vị trí...</option>
                  <option value="Point Guard">Point Guard (PG)</option>
                  <option value="Shooting Guard">Shooting Guard (SG)</option>
                  <option value="Small Forward">Small Forward (SF)</option>
                  <option value="Power Forward">Power Forward (PF)</option>
                  <option value="Center">Center (C)</option>
                </select>
              </div>
              <div class="input-group">
                <label for="skillLevel">Trình độ kỹ năng (1-5)</label>
                <div class="skill-level-slider">
                  <input type="range" id="skillLevel" v-model.number="profileForm.skillLevel" min="1" max="5" class="form-input range-input" />
                  <span class="skill-value">{{ profileForm.skillLevel }}</span>
                </div>
              </div>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn btn-primary" :disabled="isUpdating">
                {{ isUpdating ? 'Đang lưu...' : 'Lưu thay đổi' }}
              </button>
            </div>
          </form>
        </div>

        <!-- Security Card -->
        <div v-if="activeTab === 'security'" class="profile-card">
          <div class="card-header">
            <h2>Đổi mật khẩu</h2>
            <p class="text-secondary">Bảo vệ tài khoản của bạn bằng một mật khẩu mạnh.</p>
          </div>
          <form @submit.prevent="handleChangePassword" class="profile-form">
            <div class="form-group">
              <div class="input-group">
                <label for="currentPassword">Mật khẩu hiện tại</label>
                <input type="password" id="currentPassword" v-model="passwordForm.currentPassword" class="form-input" required placeholder="Nhập mật khẩu hiện tại" />
              </div>
            </div>
            
            <div class="form-group">
              <div class="input-group">
                <label for="newPassword">Mật khẩu mới</label>
                <input type="password" id="newPassword" v-model="passwordForm.newPassword" class="form-input" required placeholder="Nhập mật khẩu mới" minlength="6" />
              </div>
            </div>

            <div class="form-group">
              <div class="input-group">
                <label for="confirmPassword">Xác nhận mật khẩu mới</label>
                <input type="password" id="confirmPassword" v-model="passwordForm.confirmPassword" class="form-input" required placeholder="Nhập lại mật khẩu mới" minlength="6" />
                <span v-if="passwordError" class="error-text">{{ passwordError }}</span>
              </div>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn btn-primary" :disabled="isChangingPassword || !!passwordError">
                {{ isChangingPassword ? 'Đang cập nhật...' : 'Cập nhật mật khẩu' }}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, watch } from 'vue'

const { user, updateProfile, changePassword } = useAuth()
const pending = ref(true)

const activeTab = ref('info')
const isUpdating = ref(false)
const isChangingPassword = ref(false)
const passwordError = ref('')

const notification = reactive({
  show: false,
  message: '',
  type: 'success' // success, error
})

const showNotification = (msg: string, type = 'success') => {
  notification.message = msg
  notification.type = type
  notification.show = true
  setTimeout(() => {
    notification.show = false
  }, 3000)
}

// Form state
const profileForm = reactive({
  name: '',
  phoneNumber: '',
  location: '',
  position: '',
  skillLevel: 1
})

const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Validation watcher
watch(() => [passwordForm.newPassword, passwordForm.confirmPassword], ([newPass, confirmPass]) => {
  if (confirmPass && newPass !== confirmPass) {
    passwordError.value = 'Mật khẩu xác nhận không khớp!'
  } else {
    passwordError.value = ''
  }
})

onMounted(() => {
  // Simulate loading to ensure user state is fetched initially
  setTimeout(() => {
    pending.value = false
    if (user.value) {
      profileForm.name = user.value.name || ''
      profileForm.phoneNumber = user.value.phoneNumber || ''
      profileForm.location = user.value.location || ''
      profileForm.position = user.value.position || ''
      profileForm.skillLevel = user.value.skillLevel || 1
    } else {
      navigateTo('/login')
    }
  }, 500)
})

const handleUpdateProfile = async () => {
  if (isUpdating.value) return
  isUpdating.value = true
  
  try {
    const success = await updateProfile({
      name: profileForm.name,
      phoneNumber: profileForm.phoneNumber,
      location: profileForm.location,
      position: profileForm.position,
      skillLevel: profileForm.skillLevel
    })
    
    if (success) {
      showNotification('Cập nhật hồ sơ thành công!', 'success')
    } else {
      showNotification('Có lỗi xảy ra, vui lòng thử lại sau.', 'error')
    }
  } catch (err: any) {
    showNotification(err.data?.message || 'Cập nhật thất bại.', 'error')
  } finally {
    isUpdating.value = false
  }
}

const handleChangePassword = async () => {
  if (isChangingPassword.value || passwordError.value) return
  isChangingPassword.value = true
  
  try {
    const success = await changePassword(passwordForm.currentPassword, passwordForm.newPassword)
    if (success) {
      showNotification('Đổi mật khẩu thành công!', 'success')
      passwordForm.currentPassword = ''
      passwordForm.newPassword = ''
      passwordForm.confirmPassword = ''
    } else {
      showNotification('Mật khẩu hiện tại không đúng hoặc có lỗi xảy ra.', 'error')
    }
  } catch (err: any) {
    showNotification(err.data?.message || 'Đổi mật khẩu thất bại.', 'error')
  } finally {
    isChangingPassword.value = false
  }
}
</script>

<style scoped>
.profile-page {
  padding-top: var(--spacing-2xl);
  padding-bottom: var(--spacing-2xl);
  max-width: 1000px;
}

/* Header Sections */
.profile-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-xl);
  padding: var(--spacing-xl);
  background-color: var(--bg-secondary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--bg-tertiary);
  margin-bottom: var(--spacing-xl);
}

.avatar-container {
  position: relative;
  width: 120px;
  height: 120px;
  flex-shrink: 0;
}

.profile-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--bg-primary);
  background-color: var(--bg-tertiary);
}

.edit-avatar-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid var(--bg-secondary);
  cursor: pointer;
  transition: transform 0.2s ease;
}

.edit-avatar-btn:hover {
  transform: scale(1.1);
}

.profile-title h1 {
  font-size: 2rem;
  margin-bottom: var(--spacing-xs);
  color: var(--text-main);
  letter-spacing: -0.5px;
}

.role-badge {
  display: inline-block;
  padding: 4px 12px;
  background-color: rgba(255, 87, 34, 0.1);
  color: var(--color-primary);
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: capitalize;
}

/* Layout */
.grid-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: var(--spacing-xl);
}

@media (max-width: 768px) {
  .grid-layout {
    grid-template-columns: 1fr;
  }
}

/* Sidebar Navigation */
.profile-nav {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.nav-item {
  text-align: left;
  padding: var(--spacing-md);
  background: transparent;
  color: var(--color-text-secondary);
  border-radius: var(--radius-md);
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.2s ease;
}

.nav-item:hover {
  background-color: var(--bg-secondary);
  color: var(--text-main);
}

.nav-item.active {
  background-color: var(--bg-secondary);
  color: var(--color-primary);
  font-weight: 600;
  border-left: 3px solid var(--color-primary);
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

/* Main Cards */
.profile-card {
  background-color: var(--bg-secondary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--bg-tertiary);
  padding: var(--spacing-xl);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.card-header {
  margin-bottom: var(--spacing-xl);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--bg-tertiary);
}

.card-header h2 {
  font-size: 1.5rem;
  margin-bottom: var(--spacing-xs);
}

/* Form Styles */
.form-group {
  margin-bottom: var(--spacing-lg);
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-lg);
}

@media (max-width: 640px) {
  .grid-2 {
    grid-template-columns: 1fr;
  }
}

.input-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: var(--spacing-sm);
  color: var(--text-main);
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  border: 1px solid var(--bg-tertiary);
  background-color: var(--bg-primary);
  color: var(--text-main);
  font-family: inherit;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(255, 87, 34, 0.1);
}

.form-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: var(--bg-tertiary);
}

/* Form Specific elements */
.skill-level-slider {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.range-input {
  flex: 1;
  padding: 0;
  height: 6px;
  -webkit-appearance: none;
  background: var(--bg-tertiary);
  border-radius: var(--radius-full);
}

.range-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--color-primary);
  cursor: pointer;
}

.skill-value {
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--color-primary);
  min-width: 24px;
  text-align: center;
}

.form-actions {
  margin-top: var(--spacing-xl);
  display: flex;
  justify-content: flex-end;
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: wait;
}

.error-text {
  color: #f44336;
  font-size: 0.875rem;
  margin-top: 4px;
  display: block;
}

/* Toast Notifications */
.notification-toast {
  padding: 12px 20px;
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-lg);
  font-weight: 500;
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.notification-toast.success {
  background-color: rgba(76, 175, 80, 0.1);
  color: #4CAF50;
  border: 1px solid rgba(76, 175, 80, 0.2);
}

.notification-toast.error {
  background-color: rgba(244, 67, 54, 0.1);
  color: #f44336;
  border: 1px solid rgba(244, 67, 54, 0.2);
}

/* Skeleton Loading State */
.skeleton {
  animation: pulse 1.5s infinite ease-in-out;
}

@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 0.3; }
  100% { opacity: 0.6; }
}

.avatar-skeleton {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: var(--bg-tertiary);
}

.info-skeleton {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

.line {
  height: 24px;
  border-radius: 4px;
  background-color: var(--bg-tertiary);
}

.title-line { width: 30%; height: 32px; }
.subtitle-line { width: 15%; }
</style>
