import axios from 'axios';
import store from './store'

const axios_keycloak = axios.create({ headers: { 'crossDomain': true }});

const keycloak = Keycloak();
keycloak.init({ onLoad: 'login-required' }).success(function() {
    if(window.location.pathname != '/logout') {
        sessionStorage.setItem('token', keycloak.token)
        axios_keycloak.get('http://10.6.1.84:7777/api/user').then((response) => { store.commit('setUser', response.data) })
        console.log(keycloak);

    } else {
        sessionStorage.removeItem('token')
        keycloak.logout();
    }

}).error((error) => {
    console.log(error);
});



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
