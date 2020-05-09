import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入 全局样式
import './styles/index.less'

// 导入 Vant 组件库
import Vant from 'vant'
// 导入 Vant 组件库 样式
import 'vant/lib/index.css'

// 用于设置 rem 基准值
import 'amfe-flexible'

// 全局注册
Vue.use(Vant)

Vue.config.productionTip = false

// 创建 Vue根实例
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
