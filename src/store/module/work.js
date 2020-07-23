/*
 * @Description: 文件描述
 * @Author: miiky_yang
 * @Date: 2020-07-07 10:10:35
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-22 14:32:42
 */
import net from '@/network'
import {
  Toast,
  Notify
} from 'vant';

export default {
  state: {
    context: null,
    isFollow: false,
    workItemDone: false,
    submitStatus: [],

    validPromise: [],
    submitPromise: [],
    submitDataPromise: []
  },
  getters: {
    context(state) {
      return state.context
    },
    workItemDone(state) {
      return state.workItemDone
    },
    submitStatus(state) {
      let status = true
      state.submitStatus.forEach(item => {
        status = status && item
      })
      return status
    },
    validPromise(state) {
      // let valids = []
      // state.submitPromise.forEach(item => {
      //   valids.push(item.call())
      // })
      return state.validPromise
    },
    submitPromise(state) {
      return state.submitPromise
    },
    submitDataPromise(state) {
      return state.submitDataPromise
    }
  },
  mutations: {
    SET_CONTEXT(state, payload) {
      state.context = payload
    },
    SET_WORK_ITEM_DONE(state, payload) {
      state.workItemDone = payload
    },
    RESET_SUBMIT_STATUS(state) {
      state.submitStatus = []
    },
    SET_BEFORE_SUBMIT_STATUS(state, payload) {
      console.log('SET_BEFORE_SUBMIT_STATUS=>', payload)
      state.submitStatus.push(payload)
    },
    SET_PROMISE(state, payload) {
      state.validPromise = payload.validPromise
      state.submitPromise = payload.submitPromise
      state.submitDataPromise = payload.submitDataPromise
    },
    SET_FOLLOW_STATE(state, payload) {
      if (state.context) {
        state.context.isFollow = payload
      }
    }
  },
  actions: {
    async checkWorkItem({
      commit
    }, payload) {
      Toast.loading({
        message: '正在验证工作项状态...',
        forbidClick: true,
        duration: 0
      })
      let params = {
        workItemID: payload.workItemID
      }
      await net.workflow.checkWorkItem(params).then(res => {
        if (res == false) {
          Notify({
            type: 'warning',
            message: '该任务已被其他人处理'
          })
        }
        commit('SET_WORK_ITEM_DONE', res)
        Toast.clear()
      })
    },
    changeFollowState({
      commit
    }, payload) {
      commit('SET_FOLLOW_STATE', payload)
    }
  },
}