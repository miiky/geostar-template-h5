<!--
 * @Description: 文件描述
 * @Author: miiky_yang
 * @Date: 2020-07-08 10:31:35
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-22 12:57:51
--> 
<template>
  <div>
    <van-popup v-model="show" round position="bottom" duration="0.2">
      <div class="affair-detail-back">
        <div class="card-title">
          <span class="cancel" @click="_cancel">取消</span>
          <span>回退</span>
          <span class="back" @click="_back">确定</span>
        </div>
        <van-form ref="backForm">
          <van-field class="field-item" label-align="right" readonly clickable label="选择环节" :value="activityName"
            @click="_clickField">
          </van-field>
          <van-field class="field-item" label-align="right" label="参与者">
            <template #input>
              <section><span style="margin-right:10px;" v-for="emp in participants" :key="emp.id">{{emp.name}}</span>
              </section>
            </template>
          </van-field>
          <van-field class="field-item" label-align="right" label="回退原因" type="textarea" rows="2"
            v-model="auditContent">
          </van-field>
        </van-form>
      </div>
    </van-popup>
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker show-toolbar :columns="activityPicker" @cancel="showPicker = false" @confirm="_chooseActivity" />
    </van-popup>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'affair-detail-back',
  data () {
    return {
      show: false,
      showPicker: false,
      activitys: [],
      participants: [],
      activityDefId: '',
      activityName: '',
      auditContent: '',
      backData: {}
    }
  },
  computed: {
    activityPicker () {
      let arrActDef = []
      this.activitys.forEach(item => {
        arrActDef.push(item.name)
      })
      return arrActDef
    }
  },
  methods: {
    async _show (item) {
      this.backData = item
      this.$tools.loading('获取数据...')
      await this.initPage(item)
      this.$tools.clearLoading()
    },
    async initPage (item) {
      let lstActivityDefine = await this.queryPreActivityDefine(item.workItemID, item.backWay, item.extdata)
      if (lstActivityDefine.length > 0) {
        this.activitys = lstActivityDefine
        this.activityDefId = lstActivityDefine[0].id
        this.activityName = lstActivityDefine[0].name
      }
      if (this.activityDefId) {
        this.participants = await this.getParticipants(item.processInstID, this.activityDefId)
      }
      if (!this.activityDefId || this.participants.length == 0) {
        this.$notify({ type: 'warning', message: '操作失败!' })
        this._cancel()
      } else {
        this.show = true
      }
    },
    async queryPreActivityDefine (workItemID, backWay, extdata) {
      let lstAct = []
      let resp = await this.$net.workflow.queryPreActivityDefine({
        workItemID: workItemID,
        backWay: backWay,
        extdata: extdata
      })
      if (resp.code == 1) {
        lstAct = resp.data
      }
      return lstAct
    },
    async getParticipants (processInstID, activityDefID) {
      let arrParti = await this.$net.workflow.queryPreActivityParticipants({
        processInstID: processInstID,
        activityDefID: activityDefID
      })
      return arrParti
    },
    _chooseActivity (value, index) {
      this.activityName = value
      this.activityDefId = this.activitys[index].id
      this.showPicker = false
    },
    _cancel () {
      this.show = false
    },
    async _back () {
      let auditContent = _.trim(this.auditContent)
      if (!auditContent) {
        this.$notify({ type: 'warning', message: "回退原因不能为空" });
        return
      }
      this.$tools.loading('正在执行退回操作...')
      const formData = this.backData
      let submitData = {
        processInstID: formData.processInstID,
        curActInstID: formData.activityInstID,
        workItemID: formData.workItemID,
        curActDefID: formData.activityDefID,
        destActDefID: this.activityDefId,
        strategy: formData.backWay
      }
      let objOpinion = {
        yjnr: auditContent,
        yjxszt: "1",
        ywid: formData.ywid,
        ywlx: formData.ywlx,
        yjlb: "1",
        yjlx: "",
        yjmc: "",
        lcid: formData.processInstID,
        hjid: formData.activityDefID,
        hjmc: formData.activityInstName,
        gzxid: formData.workItemID
      }
      submitData.bizInfo = JSON.stringify(objOpinion)
      let resp = await this.$net.workflow.backActivity(submitData)
      if (resp.code == 1 && resp.data) {
        this.$emit('on-back', {})
        this._cancel()
      } else {
        this.$notify({ type: 'warning', message: resp.msg });
      }
      this.$tools.clearLoading()
    },
    _clickField () {
      if (this.activitys.length > 1) {
        this.showPicker = true
      }
    }
  }
}
</script>
<style lang="less" scoped>
.affair-detail-back {
  padding: 10px 0;
  .card-title {
    text-align: center;
    font-weight: 600;
    font-size: 16px;
    padding: 10px 15px 15px;
    color: black;
    border-bottom: 1px solid @gray-3;
    .cancel {
      color: @gray-6;
      float: left;
    }
    .back {
      color: @wx-title-background;
      float: right;
    }
  }
  .field-item {
    padding-top: 20px;
  }
  .radio-item {
    margin-bottom: 10px;
  }
}
</style>
<style lang="less">
.van-popup {
  max-height: 80%;
}
</style>