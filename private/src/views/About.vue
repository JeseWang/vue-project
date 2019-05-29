<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>{{$route.parmas}}</p>
    <router-link to="/about/test/123">加载首页</router-link>
    <p>
      about页面的Store: {{$store.state.count}}
      余额： {{$store.getters.money}}
      <button @click="editStore">About页面修改Store</button>
    </p>
    <router-view/>
  </div>
</template>
<script>
export default {
  data(){
    return {
      
    }
  },
  created(){
    console.log(this.$route)
  },
  methods: {
    editStore(){
      this.$store.commit('add')
    }
  }
}
</script>

