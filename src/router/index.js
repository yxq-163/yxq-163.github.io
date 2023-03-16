import Vue from 'vue'
import VueRouter from 'vue-router'

//1 创建路由组件
import Home from '../views/MyHome.vue'
import User from '../views/MyUser.vue'
import Main from '../views/MyMain.vue'
import Mall from '../views/MyMall.vue'
import PageOne from '../views/PageOne.vue'
import PageTwo from '../views/PageTwo.vue'
import Other from '../views/MyOther.vue'
import Login from '../views/MyLogin.vue'
import Drag from '../views/MyDrag.vue'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

//2 路由与组件映射

const routes = [
    { 
      path: '/',
      component: Main,
      redirect: '/home',
      name: 'main',
      meta: {label: '首页', 
             path: '/',
             name: 'main',
            },
      children: [
        { path: 'user', component: User, name: 'user',meta: {label: '用户管理',path: '/user',name: 'user'}},
        { path: 'home', component: Home, name: 'home', meta: {label: '首页',path: '/',name: 'home'}},
        { path: 'mall', component: Mall, name: 'mall',meta: {label: '商城管理',path: '/mall',name: 'mall'}},
        { path: 'other', 
          component: Other, 
          name: 'other',
          meta: {label: '其他',path: '/other',name: 'other'},
          children: [ 
            { path: 'page1', component: PageOne, name: 'page1',meta: {label: '其他1',path: '/page1',name: 'page1'}},
             { path: 'page2', component: PageTwo, name: 'page2',meta: {label: '其他2',path: '/page2',name: 'page2'}},
        ]
        },
      ]       
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/drag',
      name: 'drag',
      component: Drag
    },

]
//3 

const router = new VueRouter(
    {
        mode: 'history',
        routes
    })

export default router






