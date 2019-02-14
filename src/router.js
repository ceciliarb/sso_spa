import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store' // your vuex store 

import ExampleComponent from './components/ExampleComponent'
import InfoUsuario from './components/InfoUsuario'
import Unauthorized from './components/Unauthorized'
import Error404 from './components/Error404'

Vue.use(VueRouter)

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next()
        return
    }
    next('/')
}

const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next()
        return
    }
    next('/unauthorized')
}

const routes = [
    {
        path: '/home',
        name: 'home',
        component: ExampleComponent,
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/info',
        name: 'info',
        component: InfoUsuario,
        beforeEnter: ifAuthenticated,
    },
    {
        path: '*',
        component: Error404
    }, // Not found
    {
        path: '/unauthorized',
        name: 'Unauthorized',
        component: Unauthorized
    }, // Unauthorized
]

const router = new VueRouter({
    mode: 'history',
    scrollBehavior: () => ({
        y: 0
    }),
    routes,
})

export default router;
