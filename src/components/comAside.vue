<template>
  <el-menu 
  default-active="2" 
  class="el-menu-vertical-demo" 
  @open="handleOpen" 
  @close="handleClose" 
  :collapse="isCollapse"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b"
  >
    <h3>{{ isCollapse ? '后台': '通用后台管理系统' }}</h3>
    <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
        <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{item.label}}</span>
        </template>
        <el-menu-item-group v-for="subItem in item.children" :key="subItem.name">
         <el-menu-item @click="clickMenu(subItem)" :index="subItem.name">{{subItem.label}}</el-menu-item>
        </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>

import Cookie from 'js-cookie'

  export default {
    data() {
      return {

      };
    },
    methods: {
      handleOpen(key, keyPath) {
        //console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
      clickMenu(item) {
        //console.log(item);
        this.$router.push(item.path);
        this.$store.commit('addMenu',item);
      },
    },
    computed: {
        noChildren() {
            return this.menu.filter(item=> !item.children)
        },
        hasChildren() {
            return this.menu.filter(item=> item.children)
        },
        isCollapse() {
            return this.$store.state.tab.isCollaling
        },
        menu() {
            return JSON.parse(Cookie.get('menu') ) || this.$store.state.tab.menu
        }
    }
  }
</script>

<style lang="less" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .el-menu {
    height: 100vh;
    transition: all 10ms;
    h3 {
      color: #fff;
      font-size: 16px;
      text-align: center;
      line-height: 48px;
      font-weight: 400;
      
    }
  }
</style>