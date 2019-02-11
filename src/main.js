import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { keycloak, axios_keycloak } from './axios_keycloak'
import store from './store'

Vue.config.productionTip = false

Vue.prototype.$axios = axios_keycloak
Vue.prototype.$keycloak = keycloak

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
