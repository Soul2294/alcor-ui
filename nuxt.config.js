require('dotenv').config()
const path = require('path')
const fs = require('fs')

const config = require('./config')
const pkg = require('./package')

const isSPA = process.argv.includes('--spa')
const isDev =
  process.env.npm_lifecycle_event == 'dev' ||
  process.argv.includes('--dev') ||
  process.env.NODE_ENV !== 'production'

// const desc = config.APP_NAME + ' is the Swiss knife for decentralized finance! Yield-based Liquidity Pools | Limit Trading | NFT Market and much more!'

module.exports = {
  telemetry: false,

  env: {
    isDev,
    isSPA,
    NETWORK: process.env.NETWORK,
    DISABLE_DB: process.env.DISABLE_DB,
    WAX_SWAP_CONTRACT: process.env.WAX_SWAP_CONTRACT,
  },

  version: pkg.version,

  /*
   ** Headers of the page
   */
  head() {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
    const desc = `Alcor Exchange ${this.$t('META_DESCRIPTION')}`
    const title = `Alcor Exchange | ${this.$t('META_TITLE')}`

    return {
      title,
      htmlAttrs: { ...i18nHead.htmlAttrs },
      meta: [
        { charset: 'utf-8' },
        { hid: 'description', name: 'description', content: desc },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'msapplication-TileColor', content: '#da532c' },
        {
          hid: 'og:image',
          name: 'og:image',
          content: '/android-chrome-512x512.png'
        },
        ...i18nHead.meta
      ],
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png'
        },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'mask-icon', color: '#5bbad5', href: '/safari-pinned-tab.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        ...i18nHead.link
      ]
    }
  },

  // head.old
  // head: {
  //   title: config.APP_NAME + ' | EOS Trustless DEX.',

  //   meta: [
  //     { charset: 'utf-8' },
  //     { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  //     { hid: 'description', name: 'description', content: desc },
  //     { name: 'msapplication-TileColor', content: '#da532c' },

  //     { hid: 'og:image', name: 'og:image', content: '/android-chrome-512x512.png' }

  //     //{ name: 'theme-color', content: '#ffffff' }
  //     //{ name: 'viewport', content: 'user-scalable = yes' }
  //   ],

  //   //script: [
  //   //  { src: '/datafeeds/udf/dist/bundle.js' }
  //   //],

  //   link: [
  //     { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
  //     { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
  //     { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
  //     { rel: 'manifest', href: '/site.webmanifest' },
  //     { rel: 'mask-icon', color: '#5bbad5', href: '/safari-pinned-tab.svg' },
  //     { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  //   ]
  // },

  /*
   ** Customize the progress-bar color
   */
  loading: false,

  /*
   ** Global CSS
   */
  css: [
    // TODO Оставить только грид и ребут
    'bootstrap/dist/css/bootstrap.min.css',

    'bootstrap/dist/css/bootstrap-grid.min.css',
    'bootstrap/dist/css/bootstrap-reboot.min.css',

    'bootstrap-utilities/bootstrap-utilities.css',

    //'element-ui/lib/theme-chalk/index.css',
    //'~/assets/theme/_variables.scss',
    //'~/assets/theme/index.css',
    '~/assets/main.scss'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/element-ui',
    '~/plugins/mixins',
    '~/plugins/filters',
    '~/plugins/global',
    '~/plugins/vClickOutside.js',
    '~/plugins/muttedDirective.js',
    '~/plugins/routerSync.js',
    '~/plugins/analytics.js',

    { ssr: false, src: '~/plugins/TVChart.js' },
    { ssr: false, src: '~/plugins/apiInstance.js' },
    { ssr: false, src: '~/plugins/virtualScroller.js' },
    { ssr: false, src: '~/plugins/infinite.js' },
    { ssr: false, src: '~/plugins/startapp.js' },
    { ssr: false, src: '~/plugins/localStorage.js' },
    { ssr: false, src: '~/plugins/vue-apexchart.js' },
    { ssr: false, src: '~/plugins/vue-grid.js' },
    { ssr: false, src: '~/plugins/mo-js.js', mode: 'client' },
    { ssr: false, src: '~/plugins/intercom.js' }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/sentry',
    'nuxt-highcharts',
    //'vue-github-buttons/nuxt',
    'vue-scrollto/nuxt',
    '@nuxtjs/i18n',
    'cookie-universal-nuxt',
    '@nuxt/image'
    //'nuxt-purgecss' // FIXME Fails on docker pro
  ],
  i18n: {
    langDir: '~/locales',
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.js' },
      { code: 'ru', iso: 'ru-RU', file: 'ru.js' },
      { code: 'cn', iso: 'zh_CN', file: 'cn.js' },
      { code: 'ph', iso: 'ph_PH', file: 'ph.js' },
      { code: 'ua', iso: 'ua_UA', file: 'ua.js' },
      { code: 'it', iso: 'it_IT', file: 'it.js' }
    ],
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },
  highcharts: {
    /* module options */
  },

  axios: {},

  colorMode: {
    //preference: 'system', // default value of $colorMode.preference
    preference: 'dark', // default value of $colorMode.preference
    fallback: 'dark', // fallback value if not system preference found
    classPrefix: 'theme-',
    classSuffix: ''
  },

  //components: true,

  /*
   ** Sentry module configuration
   */
  sentry: {
    dsn: 'https://b28cbcd4c0ba438bbb8b6baeebf5fba0@sentry.alcor.exchange/2',
    disabled: true, // TODO DISABLED FOR NOW! (second server host sentry)
    publishRelease: true
  },

  buildModules: [
    '@nuxtjs/color-mode',
    '@nuxtjs/device',
  ],
  /*
   ** Build configuration
   */
  build: {
    standalone: true,

    extend(config, { isDev, isClient }) {
      config.resolve.alias.jsbi = path.resolve(__dirname, 'node_modules', 'jsbi', 'dist', 'jsbi-cjs.js')

      config.node = {
        fs: 'empty'
      }

      if (isClient) {
        config.devtool = 'source-map'
      }

      // Run ESLint on save
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          esModule: false,
          name: '[path][name].[ext]'
        }
      })

      config.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      })

      if (isSPA) {
        config.output.publicPath = './_nuxt/'
      }
    }
  },

  router: {
    mode: isSPA ? 'hash' : 'history',
    linkActiveClass: 'active'
  },

  cache: {
    useHostPrefix: true,
    pages: [
      /^\/nft-market/

      ///^\/pools\/.*/,

      ///^\/$/
    ],
    store: {
      type: 'memory',
      max: 100,
      ttl: 60
    }
  },

  // Just https for testing ultra plugin wallet
  // server: {
  //   https: {
  //     key: fs.readFileSync(path.resolve(__dirname, 'localhost+2-key.pem')),
  //     cert: fs.readFileSync(path.resolve(__dirname, 'localhost+2.pem')),
  //   },
  //   host: 'localhost', // Хост
  //   port: 443, // Порт для HTTPS
  // },
}
