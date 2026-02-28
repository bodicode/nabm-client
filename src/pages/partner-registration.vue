<template>
  <div class="partner-registration-page">
    <div class="registration-container">
      <div class="header">
        <NuxtLink to="/" class="back-link">&larr; Quay lại trang chủ</NuxtLink>
        <h1 class="title">Đăng Ký Đối Tác Sân Bóng</h1>
        <p class="subtitle">Hoàn thành thông tin để đưa sân bóng của bạn lên hệ thống 3hours.</p>
      </div>

      <!-- Progress Bar -->
      <div class="progress-container">
        <div class="progress-steps">
          <div 
            v-for="step in 4" 
            :key="step"
            class="step"
            :class="{ active: currentStep === step, completed: currentStep > step }"
          >
            <div class="step-circle">{{ step }}</div>
            <div class="step-label">{{ stepLabels[step - 1] }}</div>
          </div>
        </div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" :style="{ width: `${((currentStep - 1) / 3) * 100}%` }"></div>
        </div>
      </div>

      <div class="form-card">
        <form @submit.prevent="submitForm">
          
          <!-- STEP 1: Basic Info -->
          <div v-show="currentStep === 1" class="step-content">
            <h2 class="step-title">Thông tin cơ bản</h2>
            
            <div class="form-group">
              <label>Tên sân bóng <span class="required">*</span></label>
              <input type="text" v-model="formData.name" placeholder="Ví dụ: Downtown Hoops Center" class="form-input" required />
            </div>

            <div class="grid-2">
              <div class="form-group">
                <label>Loại thể thao</label>
                <select v-model="formData.sportType" class="form-input">
                  <option value="Basketball">Bóng rổ</option>
                  <option value="Football">Bóng đá</option>
                  <option value="Volleyball">Bóng chuyền</option>
                </select>
              </div>
              <div class="form-group">
                <label>Loại sân (Kích thước)</label>
                <select v-model="formData.courtType" class="form-input">
                  <option value="Full court">Full court (Sân lớn 5v5)</option>
                  <option value="Half court">Half court (Nửa sân 3v3)</option>
                </select>
              </div>
            </div>

            <div class="grid-2">
              <div class="form-group">
                <label>Số lượng sân (Sân nhỏ)</label>
                <input type="number" v-model="formData.numberOfCourts" class="form-input" min="1" />
              </div>
              <div class="form-group">
                <label>Chất liệu mặt sân</label>
                <select v-model="formData.floorType" class="form-input">
                  <option value="Wooden">Sàn Gỗ (Wooden)</option>
                  <option value="Concrete">Xi măng (Concrete)</option>
                  <option value="PU">Nhựa tổng hợp (PU)</option>
                  <option value="Rubber">Cao su (Rubber)</option>
                </select>
              </div>
            </div>

            <div class="grid-2">
              <div class="form-group">
                <label>Kích thước (D x R)</label>
                <input type="text" v-model="formData.dimensions" placeholder="Ví dụ: 28m x 15m" class="form-input" />
              </div>
              <div class="form-group checkbox-group">
                <label class="toggle-label">
                  <input type="checkbox" v-model="formData.isIndoor" />
                  <span class="toggle-text">Đây là sân trong nhà (Indoor)</span>
                </label>
              </div>
            </div>
          </div>

          <!-- STEP 2: Location & Contact -->
          <div v-show="currentStep === 2" class="step-content">
            <h2 class="step-title">Vị trí & Liên hệ</h2>
            
            <div class="form-group">
              <label>Địa chỉ cụ thể <span class="required">*</span></label>
              <input type="text" v-model="formData.address" placeholder="123 Main St, Phường X..." class="form-input" required />
            </div>

            <div class="grid-2">
              <div class="form-group">
                <label>Quận/Huyện <span class="required">*</span></label>
                <select v-model="formData.district" class="form-input" required>
                  <option value="District 1">Quận 1</option>
                  <option value="District 2">Quận 2</option>
                  <option value="District 3">Quận 3</option>
                  <option value="District 4">Quận 4</option>
                  <option value="District 5">Quận 5</option>
                  <option value="District 7">Quận 7</option>
                  <option value="District 10">Quận 10</option>
                  <option value="Binh Thanh">Bình Thạnh</option>
                  <option value="Thu Duc">Thủ Đức</option>
                </select>
              </div>
              <div class="form-group">
                <label>Tên người quản lý</label>
                <input type="text" v-model="formData.managerName" :placeholder="user?.name || 'Nguyễn Văn A'" class="form-input" />
              </div>
            </div>

            <div class="grid-2">
              <div class="form-group">
                <label>Số điện thoại liên hệ <span class="required">*</span></label>
                <input type="tel" v-model="formData.phoneNumber" placeholder="0901234567" class="form-input" required />
              </div>
              <div class="form-group">
                <label>Email liên hệ</label>
                <input type="email" v-model="formData.email" :placeholder="user?.email || 'manager@court.com'" class="form-input" />
              </div>
            </div>

            <div class="form-group">
              <label>Mạng xã hội (Zalo/Facebook Link)</label>
              <input type="text" v-model="formData.socialLink" placeholder="https://zalo.me/..." class="form-input" />
            </div>

            <!-- Hidden lat/long coords - mocking for now -->
            <input type="hidden" v-model.number="formData.latitude" />
            <input type="hidden" v-model.number="formData.longitude" />
          </div>

          <!-- STEP 3: Facilities & Media -->
          <div v-show="currentStep === 3" class="step-content">
            <h2 class="step-title">Hình ảnh & Tiện ích</h2>
            
            <div class="form-group">
              <label>Tiện ích có sẵn (Chọn nhiều)</label>
              <div class="facilities-grid">
                <label v-for="facility in availableFacilities" :key="facility" class="facility-checkbox">
                  <input type="checkbox" :value="facility" v-model="formData.facilities" />
                  <span>{{ facility }}</span>
                </label>
              </div>
            </div>

            <div class="form-group">
              <label>Mô tả tổng quan về sân</label>
              <textarea v-model="formData.description" rows="3" placeholder="Nhập mô tả ngắn gọn..." class="form-input"></textarea>
            </div>

            <div class="form-group">
              <label>Hình ảnh sân (Tải lên nhiều ảnh) <span class="required">*</span></label>
              <input type="file" multiple accept="image/*" @change="handleImageUpload" class="form-input" style="padding: 9px;" required />
              <div v-if="formData.images.length > 0" class="input-hint" style="margin-top: 0.5rem;">
                Đã chọn {{ formData.images.length }} ảnh.
              </div>
            </div>
            
            <div class="form-group">
              <label>Video giới thiệu sân (Tải lên 1 video file)</label>
              <input type="file" accept="video/*" @change="handleVideoUpload" class="form-input" style="padding: 9px;" />
              <div v-if="formData.video" class="input-hint" style="margin-top: 0.5rem;">
                Đã chọn video: {{ formData.video.name }}
              </div>
            </div>
          </div>

          <!-- STEP 4: Pricing & Policies -->
          <div v-show="currentStep === 4" class="step-content">
            <h2 class="step-title">Bảng giá & Chính sách</h2>
            
            <div class="grid-2">
              <div class="form-group">
                <label>Giá mỗi giờ (VNĐ) <span class="required">*</span></label>
                <input type="number" v-model.number="formData.pricePerHour" placeholder="100000" class="form-input" required />
              </div>
              <div class="form-group">
                <label>Yêu cầu đặt cọc</label>
                <input type="text" v-model="formData.deposit" placeholder="Ví dụ: 50% hoặc 50000" class="form-input" />
              </div>
            </div>

            <div class="form-group">
              <label>Phương thức thanh toán chấp nhận</label>
              <div class="facilities-grid">
                <label v-for="method in availablePaymentMethods" :key="method.value" class="facility-checkbox">
                  <input type="checkbox" :value="method.value" v-model="formData.paymentMethods" />
                  <span>{{ method.label }}</span>
                </label>
              </div>
            </div>

            <div class="form-group">
              <label>Chính sách hủy sân</label>
              <textarea v-model="formData.cancellationPolicy" rows="2" placeholder="Ví dụ: Hủy trước 24h hoàn tiền 100%..." class="form-input"></textarea>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div class="form-actions">
            <button 
              type="button" 
              class="btn btn-outline" 
              @click="prevStep" 
              v-show="currentStep > 1"
            >
              &larr; Quay lại
            </button>
            <div style="flex: 1"></div>
            
            <button 
              type="button" 
              class="btn btn-primary" 
              @click="nextStep" 
              v-show="currentStep < 4"
            >
              Tiếp tục &rarr;
            </button>
            
            <button 
              type="submit" 
              class="btn btn-accent" 
              v-show="currentStep === 4"
              :disabled="loading"
            >
              {{ loading ? 'Đang gửi...' : 'Hoàn tất Đăng ký' }}
            </button>
          </div>
        </form>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const { token, user } = useAuth()

