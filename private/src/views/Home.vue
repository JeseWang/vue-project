<template>
  <div class="home">
    {{msg}}
  </div>
</template>
<script>
  export default {
    name: 'home',
    data () {
      return {
        msg: '这是主页'
      }
    }
  }
</script>