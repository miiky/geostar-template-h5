<!--
 * @Description: 文件描述
 * @Author: miiky_yang
 * @Date: 2020-07-16 11:57:06
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-16 12:07:31
--> 
<template>
  <div>
    <div @click="_handleBack">回退</div>
    <affair-detail-back-popup ref="AffairDetailBackPopup" @on-back="_onBack"></affair-detail-back-popup>
  </div>
</template>
<script>
import _ from 'lodash'
import { mapActions, mapGetters } from 'vuex'
import AffairDetailBackPopup from '../popups/affair-detail-back-popup'

export default {
  name: 'button-back',
  components: {
    AffairDetailBackPopup
  },
  computed: {
    ...mapGetters(['context', 'workItemDone'])
  },
  methods: {
    ...mapActions(['checkWorkItem']),
    async _handleBack () {
      // 1、检测当前任务是否已经完成
      await this.checkWorkItem({ workItemID: this.context.workItemID })
      if (!this.workItemDone) {
        return
      }

      let toolExtData = {}
      if (this.context && this.context.actConfigData && this.context.actConfigData.kzgn) {
        let kzgn = JSON.parse(this.context.actConfigData.kzgn)
        toolExtData = _.find(kzgn, (item) => { return item.id === 'back' })
      }
      this.$refs.AffairDetailBackPopup._show({
        backWay: toolExtData.type,
        extdata: toolExtData.extdata,
        ywid: this.context.ywid,
        ywlx: this.context.ywlx,
        processInstID: this.context.processInstID,
        activityInstID: this.context.activityObject.activityInstID,
        activityDefID: this.context.activityObject.activityDefID,
        activityInstName: this.context.activityObject.activityInstName,
        workItemID: this.context.workItemID
      })
    },
    _onBack () {
      this.$notify({ type: 'success', message: '回退成功!' })
      this.$tools.back()
    }
  }
}
</script>
<style lang="less" scoped>
</style>