const currentStep = ref(1)
const stepLabels = ['Thông tin', 'Vị trí', 'Tiện ích', 'Bảng giá']
const loading = ref(false)

const availableFacilities = [
  'Lighting', 'Roof', 'Water dispenser', 'Parking', 'WiFi', 'Locker', 'Toilet', 'Canteen'
]

const availablePaymentMethods = [
  { label: 'Tiền mặt', value: 'CASH' },
  { label: 'Chuyển khoản / Bank', value: 'BANK_TRANSFER' },
  { label: 'Ví MoMo', value: 'MOMO' },
  { label: 'ZaloPay', value: 'ZALOPAY' }
]



const formData = reactive({
  name: '',
  sportType: 'Basketball',
  courtType: 'Full court',
  isIndoor: false,
  floorType: 'Wooden',
  numberOfCourts: 1,
  dimensions: '',
  address: '',
  latitude: 10.762622,  // Default mockup
  longitude: 106.660172,// Default mockup
  district: 'District 1',
  managerName: user.value?.name || '',
  phoneNumber: '',
  email: user.value?.email || '',
  socialLink: '',
  pricePerHour: 100000,
  deposit: '50%',
  cancellationPolicy: 'Hủy trước 24h hoàn tiền 100%',
  paymentMethods: ['CASH', 'BANK_TRANSFER'],
  facilities: ['Lighting'],
  rating: 0,
  description: '',
  images: [] as File[],
  video: null as File | null
})

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    formData.images = Array.from(target.files)
  }
}

const handleVideoUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    formData.video = target.files[0] || null
  } else {
    formData.video = null
  }
}

const nextStep = () => {
  // basic validation logic would go here before advancing
  if (currentStep.value < 4) currentStep.value++
}

const prevStep = () => {
  if (currentStep.value > 1) currentStep.value--
}

const submitForm = async () => {
  loading.value = true
  
  const submitData = new FormData()
  
  // Append basic fields
  Object.keys(formData).forEach(key => {
    if (['images', 'video', 'facilities', 'paymentMethods'].includes(key)) return;
    
    const value = (formData as any)[key]
    if (value !== null && value !== undefined && value !== '') {
      submitData.append(key, value.toString())
    }
  })

  // Append arrays
  formData.facilities.forEach(item => {
    submitData.append('facilities[]', item)
  })
  
  formData.paymentMethods.forEach(item => {
    submitData.append('paymentMethods[]', item)
  })

  // Append files
  formData.images.forEach(file => {
    submitData.append('images', file) // append single parameter multiple times creates array of files on backend
  })
  
  if (formData.video) {
    submitData.append('video', formData.video)
  }
  
  try {
    const { data, error } = await useApi('/courts', {
      method: 'POST',
      body: submitData
      // Note: when body is FormData, fetch automatically sets Content-Type to multipart/form-data with boundary
    })

    if (error.value) {
      alert('Đã xảy ra lỗi khi đăng ký sân: ' + (error.value.data?.message || error.value.message))
    } else {
      alert('Đăng ký sân thành công! Chào mừng đối tác.')
      router.push('/')
    }
  } catch (err) {
    console.error(err)
    alert('Không thể kết nối tới server.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.partner-registration-page {
  min-height: 100vh;
  background-color: var(--bg-primary);
  padding: 3rem 1rem;
}

.registration-container {
  max-width: 800px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}

.back-link {
  display: inline-block;
  color: var(--color-text-secondary);
  font-weight: 500;
  margin-bottom: 2rem;
  transition: color 0.2s;
}

.back-link:hover {
  color: var(--color-primary);
}

.title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 0.5rem;
}

.subtitle {
  color: var(--color-text-secondary);
  font-size: 1.1rem;
}

/* Progress Bar */
.progress-container {
  margin-bottom: 3rem;
  position: relative;
}

.progress-steps {
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 2;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 80px;
}

.step-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--bg-tertiary);
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.125rem;
  transition: all 0.3s;
  border: 2px solid var(--bg-tertiary);
}

