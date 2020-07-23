<!--
 * @Description: 文件描述
 * @Author: miiky_yang
 * @Date: 2020-07-10 17:08:33
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-16 18:09:50
--> 
<template>
  <section class="affair-detail-card" key="opinion">
    <div class="card-title">
      <van-icon name="edit" size="18" style="vertical-align: middle;" />审批意见
    </div>
    <van-cell center v-for="(item, index) in opinions" :key="index">
      <template #title>
        <span>{{item.yjnr}}</span>
      </template>
      <template #label>
        <van-row>
          <van-col span="12">{{item.sprmc}}</van-col>
          <van-col span="12" style="text-align:right;">{{item.cjsj}}</van-col>
        </van-row>
      </template>
    </van-cell>
    <van-field v-model="message" rows="3" autosize type="textarea" placeholder="请输入意见">
    </van-field>
  </section>
</template>
<script>
export default {
  name: 'affair-detail-opinion',
  props: {
    title: String,
    context: Object
  },
  data () {
    return {
      opinions: [],
      message: ''
    }
  },
  created () {
    console.log('context=>', this.context)
    this.initOpinions()
    this.initBus()
  },
  methods: {
    initBus () {
      this.$bus.$on('beforeSubmit', 'affair-detail-opinion', () => {
        let canSubmit = this.message != ''
        if (!canSubmit) {
          this.$notify({ type: 'warning', message: '意见不能为空!' });
        }
        this.$store.commit('SET_BEFORE_SUBMIT_STATUS', canSubmit)
      })
    },
    initOpinions () {
      let params = { lcid: this.context.processInstID }
      this.$net.business.queryYjnr(params).then(res => {
        console.log('queryYjnr=>', res.data)
        this.opinions = res.data
      })
    },
    valid () {
      let canSubmit = this.message != ''
      if (!canSubmit) {
        this.$notify({ type: 'warning', message: '意见不能为空!' });
      }
      return new Promise((resolve, reject) => { resolve(canSubmit) })
    },
    submitData () {
      return new Promise((resolve, reject) => { resolve('opinion') })
    },
    submit () {
      return new Promise((resolve, reject) => {
        let params = {
          yjlb: parseInt(this.context.rollBackFlag),
          yjlx: '1',
          yjxszt: 1,
          yjnr: this.message,
          sprid: this.context.oasjd.sqrid,
          sprmc: this.context.oasjd.sqrmc,
          // ssjgid: user.orgId,
          // ssjgmc: user.orgName,
          // sscsid: user.orgId,
          // sscsmc: user.orgName,
          ywid: this.context.ywid,
          ywlx: this.context.ywlx,
          lcid: this.context.oasjd.lcslid,
          hjid: this.context.activityObject.activityDefID,
          hjmc: this.context.activityObject.activityInstName,
          gzxid: this.context.workItemID,
        }
        this.$net.business.saveOrUpdateYjnr(params).then(res => {
          console.log('saveOrUpdateYjnr=>', res)
          resolve(res)
        }).catch(err => {
          console.log(err)
          reject(err)
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.affair-detail-card {
  z-index: 20;
  position: relative;
  margin: 10px 20px;
  background-color: white;
  border-radius: 10px;
  color: #333333;
  overflow: hidden;
  // opacity: 0.9;
  .card-title {
    font-weight: 600;
    padding: 0 15px;
    height: 45px;
    line-height: 45px;
    color: @wx-title-background;
    border-bottom: 1px solid @gray-3;
    i {
      transform: translateY(-2px);
      margin-right: 3px;
    }
  }
}
</style>