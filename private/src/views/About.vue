<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>{{$route.parmas}}</p>
    <p>
      about页面的Store: {{$store.state.count}}
      余额： {{$store.getters.money}}
      <button @click="editStore">About页面修改Store</button>
    </p>
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

