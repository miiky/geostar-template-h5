/*
 * @Description: 程序入口
 * @Author: miiky_yang
 * @Date: 2020-06-22 10:52:43
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-22 17:09:17
 */
import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import Tools from './utils/tools'

Vue.config.productionTip = false

import '@/assets/style/reset.less'
// 引入vant ui组件
import Vant from 'vant'
import 'vant/lib/index.less'
import 'vant/lib/icon/local.css'
Vue.use(Vant);

// 全局注册
import {
  Toast,
  Notify,
  Dialog
} from 'vant'
Toast.allowMultiple()
Vue.use(Toast)
Vue.use(Notify)
Vue.use(Dialog)

// 引入网络请求相关
import net from '@/network/index'
import tools from '@/utils/tools'
import bus from '@/utils/bus'
Vue.prototype.$net = net
Vue.prototype.$tools = tools
Vue.prototype.$bus = bus

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit('SET_IS_WX', {
      isWx: Tools.isWeixin()
    })
    // 获取微信授权
  }
}).$mount("#app")