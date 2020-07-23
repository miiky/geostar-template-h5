<!--
 * @Description: 文件描述
 * @Author: miiky_yang
 * @Date: 2020-07-16 11:57:06
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-22 12:27:12
--> 
<template>
  <div>
    <div @click="_handleSubmit">提交</div>
    <affair-detail-submit-popup ref="AffairDetailSubmitPopup"></affair-detail-submit-popup>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import AffairDetailSubmitPopup from '../popups/affair-detail-submit-popup'
import _ from 'lodash'

export default {
  name: 'button-submit',
  components: {
    AffairDetailSubmitPopup
  },
  computed: {
    ...mapGetters(['currentUser', 'context', 'workItemDone', 'validPromise', 'submitPromise', 'submitDataPromise'])
  },
  methods: {
    ...mapActions(['checkWorkItem']),
    async _handleSubmit () {
      // 1、检测当前任务是否已经完成
      await this.checkWorkItem({ workItemID: this.context.workItemID })
      if (!this.workItemDone) {
        return
      }
      // 2、执行提交之前的方法，判断是否需要继续执行
      let validPromiseCall = []
      this.validPromise.forEach(item => {
        validPromiseCall.push(item())
      })
      let validPromiseRes = await Promise.all(validPromiseCall)
      if (!_.every(validPromiseRes, item => { return item })) {
        return
      }

      // 3、获取提交事件前置数据
      let submitData = {
        //设置到流程里面的相关数据
        procRelaDataMap: {
          flowFlag: "0",
          orgId: this.currentUser.orgId
        }
      }
      let submitDataPromiseCall = []
      this.validPromise.forEach(item => {
        submitDataPromiseCall.push(item())
      })
      let submitDataPromiseRes = await Promise.all(submitDataPromiseCall)
      // 合并数据
      submitDataPromiseRes.forEach(item => {
        Object.assign(submitData, item)
      })

      if (submitData && submitData.procRelaDataMap.isTerminateProcess === true) {
        this.$dialog.confirm({
          title: '提示',
          message: '请确认是否要终止该任务?',
        }).then(() => {
          this.$tools.loading('正在执行终止操作...')
          let params = { processInstID: this.context.processInstID }
          this.$net.workflow.terminateProcessInstance(params).then().then(resp => {
            this.$tools.clearLoading()
            if (resp.code == 1) {
              if (resp.data == true) {
                this.$tools.back()
              } else {
                this.$notify({ type: 'error', message: '无法终止该任务!' })
              }
            } else {
              this.$notify({ type: 'error', message: resp.msg })
            }
          })
        }).catch(() => {
          // 取消
        })
      } else {
        submitData = _.merge({}, this.context.actExtData, submitData, {
          submitWay: this.getExtDataType(),
          yjlx: this.context.actConfigData.yjlx,
          ywid: this.context.ywid,
          ywlx: this.context.ywlx,
          processInstID: this.context.processInstID,
          activityInstID: this.context.activityObject.activityInstID,
          activityDefID: this.context.activityObject.activityDefID,
          activityInstName: this.context.activityObject.activityInstName,
          workItemID: this.context.workItemID,
          procRelaDataMap: { flowFlag: "0" }
        })
        this.$refs.AffairDetailSubmitPopup._show(submitData)
      }
    },
    getExtDataType () {
      let type = ''
      if (this.context && this.context.actConfigData) {
        let kzgn = JSON.parse(this.context.actConfigData.kzgn)
        kzgn.forEach(item => {
          if (item.id == 'submit') {
            type = item.type
          }
        })
      }
      return type
    }
  }
}
</script>
<style lang="less" scoped>
</style>