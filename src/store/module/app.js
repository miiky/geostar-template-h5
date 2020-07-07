/*
 * @Description: 文件描述
 * @Author: miiky_yang
 * @Date: 2020-07-07 10:10:35
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-07 14:26:45
 */
export default {
  state: {
    isWx: false,
    currentTitleText: '主页',
    needTabbar: true,
    needHeader: true
  },
  getters: {
    isWx(state) {
      return state.isWx
    },
    currentTitleText(state) {
      return state.currentTitleText
    },
    needTabbar(state) {
      return state.needTabbar
    },
    needHeader(state) {
      return state.needHeader
    }
  },
  mutations: {
    SET_IS_WX(state, payload) {
      state.isWx = payload.isWx
    },
    SET_TITLE_TEXT(state, payload) {
      state.currentTitleText = payload.currentTitleText
    },
    SET_NEED_TABBAR(state, payload) {
      state.needTabbar = payload.needTabbar
    },
    SET_NEED_HEADER(state, payload) {
      state.needHeader = payload.needHeader
    }
  },
  actions: {},
}