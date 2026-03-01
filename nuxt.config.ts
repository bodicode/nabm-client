// https://nuxt.com/docs/api/configuration/nuxt-config
// Trigger restart to load new .env variables
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  devServer: {
    port: 4000
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      backendUrl: process.env.NUXT_PUBLIC_BACKEND_URL
    }
  },
  srcDir: 'src/',
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Hoops Connect - Community Basketball',
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap' }
      ]
    }
  }
})
