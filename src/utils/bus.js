/*
 * @Description: 文件描述
 * @Author: miiky_yang
 * @Date: 2019-05-24 11:13:58
 * @LastEditors: miiky_yang
 * @LastEditTime: 2019-10-09 11:12:43
 */
import Vue from 'vue'
const bus = new Vue({})
let _on = bus.$on
let _emit = bus.$emit
bus.$on = (name, fn) => {
  if (bus._events[name]) {
    bus.$off(name)
  }
  _on.call(bus, name, fn)
}
bus.$emit = (name, params) => {
  if (!params) {
    console.warn('The paramter is null')
  }
  _emit.call(bus, name, params)
}
export default bus
