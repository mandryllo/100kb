/* globals defineNuxtConfig */

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    'nuxt-lodash'
  ],
  ssr: false,
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
  compatibilityDate: '2024-11-01',
  eslint: {
    config: {
      stylistic: true
    }
  },
  lodash: {
    prefix: '_',
    upperAfterPrefix: false
  }
});
