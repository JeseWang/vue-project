<template>
  <div>
    <button v-if="!$store.state.isLogin" @click="login">登录</button>
    <p v-else>个人信息管理</p>
  </div>
</template>

<script>
  export default {
    methods: {
      async login() {
        await this.$store.dispatch('submitLogin')
        if(this.$store.state.isLogin){
          alert('登录成功')
          const {redirect} = this.$route.query
          if(redirect){
            this.$router.push(redirect)
          }else{
            this.$router.push('/')
          }
        }else{
          alert('登录失败')
        }
      }
    },
  }
</script>

<style scoped>

</style>