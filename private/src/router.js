import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { auth: true },
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      meta: { auth: true },
      component: () => import('./views/Cart.vue')
    },
    {
      path: '/about',
      name: 'about',
      meta: { auth: true },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      children: [
        {
          path: 'test/:id',
          component: Home
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    if (store.state.token) {
      next()
    } else {
      next({
        path: '/login',
        query: { rediret: to.path }
      })
    }
  }else{
    next()
  }
  // if(to.path !== '/login'){
  //   if(store.state.isLogin){
  //     next()
  //   }else{
  //     next(`login?redirect=${to.path}`)
  //   }
  // }else{
  //   next()
  // }
  // next()
})

export default router
