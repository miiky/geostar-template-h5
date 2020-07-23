/*
 * @Description: 文件描述
 * @Author: miiky_yang
 * @Date: 2020-07-10 15:03:51
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-22 10:27:19
 */
import Axios from '@/network/axios'

class Workflow {

  // 根据流程实例ID获取工作项信息,如无当前用户正在运行的工作项,取最后一个完成的工作项 /api/workflow-service/workitemmanager/getCurrentWorkItem
  getCurrentWorkItem = (params) => Axios.get('/api/workflow-service/workitemmanager/getCurrentWorkItem', {
    params: params
  })

  // 检测当前工作项是否完成 /api/workflow-service/workitemmanager/checkWorkItem
  checkWorkItem = (params) => Axios.get('/api/workflow-service/workitemmanager/checkWorkItem', {
    params: params
  })

  // 终止流程实例 /api/workflow-service/processinstmanager/terminateProcessInstance
  terminateProcessInstance = (params) => Axios.get('/api/workflow-service/processinstmanager/terminateProcessInstance', {
    params: params
  })

  // 获取流程所有可能到达的下一环节的定义信息 /api/workflow-service/processdefinemanager/queryNextActivityDefines
  queryNextActivityDefines = (params) => Axios.get('/api/workflow-service/processdefinemanager/queryNextActivityDefines', {
    params: params
  })

  // 获取流程下一环节的定义信息 /api/workflow-service/processdefinemanager/queryNextActivityDefine
  queryNextActivityDefine = (params) => Axios.get('/api/workflow-service/processdefinemanager/queryNextActivityDefine', {
    params: params
  })

  // 获取流程下一环节的参与者信息 /api/workflow-service/processinstmanager/queryNextActivityParticipants
  queryNextActivityParticipants = (params) => Axios.get('/api/workflow-service/processinstmanager/queryNextActivityParticipants', {
    params: params
  })

  // 获取流程当前环节上一环节的定义信息 /api/workflow-service/processdefinemanager/queryPreActivityDefine
  queryPreActivityDefine = (params) => Axios.get('/api/workflow-service/processdefinemanager/queryPreActivityDefine', {
    params: params
  })

  // 获取流程上一环节的参与者信息 /api/workflow-service/processinstmanager/queryPreActivityParticipants
  queryPreActivityParticipants = (params) => Axios.get('/api/workflow-service/processinstmanager/queryPreActivityParticipants', {
    params: params
  })

  // 流程提交 /api/workflow-service/workflowmanage/commonSave
  commonSave = (params) => Axios.post('/api/workflow-service/workflowmanage/commonSave', {
    params: params
  })

  // 回退 /api/workflow-service/workflowmanage/backActivity
  backActivity = (params) => Axios.post('/api/workflow-service/workflowmanage/backActivity', {
    params: params
  })
}

export default Workflow