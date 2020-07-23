/*
 * @Description: 用户相关api
 * @Author: miiky_yang
 * @Date: 2020-06-22 13:05:40
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-17 10:09:54
 */
import Axios from '@/network/axios'

const USER_URL = 'http://172.17.0.211:8080'

class App {
  // 登陆
  login = (params) => Axios.post('/api/users/login', params)

  // 获取用户
  currentUser = () => Axios.get('/api/users/get/current-user')

}

export default App