import App from './App'

// #ifndef VUE3
import Vue from 'vue'
// vue2全局
// import BASE_URL from './utils/api.js'
// Vue.prototype.$BASE_URL = BASE_URL
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import {BASE_URL} from './utils/api.js'
import {device} from './utils/device.js'
//vue3全局
export function createApp() {
  const app = createSSRApp(App)
  app.config.globalProperties.$BASE_URL = BASE_URL 
  app.config.globalProperties.$device = device
  return {
    app
  }
}

// #endif