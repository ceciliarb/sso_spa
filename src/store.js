import Vue from 'vue'
import Vuex from 'vuex'
import { keycloak, axios_keycloak } from './axios_keycloak'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: {},
        token: sessionStorage.getItem('token') || '',
        status: '',
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        AUTH_REQUEST: (state) => {
            state.status = 'loading'
        },
        AUTH_SUCCESS: (state, token=null) => {
            state.status = 'success'
            state.token = token || state.token
            if(token) sessionStorage.setItem('token', token)
        },
        AUTH_ERROR: (state) => {
            state.status = 'error'
        },
        AUTH_LOGOUT: (state) => {
            sessionStorage.removeItem('token') // clear your user's token from localstorage
            state.status = 'logged_out'
            state.user   = null
        },
    },
    actions: {
        AUTH_REQUEST: ({ commit, dispatch }, token) => {
            commit('AUTH_REQUEST')
            return new Promise((resolve, reject) => { // The Promise used for router redirect in login
                commit('AUTH_SUCCESS', token)
                dispatch('USER_REQUEST')
                .then(resp => { resolve(resp) })
                .catch(err => { reject(err) })
            })
        },
        USER_REQUEST: ({ commit, dispatch }) => {
            commit('AUTH_REQUEST')
            return new Promise((resolve, reject) => { 
                axios_keycloak.get('http://10.6.1.84:7777/api/user')
                    .then(resp => {
                        commit('AUTH_SUCCESS')
                        commit('setUser', resp.data)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('AUTH_ERROR')
                        reject(err)
                    })
            })
        },
        LOGOUT_REQUEST: ({commit, dispatch}) => {
            commit('AUTH_REQUEST')
            return new Promise((resolve, reject) => {
              commit('AUTH_LOGOUT')
              resolve()
            })
        },
    },
    getters: {
        user: state => {
            return state.user
        },
        user_roles: state => {
            return state.user.roles
        },
        isAuthenticated: state => !!state.token,
        authStatus: state => state.status,
    }
})

export default store;