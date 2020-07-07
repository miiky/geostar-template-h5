/*
 * @Description: 路由集合
 * @Author: miiky_yang
 * @Date: 2020-06-22 11:42:21
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-06 10:49:07
 */
// 业务路由
// import usercenter from './module/usercenter'

let other_page = []

// 独立路由
const single_page = [{
    path: "/",
    name: "Home",
    component: () => import("_v/pages/Home.vue")
  },
  {
    path: "/about",
    name: "About",
    component: () => import("_v/pages/About.vue")
  }
]
// 错误异常路由
let error_page = []

export default single_page