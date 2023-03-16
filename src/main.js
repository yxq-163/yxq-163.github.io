import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import './api/mock'
import Cookie from 'js-cookie'

Vue.config.productionTip = false
Vue.use(ElementUI)

router.beforeEach((to,from,next) => {
  const token = Cookie.get('token')

  if (token && to.name === 'login')
  {
    next({name: 'home'})
  }
  else if (!token && to.name !== 'login')
  {
    next({name: 'login'})
  }
  else
  {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
