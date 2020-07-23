/*
 * @Description: 文件描述
 * @Author: miiky_yang
 * @Date: 2020-07-10 15:03:51
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-20 10:34:38
 */
import Axios from '@/network/axios'

class Business {

  // 获取当前用户移动端相关的办件信息 /api/business-service/mobile/getWorkCenterCaseItem
  getWorkCenterCaseItem = (params) => Axios.get('/api/business-service/mobile/getWorkCenterCaseItem', {
    params: params
  })

  // 根据编码获取对应的列表信息 /api/business-service/mobile/getCaseList
  getCaseList = (params) => Axios.get('/api/business-service/mobile/getCaseList', {
    params: params
  })

  //根据业务相关参数获取该业务所有的移动端(手机)配置信息 /api/business-service/mobile/getFormDataForSmallMobile
  getFormDataForSmallMobile = (params) => Axios.get('/api/business-service/mobile/getFormDataForSmallMobile', {
    params: params
  })

  //查询意见内容 /api/business-service/biz/queryYjnr
  queryYjnr = (params) => Axios.get('/api/business-service/biz/queryYjnr', {
    params: params
  })

  // 保存或修改意见内容 /api/business-service/biz/saveOrUpdateYjnr
  saveOrUpdateYjnr = (params) => Axios.post('/api/business-service/biz/saveOrUpdateYjnr', params)

  // 添加流程的参与者到即时通讯的业务群组 /api/business-service/biz/addBizChatMember
  addBizChatMember = (params) => Axios.post('/api/business-service/biz/addBizChatMember', params)
}

export default Business