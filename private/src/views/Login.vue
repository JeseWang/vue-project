<template>
  <div>
    <p v-if="!$store.state.isLogin">
      <button @click="login">模拟登录事件</button>
    </p>
    <p v-else>个人信息管理</p>

    <cube-form :model="model" :schema="schema" @submit="handleLogin" @validate="handleValidate"></cube-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        username: '',
        password: ''
      },
      schema: {
        fields: [
          {
            type: 'input',
            modelKey: 'username',
            label: '用户名',
            props: {
              placeholder: '请输入用户名'
            },
            rules: {
              required: true
            },
            trigger: 'blur',
            messages: {
              required: '用户名为必填项'
            }
          },
          {
            type: 'input',
            modelKey: 'password',
            label: '密码',
            props: {
              placeholder: '请输入密码',
              type: 'password',
              eye: { open: false }
            },
            rules: {
              required: true
            },
            trigger: 'blur',
            message: {
              required: '密码为必填项'
            }
          },
          {
            type: 'submit',
            label: '模拟用户名密码登录'
          }
        ]
      }
    }
  },
  methods: {
    async login() {
      await this.$store.dispatch('submitLogin')
      if (this.$store.state.isLogin) {
        alert('登录成功')
        const { redirect } = this.$route.query
        if (redirect) {
          this.$router.push(redirect)
        } else {
          this.$router.push('/')
        }
      } else {
        alert('登录失败')
      }
    },

    async handleLogin(e) {
      e.preventDefault()
      const res = await this.$http.get('/api/login', {
        params: {
          username: this.model.username,
          password: this.model.password
        }
      })
      console.log(res)

      const { code, token, message } = res.data
      if (code == 0) {
        localStorage.setItem('token', token)
        this.$store.commit('setToken', token)

        const redirect = this.$route.query.redirect || '/'
        console.log(redirect)
        console.log(this.$route.query)
        this.$router.push(redirect)
      } else {
        const toast = this.$createToast({
          time: 2000,
          txt: message || '登录失败',
          type: 'error'
        })
        toast.show()
      }
    },
    handleValidate(ret){
      console.log('校验:' + ret)
    }
  },
}
</script>

<style scoped>
</style>