/*
 * @Description: 状态管理中心
 * @Author: miiky_yang
 * @Date: 2020-06-22 10:52:43
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-06-22 12:59:00
 */
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)

// 引入业务store
import user from './module/user'

let modules = {
  user
}

export default new Vuex.Store({
  modules: modules
})