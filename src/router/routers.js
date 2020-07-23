/*
 * @Description: 路由集合
 * @Author: miiky_yang
 * @Date: 2020-06-22 11:42:21
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-09 13:17:01
 */
// 业务路由
import IndexPage from '_v/pages/index-page.vue'
import NewsPage from '_v/pages/news/news-page.vue'
import HomePage from '_v/pages/home/home-page.vue'
import WorkPage from '_v/pages/work/work-page.vue'
import MinePage from '_v/pages/mine/mine-page.vue'
// 单页路由
import LoginPage from '_v/single-page/login/login-page.vue'
import PdfPreview from '_v/single-page/pdf/geo-preview-pdf.vue'

import WorkChildren from './module/work'

const servie_page = [{
  path: '/',
  name: 'Index',
  redirect: 'work',
  component: IndexPage,
  children: [{
      path: '/news',
      name: 'NewsPage',
      component: NewsPage,
      meta: {
        needTabbar: true,
        needTitle: true,
        title: '新闻'
      }
    }, {
      path: '/home',
      name: 'HomePage',
      component: HomePage,
      meta: {
        needTabbar: true,
        needTitle: true,
        title: '主页'
      }
    }, {
      path: '/work',
      name: 'WorkPage',
      component: WorkPage,
      meta: {
        needTabbar: true,
        needTitle: true,
        title: '办公'
      }
    }, {
      path: '/mine',
      name: 'MinePage',
      component: MinePage,
      meta: {
        needTabbar: true,
        needTitle: true,
        title: '我的'
      }
    },
    ...WorkChildren
  ]
}]

// 独立路由
const single_page = [{
  path: '/login',
  name: 'LoginPage',
  component: LoginPage,
  meta: {
    needTabbar: false,
    needTitle: false,
    title: '用户登陆'
  }
}, {
  path: '/pdf',
  name: 'PdfPreview',
  component: PdfPreview,
  meta: {
    needTabbar: false,
    needTitle: true,
    title: '预览PDF'
  }
}]
// 错误异常路由
const error_page = []

const routers = [...servie_page, ...single_page, ...error_page]

export default routers