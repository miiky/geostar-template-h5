/*
 * @Description: 路由管理中心
 * @Author: miiky_yang
 * @Date: 2020-06-22 10:52:43
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-06-22 15:35:01
 */

import Vue from "vue"
import VueRouter from "vue-router"
import Routers from './routers'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: Routers
})


router.beforeEach((to, from, next) => {
  // TODO 根据业务场景做相关路由处理
  next()
})

router.afterEach(to => {
  // 页面跳转后执行
  window.scrollTo(0, 0)
})

export default router;