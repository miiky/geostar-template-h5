/*
 * @Description: 文件描述
 * @Author: miiky_yang
 * @Date: 2020-07-22 12:17:11
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-22 14:21:34
 */
import Axios from '@/network/axios'

class Attention {

  // 查询所有的关注标签明细信息 /api/business-service/attentions/findBqmxAllByBqlx
  findBqmxAllByBqlx = (params) => Axios.get('/api/business-service/attentions/findBqmxAllByBqlx', {
    params: params
  })

  // 添加用户案件关注标签 /api/business-service/attentions/addUserAttention
  addUserAttention = (params) => Axios.post('/api/business-service/attentions/addUserAttention', params)

  // 取消用户案件关注标签 /api/business-service/attentions/updateAttenState
  updateAttenState = (params) => Axios.post('/api/business-service/attentions/updateAttenState', params)

  // 保存更新标签明细信息 /api/business-service/attentions/saveBqmx
  saveBqmx = (params) => Axios.post('/api/business-service/attentions/saveBqmx', params)

  // 获取用户案件关注标签 /api/business-service/attentions/getOaGzAtten
  getOaGzAtten = (params) => Axios.get('/api/business-service/attentions/getOaGzAtten', {
    params: params
  })
}

export default Attention