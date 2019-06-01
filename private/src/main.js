import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import store from './store'
import './http-interceptor'

Vue.config.productionTip = false
Vue.prototype.$http = Axios
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
