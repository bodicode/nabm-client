<template>
    <div class="court-detail-page container" v-if="court">
        <!-- Breadcrumbs -->
        <nav class="breadcrumbs">
            <NuxtLink to="/">Trang chủ</NuxtLink>
            <span class="separator">/</span>
            <NuxtLink to="/courts">Sân bóng</NuxtLink>
            <span class="separator">/</span>
            <span class="current">{{ court.name }}</span>
        </nav>

        <!-- Header Section -->
        <header class="court-header">
            <div class="header-main">
                <h1 class="court-title">{{ court.name }}</h1>
                <p class="court-address">📍 {{ court.address || 'Đang cập nhật địa chỉ' }}</p>
                <div class="court-meta">
                    <span class="rating">⭐ {{ court.rating || 0 }}</span>
                    <span class="sport-type badge">{{ court.sportType }}</span>
                </div>
            </div>
            <div class="header-actions">
                <button class="btn btn-outline" @click="shareCourt">Chia Sẻ</button>
            </div>
        </header>

        <div class="court-layout">
            <!-- Main Content -->
            <div class="main-content">
                <!-- Media Gallery -->
                <div class="media-gallery" v-if="court.images?.length || court.video">
                    <div class="main-image">
                        <img :src="currentMedia" :alt="court.name" />
                    </div>
                    <div class="thumbnails" v-if="court.images?.length > 1">
                        <button v-for="(img, idx) in court.images" :key="idx" class="thumb-btn"
                            :class="{ active: currentMedia === img }" @click="currentMedia = img">
                            <img :src="img" :alt="`Thumbnail ${Number(idx) + 1}`" />
                        </button>
                    </div>
                </div>

                <!-- Description -->
                <section class="section-block">
                    <h2>Giới Thiệu</h2>
                    <p class="description-text">{{ court.description || 'Chưa có thông tin giới thiệu về sân này.' }}
                    </p>
                </section>

                <!-- Details Grid -->
                <section class="section-block details-grid">
                    <div class="detail-item">
                        <span class="label">Loại sân:</span>
                        <span class="value">{{ court.courtType || 'Đang cập nhật' }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Mặt sân:</span>
                        <span class="value">{{ court.floorType || 'Đang cập nhật' }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Khu vực:</span>
                        <span class="value">{{ court.isIndoor ? 'Trong nhà' : 'Ngoài trời' }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Kích thước:</span>
                        <span class="value">{{ court.dimensions || 'Tiêu chuẩn' }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Số lượng sân:</span>
                        <span class="value">{{ court.numberOfCourts }}</span>
                    </div>
                </section>

                <!-- Facilities -->
                <section class="section-block" v-if="court.facilities?.length">
                    <h2>Tiện Ích</h2>
                    <div class="facilities-list">
                        <div class="facility-item" v-for="tag in court.facilities" :key="tag">
                            ✅ {{ tag }}
                        </div>
                    </div>
                </section>

                <!-- Cancellation Policy -->
                <section class="section-block" v-if="court.cancellationPolicy">
                    <h2>Chính Sách Hủy Sân</h2>
                    <p class="description-text">{{ court.cancellationPolicy }}</p>
                </section>
            </div>

            <!-- Sidebar / Booking Widget -->
            <aside class="sidebar">
                <div class="booking-widget sticky">
                    <div class="price-header">
                        <span class="price-label">Giá thuê từ</span>
                        <h3 class="price-value">{{ court.pricePerHour ? court.pricePerHour + 'k/Giờ' : 'Liên hệ' }}</h3>
                    </div>

                    <div class="widget-details">
                        <div class="widget-row" v-if="court.deposit">
                            <span>Yêu cầu cọc:</span>
                            <strong>{{ court.deposit }}</strong>
                        </div>
                        <div class="widget-row" v-if="court.paymentMethods?.length">
                            <span>Thanh toán:</span>
                            <strong>{{ court.paymentMethods.join(', ') }}</strong>
                        </div>
                    </div>

                    <button class="btn btn-primary full-width large">Đặt Sân Ngay</button>

                    <div class="contact-info mt-4 pt-4 border-t border-tertiary">
                        <h4 class="text-sm font-bold mb-2 text-secondary">Thông tin liên hệ</h4>
                        <div class="contact-row" v-if="court.managerName">
                            <span>👤</span> {{ court.managerName }}
                        </div>
                        <div class="contact-row" v-if="court.phoneNumber">
                            <span>📞</span> {{ court.phoneNumber }}
                        </div>
                        <div class="contact-row" v-if="court.email">
                            <span>✉️</span> <a :href="`mailto:${court.email}`">{{ court.email }}</a>
                        </div>
                        <div class="contact-row" v-if="court.socialLink">
                            <span>🔗</span> <a :href="court.socialLink" target="_blank" rel="noopener">Mạng xã hội</a>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    </div>

    <div class="container py-xl text-center" v-else-if="pending">
        <div class="text-secondary text-lg">Đang tải thông tin sân...</div>
    </div>

    <div class="container py-xl text-center" v-else-if="error">
        <h2 class="text-accent text-2xl mb-4">Sân không tồn tại hoặc đã xảy ra lỗi.</h2>
        <NuxtLink to="/courts" class="btn btn-primary">Quay lại danh sách</NuxtLink>
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const route = useRoute()
const courtId = route.params.id

const { data: court, pending, error } = await useApi<any>(`/courts/${courtId}`)

const currentMedia = ref<string>('https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800')

watchEffect(() => {
    if (court.value && court.value.images && court.value.images.length > 0) {
        currentMedia.value = court.value.images[0]
    }
})

const shareCourt = () => {
    if (navigator.share) {
        navigator.share({
            title: court.value?.name,
            url: window.location.href
        }).catch(console.error)
    } else {
        navigator.clipboard.writeText(window.location.href)
        alert('Đã copy link sân!')
    }
}
</script>

<style scoped>
.court-detail-page {
    padding-top: var(--spacing-xl);
    padding-bottom: var(--spacing-2xl);
}

.breadcrumbs {
    display: flex;
    gap: 8px;
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-lg);
}

.breadcrumbs a {
    color: var(--color-primary);
    text-decoration: none;
}

.breadcrumbs a:hover {
    text-decoration: underline;
}

.separator {
    color: var(--bg-tertiary);
}

.current {
    color: var(--text-main);
    font-weight: 500;
}

/* Header */
.court-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: var(--spacing-xl);
    flex-wrap: wrap;
    gap: var(--spacing-md);
}

.court-title {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 8px;
    text-transform: uppercase;
}

.court-address {
    font-size: 1.1rem;
    color: var(--color-text-secondary);
    margin-bottom: 12px;
}

.court-meta {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
}

.rating {
    font-weight: 600;
    color: #FFC107;
}

.badge {
    background-color: var(--bg-tertiary);
    padding: 4px 12px;
    border-radius: var(--radius-full);
    font-size: 0.875rem;
    color: var(--text-main);
    font-weight: 500;
}

/* Layout */
.court-layout {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: var(--spacing-2xl);
    align-items: start;
}

/* Main Content */
.media-gallery {
    margin-bottom: var(--spacing-xl);
}

.main-image {
    width: 100%;
    height: 400px;
    border-radius: var(--radius-lg);
    overflow: hidden;
    margin-bottom: var(--spacing-sm);
    background-color: var(--bg-tertiary);
}

.main-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.thumbnails {
    display: flex;
    gap: var(--spacing-sm);
    overflow-x: auto;
    padding-bottom: 4px;
    /* for scrollbar */
}

.thumb-btn {
    width: 80px;
    height: 60px;
    border-radius: var(--radius-sm);
    overflow: hidden;
    border: 2px solid transparent;
    cursor: pointer;
    padding: 0;
    background: none;
    flex-shrink: 0;
}

.thumb-btn.active {
    border-color: var(--color-primary);
}

.thumb-btn img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.section-block {
    margin-bottom: var(--spacing-xl);
}

.section-block h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: var(--spacing-md);
    padding-bottom: var(--spacing-xs);
    border-bottom: 1px solid var(--bg-tertiary);
}

.description-text {
    font-size: 1rem;
    line-height: 1.6;
    color: var(--color-text-secondary);
    white-space: pre-wrap;
}

.details-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: var(--spacing-md);
}

