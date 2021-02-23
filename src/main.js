import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

// 全局组件
import toast from 'components/common/toast/index'

Vue.config.productionTip = false

// 定义事件总线
Vue.prototype.$bus = new Vue()

// 全局组件需要use
Vue.use(toast)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