.step.active .step-circle {
  background-color: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(255, 87, 34, 0.2);
}

.step.completed .step-circle {
  background-color: var(--color-accent);
  color: white;
  border-color: var(--color-accent);
}

.step-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-muted);
  transition: color 0.3s;
  white-space: nowrap;
}

.step.active .step-label {
  color: var(--text-main);
}

.step.completed .step-label {
  color: var(--color-accent);
}

.progress-bar-bg {
  position: absolute;
  top: 20px;
  left: 40px;
  right: 40px;
  height: 4px;
  background-color: var(--bg-tertiary);
  z-index: 1;
  transform: translateY(-50%);
}

.progress-bar-fill {
  height: 100%;
  background-color: var(--color-accent);
  transition: width 0.3s ease;
}

/* Form Styles */
.form-card {
  background-color: var(--bg-secondary);
  border: 1px solid var(--bg-tertiary);
  border-radius: var(--radius-lg);
  padding: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

/* Light mode shadow */
:global([data-theme="light"]) .form-card {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.step-content {
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.step-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--bg-tertiary);
}

.form-group {
  margin-bottom: 1.5rem;
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-main);
}

.required {
  color: var(--color-primary);
}

.input-hint {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  margin-top: -0.25rem;
  margin-bottom: 0.5rem;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  border: 1px solid var(--bg-tertiary);
  background-color: var(--bg-primary);
  color: var(--text-main);
  font-size: 1rem;
  transition: all 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(255, 87, 34, 0.1);
}

textarea.form-input {
  resize: vertical;
}

/* Checkboxes and Radios */
.checkbox-group {
  display: flex;
  align-items: center;
  height: 100%;
  padding-top: 1rem;
}

.toggle-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.toggle-label input[type="checkbox"] {
  width: 1.2rem;
  height: 1.2rem;
  accent-color: var(--color-primary);
}

.facilities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 0.5rem;
}

.facility-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: var(--radius-sm);
  background-color: var(--bg-primary);
  border: 1px solid var(--bg-tertiary);
  transition: all 0.2s;
}

.facility-checkbox:hover {
  border-color: var(--color-primary);
}

.facility-checkbox input[type="checkbox"] {
  accent-color: var(--color-primary);
}

/* Actions */
.form-actions {
  display: flex;
  align-items: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--bg-tertiary);
}

.btn-accent {
  background-color: var(--color-accent);
  color: white;
  padding: 12px 24px;
  border-radius: var(--radius-md);
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-accent:hover {
  background-color: #2AAA46; /* slightly darker green */
}

.btn-accent:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .grid-2 {
    grid-template-columns: 1fr;
    gap: 0;
  }
  
  .form-card {
    padding: 1.5rem;
  }
  
  .progress-label {
    display: none;
  }
}
</style>
