import axios from 'axios';
import store from './store'
import router from './router'


const keycloak = Keycloak();
keycloak.init({ onLoad: 'login-required' }).success(function() {
    if(window.location.pathname == '/logout') {
        store.dispatch('LOGOUT_REQUEST').then( r => { keycloak.logout({ 'redirectUri': 'http://10.6.1.84:5555' }) })
    }
    store.dispatch('AUTH_REQUEST', keycloak.token)
    router.push('/home')
    
}).error((error) => {
    console.log(error);
});



const axios_keycloak = axios.create({ headers: { 'crossDomain': true }});

// insere o bearer token
axios_keycloak.interceptors.request.use(function (config) {
    let token = sessionStorage.getItem('token')
    if(token) {
        config.headers['Authorization'] = 'Bearer ' + token
    }
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    return config

  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

axios_keycloak.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // token expired
        if (error.response.status == 401) {
            window.location.href = '/'
        } else if (error.response.status == 403) {
            window.location.href = '/unauthorized'
        }
        return Promise.reject(error)
    }
)

export { keycloak, axios_keycloak };
