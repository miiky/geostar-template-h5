/*
 * @Description: 状态管理中心
 * @Author: miiky_yang
 * @Date: 2020-06-22 10:52:43
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-07 13:58:22
 */
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)

// 引入业务store
import app from './module/app'

const modules = {
  app,
}

export default new Vuex.Store({
  modules: modules
})