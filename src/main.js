/*
 * @Description: 程序入口
 * @Author: miiky_yang
 * @Date: 2020-06-22 10:52:43
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-06 12:01:06
 */
import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"

Vue.config.productionTip = false

// 引入vant ui组件
import Vant from 'vant';
import 'vant/lib/index.less';
Vue.use(Vant);

// 引入网络请求相关
import Net from '@/network/index'
Vue.prototype.$net = new Net()

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    // 获取微信授权
  }
}).$mount("#app")