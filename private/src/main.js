import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$http = Axios
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
