<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <nav class="navbar navbar-expand-md navbar-light navbar-laravel" v-if="user != null">
        <div class="container">
            <ul class="navbar-nav">
                <router-link :to="{ name: 'home' }" class="nav-link">Home</router-link>
                <router-link :to="{ name: 'info' }" class="nav-link">Info</router-link>
                <a href="/logout" class="nav-link">Logout</a>
            </ul>
        </div>
    </nav>
    <h1 v-else>Logando...</h1>
    <main>
        <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Auth from './components/Auth.vue'

export default {
  name: 'app',
  components: {
  },
  extends: Auth,
  methods: {
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
