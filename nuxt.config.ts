/* globals defineNuxtConfig */

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    'nuxt-lodash',
    'nuxt-security',
    '@nuxtjs/seo'
  ],
  components: [{
    path: '~/components',
    pathPrefix: false
  }],
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
    theme: {
      colors: ['tertiary']
    }
  },
  compatibilityDate: '2024-11-01',
  nitro: {
    compatibilityDate: '2025-06-16',
    buildDir: '.nitro',
    experimental: {
      tasks: true
    },
    scheduledTasks: {
      '0 0 * * *': ['feed']
    }
  },
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
