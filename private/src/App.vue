<template>
  <div id="app">
    <MenuComp />
    <div class="maincontent">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import MenuComp from '@/components/Menu.vue'
  export default {
    name: 'app',
    components: {
      MenuComp
    }
  }
</script>

<style lang="less">
.maincontent{
  overflow: hidden;
  height: 1000px;
  border: 1px solid red;
}
</style>
