<template>
  <div>
    <ul>
      <li v-for="good in goods" :key="good.id">
        <span>{{good.text}}</span>
        <span>￥{{good.price}}</span>
        <button @click="addCart(good)">加购物车</button>
      </li>
    </ul>
    <my-cart :name="name"></my-cart>
  </div>
</template>

<script>
  import MyCart from '@/components/Cart.vue'
  export default {
    components: {
      MyCart
    },
    data(){
      return {
        name: '购物车页面',
        goods: []
      }
    },
    async created(){
      try{
        const res = await this.$http.get('/api/goods')
        console.log(res)
        this.goods = res.data.list
      }catch(error){
        console.log(error)
      }
    },
    methods: {
      addGood(i){
        const good = this.goods[i]
        this.$bus.$emit('addCart', good)
      },
      addCart(good){
        this.$bus.$emit('addCart', good)
      }
    }
  }
</script>

<style scoped>
</style>