/*
 * @Description: 文件描述
 * @Author: miiky_yang
 * @Date: 2019-05-24 11:13:58
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-16 16:12:03
 */
import Vue from 'vue'
const bus = new Vue({})
let eventPages = []
let _on = bus.$on
let _emit = bus.$emit
bus.$on = (name, eventPage, fn) => {
  // 一个控件内只注册一个监听时间
  if (eventPages.includes(eventPage)) {
    bus.$off(name)
  }
  // 一个监听时间只允许注册一次
  // if (bus._events[name]) {
  //   bus.$off(name)
  // }
  _on.call(bus, name, fn)
}
bus.$emit = (name, params) => {
  if (!params) {
    console.warn('The paramter is null')
  }
  _emit.call(bus, name, params)
}
export default bus