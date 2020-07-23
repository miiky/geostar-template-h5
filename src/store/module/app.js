/*
 * @Description: 文件描述
 * @Author: miiky_yang
 * @Date: 2020-07-07 10:10:35
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-17 11:43:27
 */
import Cookies from 'js-cookie'
import net from '@/network'

export default {
  state: {
    token: null,
    userId: null,
    username: null,

    currentUser: null,

    isWx: false,
    currentTitleText: '主页',
    needTabbar: true,
    needHeader: true,
  },
  getters: {
    token(state) {
      return state.token || Cookies.get('ACCESS_TOKEN')
    },
    userId(state) {
      return state.userId
    },
    username(state) {
      return state.username
    },
    currentUser(state) {
      return state.currentUser
    },
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
    },

  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload.token
      //同步存储到cookie中设置token过期时间
      let expiresDate = new Date(new Date().getTime() + 7200 * 1000)
      Cookies.set('ACCESS_TOKEN', payload.token, {
        expires: expiresDate
      })
    },
    SET_USERID(state, payload) {
      state.userId = payload.userId
    },
    SET_USERNAME(state, payload) {
      state.username = payload.username
    },
    SET_CURRENT_USER(state, payload) {
      state.currentUser = payload
    },
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
  actions: {
    setLoginInfo({
      commit
    }, payload) {
      commit('SET_TOKEN', {
        token: payload.token
      })
      commit('SET_USERID', {
        userId: payload.userId
      })
      commit('SET_USERNAME', {
        username: payload.username
      })
      net.app.currentUser().then(res => {
        commit('SET_CURRENT_USER', res)
      })

    }
  },
}