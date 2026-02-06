<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container hero-content">
        <h1 class="hero-title">CHINH PHỤC <br/><span class="text-accent">SÂN ĐẤU</span></h1>
        <p class="hero-subtitle">Tìm sân, cáp kèo và nâng tầm cuộc chơi với nền tảng bóng rổ cộng đồng hàng đầu.</p>
        <div class="hero-actions">
          <NuxtLink to="/courts" class="btn btn-primary big">Đặt Sân Ngay</NuxtLink>
          <NuxtLink to="/matchmaking" class="btn btn-outline big">Tìm Đối Thủ</NuxtLink>
        </div>
      </div>
      <div class="hero-overlay"></div>
    </section>

    <!-- Trending Courts -->
    <section class="section container">
      <div class="section-header">
        <h2>Sân Đang Hot</h2>
        <NuxtLink to="/courts" class="link-more">Xem Tất Cả &rarr;</NuxtLink>
      </div>
      <div class="grid-cols-3">
        <CourtCard 
          v-for="court in courts" 
          :key="court.id"
          v-bind="court"
        />
      </div>
    </section>

    <!-- Matchmaking Teaser -->
    <section class="section container">
      <div class="section-header">
        <h2>Sẵn Sàng Thi Đấu?</h2>
        <NuxtLink to="/matchmaking" class="link-more">Vào Sảnh Chờ &rarr;</NuxtLink>
      </div>
      <div class="grid-cols-3">
        <TeamCard 
          v-for="team in teams"
          :key="team.id"
          v-bind="team"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Mock Data
const courts = [
  {
    id: 1,
    name: "Downtown Hoops Center",
    location: "District 1, HCMC",
    price: "200k",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800",
    tags: ["Indoor", "Air Con"]
  },
  {
    id: 2,
    name: "Streetball Park A",
    location: "District 7, HCMC",
    price: "150k",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1505666287802-931dc83948e9?auto=format&fit=crop&q=80&w=800",
    tags: ["Outdoor", "Lighting"]
  },
  {
    id: 3,
    name: "Elite Sports Complex",
    location: "Thu Duc City",
    price: "300k",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1533591380348-14193f1de18f?auto=format&fit=crop&q=80&w=800",
    tags: ["Indoor", "Premium"]
  }
]

const teams = [
  {
    id: 1,
    name: "Red Bulls",
    level: "Advanced",
    wins: 12,
    losses: 3,
    logo: "https://ui-avatars.com/api/?name=Red+Bulls&background=ff5722&color=fff"
  },
  {
    id: 2,
    name: "Street Kings",
    level: "Intermediate",
    wins: 8,
    losses: 6,
    logo: "https://ui-avatars.com/api/?name=Street+Kings&background=333&color=fff"
  },
  {
    id: 3,
    name: "Rookie Ballers",
    level: "Beginner",
    wins: 2,
    losses: 10,
    logo: "https://ui-avatars.com/api/?name=Rookie+B&background=1e1e1e&color=fff"
  }
]
</script>

<style scoped>
.hero {
  height: 85vh;
  position: relative;
  display: flex;
  align-items: center;
  background-image: url('https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2090&auto=format&fit=crop'); /* Dark Mode: Indoor Action */
  background-size: cover;
  background-position: center;
  color: #FFFFFF;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to right, 
    rgba(6, 6, 6, 0.95) 0%, 
    rgba(6, 6, 6, 0.7) 40%, 
    rgba(255, 87, 34, 0.1) 100%
  );
  z-index: 1;
}

/* Light Theme Overrides */
:global([data-theme="light"]) .hero {
  background-image: url('https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?auto=format&fit=crop&q=80&w=2000'); /* Light Mode: Bright/Indoor/Community */
  color: #121212;
}

:global([data-theme="light"]) .hero-overlay {
  background: linear-gradient(to right, 
    rgba(240, 240, 240, 0.95) 0%, 
    rgba(240, 240, 240, 0.8) 40%, 
    rgba(255, 255, 255, 0.2) 100%
  );
}

:global([data-theme="light"]) .hero-title {
  text-shadow: none;
  color: #121212;
}

:global([data-theme="light"]) .hero-subtitle {
  color: #444;
  text-shadow: none;
}

/* Force Light Mode Outline Button to be Dark in Light Hero */
:global([data-theme="light"]) .hero .btn-outline {
  border-color: #121212;
  color: #121212;
}

:global([data-theme="light"]) .hero .btn-outline:hover {
  background-color: #121212;
  color: #fff;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
}

.hero-title {
  font-size: 5.5rem;
  line-height: 0.95;
  margin-bottom: var(--spacing-lg);
  text-transform: uppercase;
  font-style: italic;
  font-weight: 900;
  text-shadow: 2px 2px 0 rgba(0,0,0,0.5);
}

.hero-subtitle {
  font-size: 1.5rem;
  color: #E0E0E0;
  max-width: 600px;
  margin-bottom: var(--spacing-2xl);
  font-weight: 400;
  text-shadow: 1px 1px 0 rgba(0,0,0,0.5);
}

.hero-actions {
  display: flex;
  gap: var(--spacing-md);
}

.big {
  padding: 1rem 2.5rem;
  font-size: 1.125rem;
}

.section {
  padding-top: var(--spacing-2xl);
  padding-bottom: var(--spacing-2xl);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: var(--spacing-lg);
}

.section-header h2 {
  font-size: 2rem;
  font-weight: 700;
}

.link-more {
  color: var(--color-primary);
  font-weight: 600;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 3rem;
  }
}
</style>
