/*
 * @Description: 路由管理中心
 * @Author: miiky_yang
 * @Date: 2020-06-22 10:52:43
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-17 10:05:54
 */

import Vue from "vue"
import Store from '@/store'
import Tools from '@/utils/tools'
import VueRouter from "vue-router"
import Routers from './routers'
import {
  Toast
} from 'vant'
Vue.use(VueRouter)

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: Routers
})

const whiteList = ['LoginPage']

router.beforeEach((to, from, next) => {
  Toast.clear()
  //设置meta信息
  setMetaInfo(to)
  // TODO 根据业务场景做相关路由处理
  if (whiteList.includes(to.name)) {
    next()
  }
  if (Store.getters.token) {
    next()
  } else {
    next({
      name: 'LoginPage'
    })
  }

})

let setMetaInfo = (to) => {
  if (to.meta) {
    // 设置title信息
    document.title = to.meta.title || ''
    //判断是否为微信环境
    if (Tools.isWeixin()) {
      Store.commit('SET_NEED_HEADER', {
        needHeader: false
      })
    } else {
      Store.commit('SET_NEED_HEADER', {
        needHeader: to.meta.needHeader || true
      })
    }
    // 设置页头
    Store.commit('SET_TITLE_TEXT', {
      currentTitleText: to.meta.title
    })
    // 设置是否需要底部tabbar
    Store.commit('SET_NEED_TABBAR', {
      needTabbar: to.meta.needTabbar
    })
  }
}

router.afterEach(to => {
  // 页面跳转后执行
  window.scrollTo(0, 0)
})

export default router;