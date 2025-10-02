import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import axios from './plugins/axios'

loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .use(axios)
  .mount('#app')
