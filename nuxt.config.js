export default {
  env: {
    SERVER_URL: "http://192.168.88.42",
    // SERVER_URL: "https://aktam.com.tm",
  },

  loading: {
    color: "white"
  },

  ssr: false,

  head: {
    title: 'Ak-Tam bazar',
    meta: [{
      charset: 'utf-8'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      hid: 'description',
      name: 'description',
      content: process.env.npm_package_description || ""
    }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },

  css: [{
    src: "devextreme/dist/css/dx.common.css",
    lang: "css"
  },
  {
    src: 'devextreme/dist/css/dx.custom-theme.css',
    lang: "css"
  },
  {
    src: "vue-awesome-notifications/dist/styles/style.scss",
    lang: "css"
  },
  {
    src: "~/assets/themes/index.scss",
    lang: "scss"
  },
  ],
  styleResources: {
    scss: [
      '~/assets/themes/dx.variables.scss',
      '~/assets/themes/variables.scss',
      '~/assets/themes/custom-variables.scss',
      '~/assets/themes/index.scss',
    ],
  },
  plugins: [
    "~/plugins/axios",
    "~/plugins/data-api",
    "~/plugins/device-screen-width",
    "~/plugins/customStore",
    "~/plugins/notification",
    "~/plugins/awesome-notifications",
    "~/plugins/vuex-persistedstate",
    "~/plugins/nuxt-client-init.client.js"

  ],

  components: true,

  buildModules: [
    '@nuxt/typescript-build',
  ],

  modules: [
    'nuxtjs-mdi-font',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    'cookie-universal-nuxt',
    [
      "nuxt-i18n",
      {
        locales: [
          {
            name: "Russian",
            code: "ru",
            iso: "ru",
            file: "ru-RU.ts"
          },
          {
            name: "English",
            code: "en",
            iso: "en",
            file: "en-EN.ts"
          },

          {
            name: "Turkmen",
            code: "tk",
            iso: "tk",
            file: "tk-TM.ts"
          },
        ],
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: "locale",
          alwaysRedirect: true,
          fallbackLocale: "en-EN"
        },
        strategy: "no_prefix",
        lazy: true,
        langDir: "lang/",
        defaultLocale: "ru-RU",
        vuex: {
          moduleName: "i18n",
          syncLocale: true,
          syncMessages: true,
          syncRouteParams: true
        }
      }
    ],
  ],

  axios: {},

  pwa: {
    manifest: {
      lang: 'ru',
      background_color: "#fff",
      theme_color: "#009a40"
    }
  },

  buildDir: 'admin/dist',
  build: {
    publicPath: 'admin/dist/'
  }
}
