import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// Element-Ui
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

// 加载全局样式
import './styles/index.scss'

// use element-ui
Vue.use(ElementUI)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
