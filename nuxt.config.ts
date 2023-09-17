// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true }
  modules: [
    '@nuxtjs/tailwindcss',
    ['@pinia/nuxt', { autoImports: ['defineStore'] }],
    'dayjs-nuxt',
    '@nuxtjs/i18n',
  ],
  runtimeConfig: {
    public: {
      apiBase: 'http://127.0.0.1:3600',
    },
  },
  css: ['@fortawesome/fontawesome-svg-core/styles.css'],
  ssr: false,
  app: {
    pageTransition: { name: 'bounce' },
    head: {
      title: 'base nuxt',
      meta: [
        {
          content: 'base nuxt',
        },
      ],
      link: [
        {
          type: 'image/x-icon',
          rel: 'shortcut icon',
          // href: 'https://base-nest.vercel.app/api/v1/images/logo-basenuxt.png',
          href: 'http://[::1]:3600/api/v1/file/eye Ai.jpg',
        },
      ],
    },
  },
  experimental: {
    localLayerAliases: true,
  },
  i18n: {
    vueI18n: './i18n.config.ts', // if you are using custom path, default
  },

  imports: {
    dirs: ['stores', 'services', 'utils'],
  },
});
