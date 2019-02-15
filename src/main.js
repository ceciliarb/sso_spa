import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { keycloak, axios_keycloak } from './axios_keycloak'
import store from './store'
import { can } from './permissions.js'

Vue.config.productionTip = false

Vue.prototype.$axios = axios_keycloak
Vue.prototype.$keycloak = keycloak

Vue.component('button-custom', require('./components/ButtonCustom.vue').default)

Vue.mixin({
  methods: {
    can: function (name) {
      return can(name)
    },
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
