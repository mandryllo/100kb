/* globals defineNuxtConfig */

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    'nuxt-lodash',
    'nuxt-security',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    'nuxt-seo-utils'
  ],
  components: [{
    path: '~/components',
    pathPrefix: false
  }],
  devtools: { enabled: true },
  app: {
    head: {
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
  runtimeConfig: {
    cronSecret: process.env.CRON_SECRET
  },
  compatibilityDate: '2024-11-01',
  nitro: {
    experimental: {
      tasks: true
    },
    vercel: {
      config: {
        crons: [
          {
            path: '/api/vercel_cron/task',
            schedule: '0 0 * * *'
          }
        ]
      }
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
