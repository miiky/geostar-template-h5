<!--
 * @Description: 文件描述
 * @Author: miiky_yang
 * @Date: 2020-07-08 10:31:35
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-22 16:53:31
--> 
<template>
  <div>
    <van-popup v-model="show" round position="bottom" duration="0.2">
      <div class="affair-detail-submit">
        <div class="card-title">
          <span class="cancel" @click="_cancel">取消</span>
          <span>业务提交确认</span>
          <span class="submit" @click="_submit">确定</span>
        </div>
        <van-form>
          <van-field class="field-item" label-align="right" readonly clickable label="选择环节" :value="activityName"
            @click="_clickField">
          </van-field>
          <template v-for="org in participants">
            <van-field :label="org.orgName" :key="org.orgId" label-align="right">
              <template #input>
                <section v-if="selectEmp">
                  <van-checkbox-group v-model="checkPartis" direction="horizontal">
                    <template v-for="emp in org.items">
                      <van-checkbox class="radio-item" shape="square" :key="emp.empId" :name="emp.empId"
                        @click="_checkEmp(emp.empId)">
                        <div>{{emp.empName}}</div>
                      </van-checkbox>
                    </template>
                  </van-checkbox-group>
                </section>
                <section v-else>
                  <div class="nocheck-item" v-for="emp in org.items" :key="emp.empId">
                    {{emp.empName}}</div>
                </section>
              </template>
            </van-field>
          </template>
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
  name: 'affair-detail-submit',
  data () {
    return {
      show: false,
      showPicker: false,

      activityDefId: '',
      activityName: '',
      isFinishActivity: false,

      selectActivity: false,
      selectEmp: false,
      isRadio: false,

      formData: {},

      activitys: [],
      participants: [],
      checkPartis: [],
    }
  },
  computed: {
    ...mapGetters(['submitPromise']),
    activityPicker () {
      let aps = []
      this.activitys.forEach(item => {
        aps.push(item.name)
      })
      return aps
    }
  },
  methods: {
    async _show (item) {
      this.formData = item
      this.$tools.loading('获取数据...')
      this.initPageData(item)
      await this.initPage()
      this.$tools.clearLoading()
      this.show = true
    },
    initPageData () {
      this.selectActivity = "selectActivity" === this.formData.submitWay ? true : false
      this.selectEmp = "false" === this.formData.select ? false : true
      this.isRadio = "false" === this.formData.radio ? false : true
    },
    async initPage () {
      const formData = this.formData
      let lastActivityDefID = ""
      // 环节是否可选
      if (this.selectActivity) {
        let lstActivityDefine = await this.queryNextActivityDefines(formData.workItemID)
        if (lstActivityDefine.length > 0) {
          this.activitys = lstActivityDefine
          this.activityDefId = lstActivityDefine[0].id
          this.activityName = lstActivityDefine[0].name

          lastActivityDefID = lstActivityDefine[0].id
          this.isFinishActivity = lstActivityDefine[0].type == "finish" ? true : false
        }
      } else {
        let activityDefine = await this.queryNextActivityDefine(formData.processInstID, formData.activityInstID, formData.procRelaDataMap)
        this.activityDefId = activityDefine.id
        this.activityName = activityDefine.name

        lastActivityDefID = activityDefine.id
        this.isFinishActivity = activityDefine.type == "finish" ? true : false
      }
      if (lastActivityDefID) {
        let participants = []
        if (this.isFinishActivity == false) {
          participants = await this.getParticipants(formData.processInstID, lastActivityDefID, formData.procRelaDataMap)
        }
        this.participants = participants
      }
    },
    async queryNextActivityDefines (workItemID) {
      let lstAct = []
      let resp = await this.$net.workflow.queryNextActivityDefines({ workItemID: workItemID })
      if (resp.code == 1) {
        lstAct = resp.data
      }

      return lstAct
    },
    async queryNextActivityDefine (processInstID, activityInstID, procRelaDataMap) {
      let objAct = await this.$net.workflow.queryNextActivityDefine({
        processInstID: processInstID,
        activityInstID: activityInstID,
        procRelaDataMap: JSON.stringify(procRelaDataMap)
      })
      return objAct
    },
    async getParticipants (processInstID, activityDefID, procRelaDataMap) {
      let arrParti = await this.queryNextActivityParticipants(processInstID, activityDefID, procRelaDataMap)
      this.allPartis = arrParti
      this.selectEmp = arrParti && arrParti.length == 1 ? false : this.selectEmp
      let arrResult = []
      let arrCheckPartis = []
      _.each(arrParti, (parti) => {
        let curOrg = null
        let iIndex = _.findIndex(arrResult, (item) => { return item.orgId == parti.orgId })
        if (iIndex > -1) {
          curOrg = arrResult[iIndex]
        } else {
          curOrg = { orgId: parti.orgId, orgName: parti.orgName, items: [] }
          arrResult.push(curOrg)
        }
        curOrg.items.push({ empId: parti.empId, empName: parti.empName })
        arrCheckPartis.push(parti.empId)
      })
      this.$nextTick(() => {
        if (!this.selectEmp) this.checkPartis = arrCheckPartis
      })
      return arrResult
    },
    async queryNextActivityParticipants (processInstID, activityDefID, procRelaDataMap) {
      let arrParti = await this.$net.workflow.queryNextActivityParticipants({
        processInstID: processInstID,
        activityDefID: activityDefID,
        procRelaDataMap: JSON.stringify(procRelaDataMap)
      })
      return arrParti
    },
    addBizChatMember () {
      //提交完成之后添加参与者到即时通讯的业务群组
      let arrCheckPartis = _.filter(this.allPartis, (item) => { return this.checkPartis.indexOf(item.empId) > -1 })
      let empIds = _.map(arrCheckPartis, (item) => item.empId).join(",")
      let empNames = _.map(arrCheckPartis, (item) => item.empName).join(",")
      this.$net.business.addBizChatMember({
        params: {
          ywid: this.formData.ywid,
          ywlx: this.formData.ywlx,
          empIds: empIds,
          empNames: empNames
        }
      })
    },
    _clickField () {
      if (this.selectActivity) {
        this.showPicker = true
      }
    },
    _chooseActivity (value, index) {
      this.activityName = value
      this.activityDefId = this.activitys[index].id
      this.showPicker = false

      this.isFinishActivity = this.activitys[index].type == 'finish' ? true : false
      if (this.isFinishActivity) {
        this.participants = []
        return
      }

      this.getParticipants(this.formData.processInstID, this.activityDefId, this.formData.procRelaDataMap).then(res => {
        this.participants.splice(0, this.participants.length, ...res)
      })
    },
    _checkEmp (empid) {
      if (this.selectEmp && this.isRadio) {
        this.checkPartis.splice(0, this.checkPartis.length)
        this.checkPartis.push(empid)
      }
    },
    _cancel () {
      Object.assign(this.$data, this.$options.data())
      this.show = false
    },
    async _submit () {
      let submitPromiseCall = []
      this.submitPromise.forEach(item => {
        submitPromiseCall.push(item())
      })
      Promise.all(submitPromiseCall).then(async res => {
        this.$tools.loading('正在提交中...')
        let submitData = { workItemID: this.formData.workItemID, procRelaDataMap: JSON.stringify(this.formData.procRelaDataMap) }
        if (this.selectActivity) {
          submitData.selectActivities = this.activityDefId
        }
        if (this.checkPartis.length > 0 || this.isFinishActivity == true) {
          submitData.selectParticipants = _.map(this.checkPartis, (empid) => { return 'emp|' + empid }).join(",")
          let resp = await this.$net.workflow.commonSave(submitData)
          if (resp.code == 1 && resp.data) {
            //提交完成之后添加参与者到即时通讯的业务群组
            this.addBizChatMember()
            this._cancel()
            this.$notify({ type: 'success', message: '表单提交成功!' })
            this.$tools.back()
          } else {
            this.$notify({ type: 'warning', message: resp.msg });
          }
        } else {
          this.$notify({ type: 'warning', message: '参与者不能为空!' });
        }
        this.$tools.clearLoading()
      })


    }
  }
}
</script>
<style lang="less" scoped>
.affair-detail-submit {
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
    .submit {
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
  .nocheck-item {
    margin-right: 10px;
    display: inline-block;
    min-width: fit-content;
  }
}
</style>
<style lang="less">
.van-popup {
  max-height: 80%;
}
</style>