.detail-item {
    background-color: var(--bg-secondary);
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
    border: 1px solid var(--bg-tertiary);
}

.detail-item .label {
    display: block;
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    margin-bottom: 4px;
}

.detail-item .value {
    display: block;
    font-weight: 600;
    font-size: 1rem;
}

.facilities-list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
}

.facility-item {
    background-color: var(--bg-secondary);
    padding: 8px 16px;
    border-radius: var(--radius-md);
    font-size: 0.95rem;
    border: 1px solid var(--bg-tertiary);
}

/* Sidebar Widget */
.sticky {
    position: sticky;
    top: 100px;
}

.booking-widget {
    background-color: var(--bg-secondary);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    border: 1px solid var(--bg-tertiary);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.price-header {
    margin-bottom: var(--spacing-md);
    padding-bottom: var(--spacing-md);
    border-bottom: 1px solid var(--bg-tertiary);
}

.price-label {
    display: block;
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    margin-bottom: 4px;
}

.price-value {
    font-size: 2rem;
    font-weight: 800;
    color: var(--text-main);
    margin: 0;
}

.widget-details {
    margin-bottom: var(--spacing-lg);
}

.widget-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 0.95rem;
    color: var(--color-text-secondary);
}

.widget-row strong {
    color: var(--text-main);
}

.contact-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 10px;
    font-size: 0.95rem;
    color: var(--color-text-secondary);
}

.contact-row a {
    color: var(--color-primary);
    text-decoration: none;
}

.contact-row a:hover {
    text-decoration: underline;
}

.border-t {
    border-top-width: 1px;
}

.border-tertiary {
    border-color: var(--bg-tertiary);
}

.pt-4 {
    padding-top: 1rem;
}

.mt-4 {
    margin-top: 1rem;
}

.full-width {
    width: 100%;
}

.large {
    padding: 14px;
    font-size: 1.1rem;
}

@media (max-width: 992px) {
    .court-layout {
        grid-template-columns: 1fr;
    }

    .booking-widget {
        position: static;
    }
}

@media (max-width: 768px) {
    .court-title {
        font-size: 2rem;
    }

    .main-image {
        height: 250px;
    }
}
</style>
