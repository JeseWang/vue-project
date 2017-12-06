<template>
  <div class="menu">
    <mu-appbar title="My World" :class="{bar_left : open}">
      <mu-icon-button icon="menu" slot="left" @click="toggle()" />
    </mu-appbar>
    <mu-drawer :open="open" :docked="docked" @close="toggle()">
      <mu-appbar>
        <mu-text-field icon="search" class="appbar-search-field" slot="left" hintText="请输入搜索内容" />
      </mu-appbar>
      <mu-list>
        <mu-list-item @click="toggle()">
          <mu-icon slot="left" value="grade" />
          <router-link to="/home">主页</router-link>
        </mu-list-item>
        <mu-divider/>
        <mu-list-item class="mu-class-list" title="Demo" toggleNested :open="false">
          <mu-icon slot="left" value="send" />
          <mu-list-item class="mu-class-list-item" slot="nested" @click="toggle()" v-for="(item, index) in proList" :key="index">
            <router-link :to="item.href">{{item.name}}</router-link>
          </mu-list-item>
        </mu-list-item>
        <mu-divider/>
        <mu-list-item @click="toggle()">
          <mu-icon slot="left" value="info" />
          <router-link to="/about">关于我</router-link>
        </mu-list-item>
        <mu-list-item v-if="docked" @click.native="open = false" title="Close" />
      </mu-list>
    </mu-drawer>
  </div>
</template>
<script>
  export default {
    name: 'menu',
    data () {
      return {
        open: false,
        docked: true,
        proList: [
          {
            href: '/todo-list',
            name: 'Todo List'
          }
        ]
      }
    },
    methods: {
      toggle () {
        this.open = !this.open
        this.docked = false
      }
    }
  }
</script>
<style lang="less">
  .bar_left {
    margin-left: 256px;
    transition: 0.6s;
  }
  
  .mu-item-content,
  .mu-item-content a {
    display: inline-block;
    font-size: 16px;
    color: #009688;
  }
  
  .mu-class-list-item .mu-item-content a {
    padding-left: 35px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.875);
  }
  
  .appbar-search-field {
    color: #FFF;
    margin-bottom: 0;
    width: 100%;
    &.focus-state {
      color: #FFF;
    }
    .mu-text-field-hint {
      color: fade(#FFF, 54%);
    }
    .mu-text-field-input {
      color: #FFF;
    }
    .mu-text-field-focus-line {
      background-color: #FFF;
    }
  }
</style>