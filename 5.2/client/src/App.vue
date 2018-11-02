<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <a class="navbar-brand" href="#">Start Bootstrap</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item" v-show="isAuthenticated">
              <router-link to="/portfolio" class="nav-link">Portfolio</router-link>
            </li>
            <li class="nav-item" v-show="isAdmin">
              <router-link to="/admin/currencies" class="nav-link">Manage Currencies</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/login" class="nav-link" v-if="!isAuthenticated">Login</router-link>
              <a href="#" class="nav-link" @click.prevent="logout" v-else>Logout</a>
            </li>
            <li class="nav-item">
              <router-link to="/register" class="nav-link" v-show="!isAuthenticated">Register</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div id="page-content-container" class="container">
      <router-view/>
    </div>
  </div>
</template>
<script>
import {EventBus} from './event-bus';
export default {
  data() {
    return {
      isAdmin: false,
      isAuthenticated: false
    };
  },
  created() {
    EventBus.$on('login', this.login);

    if (localStorage.getItem('token')) {
      this.isAuthenticated = true;
    }

    let user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      this.isAdmin = user.isAdmin;
    }
  },
  methods: {
    login(data) {
      // token
      // user info
      this.error = '';

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      this.isAuthenticated = true;
      this.isAdmin = data.user.isAdmin;

      this.$router.push('/portfolio');
    },
    logout(data) {
      // token
      // user info
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      this.isAuthenticated = false;
      this.isAdmin = false;

      this.$router.push('/');
    }
  }

}
</script>

<style>
#page-content-container {
  margin-top: 60px;
}
</style>
