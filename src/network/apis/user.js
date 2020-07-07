/*
 * @Description: 用户相关api
 * @Author: miiky_yang
 * @Date: 2020-06-22 13:05:40
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-06 11:59:12
 */
import Axios from '@/network/axios'

class User {
  // 获取用户
  getUsers = (params) => Axios.get('/api/users', {
    params: params
  })
  // 提交用户
  postUser = (params) => Axios.post('/api/user', params)
  // 删除用户
  delUser = (params) => Axios.delete('/api/user', {
    data: params
  })
  // 修改
  patchUser = (params) => Axios.patch('/api/user', params)
}

export default User