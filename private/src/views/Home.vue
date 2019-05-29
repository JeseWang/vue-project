<template>
  <div class="home">
    <p>
      Home页面的Store: {{$store.state.count}}
      余额： {{$store.getters.money}}
      <button @click="editStore">Home页面修改Store</button>
    </p>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  methods: {
    editStore(){
      this.$store.commit('sub')
    }
  },
}
</script>
