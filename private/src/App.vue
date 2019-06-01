<template>
  <div id="app">
    <p v-if="$store.state.isLogin">
      模拟已登录<button @click="logout">模拟登录的退出</button>
    </p>
    <p v-if="isLogin2">
      <button @click="logout2" >模拟token的退出</button>
    </p>
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/cart">购物车</router-link>|
      <router-link to="/about">About</router-link>|
      <router-link to="/login">登录</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  methods: {
    async logout() {
      await this.$store.dispatch("submitLogout");
    },
    logout2(){
      this.$http.get('/api/logout')
    }
  },
  computed: {
    ...mapGetters(['isLogin2'])
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
