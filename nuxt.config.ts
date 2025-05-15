/* globals defineNuxtConfig */

export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui'],
  devtools: { enabled: true },
  app: {
    head: {
      title: '100kb.space',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/logo.svg' }
      ]
    }
  },
  css: ['~/assets/main.css'],
  ui: {
    colorMode: false
  },
  compatibilityDate: '2024-11-01',
  eslint: {
    config: {
      stylistic: true
    }
  }
});
