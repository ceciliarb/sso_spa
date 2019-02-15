import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { keycloak, axios_keycloak } from './axios_keycloak'
import store from './store'
import permissoes from './permissoes.json'

Vue.config.productionTip = false

Vue.prototype.$axios = axios_keycloak
Vue.prototype.$keycloak = keycloak

Vue.component('button-custom', require('./components/ButtonCustom.vue').default)

Vue.mixin({
  created: function () {
    console.log('hello world')
  },

  methods: {
    can: function (name) {
      let roles = store.getters.user_roles
      if(!roles) return false
      //iterando no array de roles do usuario logado
      for(var i = 0; i < roles.length; i++) {
        //se no array de permissoes existe o recurso 'name' para o role iterado
        if(permissoes[roles[i]].includes(name)) {
          return true
        }
      }
      return false
    },
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
