/*
 * @Description: 网络请求管理中心
 * @Author: miiky_yang
 * @Date: 2020-06-22 13:03:38
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-22 12:26:07
 */
import App from './apis/app'
import Business from './apis/business'
import Workflow from './apis/workflow'
import File from './apis/file'
import Coframe from './apis/coframe'
import Attention from './apis/attention'

class Net {
  app = new App()
  business = new Business()
  workflow = new Workflow()
  file = new File()
  coframe = new Coframe()
  attention = new Attention()
}

const net = new Net()
export default net