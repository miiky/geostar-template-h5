/*
 * @Description: 状态管理中心
 * @Author: miiky_yang
 * @Date: 2020-06-22 10:52:43
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-16 13:58:08
 */
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)

// 引入业务store
import app from './module/app'
import work from './module/work'

const modules = {
  app,
  work
}

export default new Vuex.Store({
  modules: modules
})