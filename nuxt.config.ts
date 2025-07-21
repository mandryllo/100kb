/* globals defineNuxtConfig */

const dbOptions = () => {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return { driver: 'memory' };
  return {
    driver: 'upstash', url, token };
};

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
    buildDir: '.nitro',
    experimental: {
      tasks: true
    },
    storage: {
      db: dbOptions()
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
