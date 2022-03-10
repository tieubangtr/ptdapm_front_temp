const pkg = require('./package')


const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
  mode: 'spa',
<<<<<<< HEAD

=======
>>>>>>> fix axios, add client
  /*
  ** Headers of the page
  */
  head: {
<<<<<<< HEAD
    title: 'Vue Material Admin Template',
=======
    title: 'Thư viện Đại học Thủy Lợi',
>>>>>>> fix axios, add client
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {
<<<<<<< HEAD
        hid: 'description', name: 'description', content: 'Vue Material Admin Template is a \n' +
          '    Google Material Design inspired admin dashboard template built with Vue and Vuetify.'
=======
        hid: 'description', name: 'description', content: 'hehehe \n' +
          '    brbrbrbr'
>>>>>>> fix axios, add client
      }
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ],
    script: [
      {src: 'https://cdnjs.cloudflare.com/ajax/libs/echarts/4.0.4/echarts-en.min.js'}
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#3adced'},

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/theme.styl',
    '~/assets/style/app.styl',
    'font-awesome/css/font-awesome.css',
    'roboto-fontface/css/roboto/roboto-fontface.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify',
    '@/plugins/vee-validate'
  ],

  /*
  ** Nuxt.js modules
  */
<<<<<<< HEAD
  modules: [],

=======
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],

  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },
>>>>>>> fix axios, add client
  /*
  ** Build configuration
  */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ["~assets/style/variables.styl"]
      }
    },

    /*
    ** You can extend webpack config here
    */
<<<<<<< HEAD
=======

    auth: {
      redirect: {
          login: '/login',
          logout: '/login',
          home: '/'
      }
    },
>>>>>>> fix axios, add client
    extend(config, ctx) {

    }
  }
}
