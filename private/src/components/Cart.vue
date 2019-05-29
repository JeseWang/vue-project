<template>
  <div>
    <p>{{name}}</p>
    <!-- 购物车列表 -->
    <table border="1">
      <tr>
        <th>#</th>
        <th>课程名</th>
        <th>单价</th>
        <th>数量</th>
        <th>价格</th>
      </tr>
      <tr v-for="(c,i) in cart" :key="c.id" :class="{active:c.active}">
        <td>
          <input type="checkbox" v-model="c.active">
        </td>
        <td>{{c.text}}</td>
        <td>￥{{c.price}}</td>
        <td>
          <button @click="minus(i)">-</button>
          {{c.count}}
          <button @click="add(i)">+</button>
        </td>
        <td>￥{{c.price*c.count}}</td>
      </tr>
      <tr>
        <td></td>
        <td colspan="2">{{activeCount}}/{{count}}</td>
        <td colspan="2">￥{{total}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data(){
    return {
      cart: JSON.parse(localStorage.getItem('item')) || []
    }
  },
  created(){
    this.$bus.$on('addCart', good => {
      const ret = this.cart.find(r => r.id === good.id)
      if(ret){
        ret.count++
      }else{
        this.cart.push({
          ...good,
          count: 1,
          active: true
        })
      }
    })
  },
  watch: {
    cart: {
      handler(n){
        localStorage.setItem('cart', JSON.stringify(n))
      },
      deep: true
    }
  },
  computed: {
    activeCount(){
      return this.cart.filter(r => r.active).length
    },
    count(){
      return this.cart.length
    },
    total(){
      return this.cart.reduce((sum, item) => {
        if(item.active){
          sum += item.price * item.count
        }
        return sum
      }, 0)
    }
  },
  methods: {
    minus(i) {
      const count = this.cart[i].count
      if(count > 1){
        this.cart[i].count--
      }else{
        this.remove(i)
      }
    },
    add(i){
      this.cart[i].count++
    },
    remove(i){
      if(window.confirm('确定删除吗？')){
        this.cart.splice(i, 1)
      }
    }
  },
};
</script>

<style scoped>
.active{
  color: green;
}
table{
  margin: 0 auto;
}
</style>