/* globals defineNuxtConfig */

export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui'],
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Nuxt App Starter'
    }
  },
  css: ['~/assets/main.css'],
  compatibilityDate: '2024-11-01',
  eslint: {
    config: {
      stylistic: true
    }
  }
});
