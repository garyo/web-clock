// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['vuetify/lib/styles/main.sass',
        '@mdi/font/css/materialdesignicons.min.css'],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
  app: {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
      title: 'web-clock',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { hid: 'description', name: 'description', content: 'Simple Full-Page Web Clock' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Overpass+Mono:wght@100;200;400;800&family=Comfortaa:wght@100;200;400;800',
        },
      ]
    },
  }
})
