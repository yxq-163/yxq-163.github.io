<template>
    <div class="header-container">
        <div class="l-content">
            <el-button style="margin-right: 20px" @click="handClick" icon="el-icon-menu" size="mini"></el-button>
            <!-- <span class="text">首页</span> -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item
                    v-for="(item,index) in breadList"
                    :key="index"
                    :to="{ path: item.meta.path }"
                >{{item.meta.label}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
                <img class="userpic" src="../assets/user.jpeg" alt="">
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  import Cookie from 'js-cookie'

  export default {
    data() {
        return { 
            breadList: []
        }
    },
    props: [],
    name: "",
    components: {},
    methods: {
            handClick() {
                this.$store.commit('collapseMenu');
        },
        getRouteBreadcrumb(){
            let routes = this.$route.matched
            if (routes.length >1 && routes[routes.length-1].meta.name === 'home')
                routes.splice(routes.length-1,1) 
            return routes
        },
        handleCommand(command) {
            if (command === 'logout'){
                Cookie.remove('token')
                Cookie.remove('menu')
                this.$router.push('login')              
            }
        }
    },
    computed: {
        // ...mapState({
        //     breadList: state => state.tab.menuList,
        // })
    },
    watch: {
        $route(to,from) {
             this.breadList = this.getRouteBreadcrumb()
             
        }
    },
    created() {
        //this.breadList = this.$route.matched
    },
    mounted(){
        // console.log(this.breadList,'breadList')
    },
  }
  </script>
  
  <style lang="less" scoped>
    .header-container {
        padding: 0 29px;
        background-color: #333;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .text {
            color: #fff;
            font-size: 14px;
            margin-left: 14px;
        }
        .userpic {
            height: 40px;
            width: 40px;
            border-radius: 50%;
            
        }
    }
    .l-content {
        display: flex;
        align-items: center;
        /deep/.el-breadcrumb__item {
            .el-breadcrumb__inner{
                font-weight: normal;
                &.is-link {
                    color: #666
                }
            }
            &:last-child {
                .el-breadcrumb__inner{
                    color: #fff
                }
            }
        }
    }
  </style>