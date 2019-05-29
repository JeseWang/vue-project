import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 1,
    isLogin: false
  },
  mutations: {//同步操作
    add(state){
      state.count++
    },
    sub(state){
      state.count--
    },
    login(state){
      state.isLogin = true
    },
    logout(state){
      state.isLogin = false
    }
  },
  getters: {//计算属性
    money: state => {
      return state.count + '元'
    }
  },
  actions: {//异步操作
    submitLogin({commit}){
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('login')
          resolve(true)
        },1000)
      })
    },
    submitLogout({commit}){
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('logout')
          resolve(false)
        },1000)
      })
    }
  }
})
