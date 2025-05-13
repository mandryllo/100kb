/* globals defineNuxtConfig */

export default defineNuxtConfig({
  modules: ['@nuxt/eslint'],
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Nuxt App Starter'
    }
  },
  compatibilityDate: '2024-11-01',
  eslint: {
    config: {
      stylistic: true
    }
  }
});
