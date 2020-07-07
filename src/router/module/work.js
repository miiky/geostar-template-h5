/*
 * @Description: 文件描述
 * @Author: miiky_yang
 * @Date: 2020-07-07 11:28:28
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-07 15:58:24
 */
export default [{
  path: '/affair',
  name: 'AffairPage',
  component: () => import('_v/pages/work/affair/affair-page.vue'),
  meta: {
    needTabbar: false,
    needTitle: true,
    title: '综合事务'
  }
}, {
  path: '/affair-detail',
  name: 'AffairDetail',
  component: () => import('_v/pages/work/affair/affair-detail.vue'),
  meta: {
    needTabbar: false,
    needTitle: true,
    title: '综合事务'
  }
}]