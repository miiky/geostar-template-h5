<!--
 * @Description: 文件描述
 * @Author: miiky_yang
 * @Date: 2020-07-07 15:42:47
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-07 18:06:49
--> 
<template>
  <div class="affair-detail">
    <div class="affair-detail-header">
      <van-sticky :offset-top="offsetTop">
        <div class="title">{{item.title}}</div>
      </van-sticky>
    </div>
    <section class="affair-detail-card">
      <div class="card-title">基本信息</div>
      <van-form>
        <van-field label="事项名称">
          <template #input>
            <span>隐私请假</span>
          </template>
        </van-field>
        <van-field label="办理情形">
          <template #input>
            <span>事假</span>
          </template>
        </van-field>
        <van-field label="申请人">
          <template #input>
            <span>张珊</span>
          </template>
        </van-field>
        <van-field label="申请部门">
          <template #input>
            <span>自然资源部</span>
          </template>
        </van-field>
        <van-field label="申请时间">
          <template #input>
            <span>2020-07-07</span>
          </template>
        </van-field>
      </van-form>
    </section>
    <section class="affair-detail-card">
      <div class="card-title">业务表单</div>
      <van-cell center is-link>
        <template #title>
          <span>请假申请表20200706.pdf</span>
        </template>
      </van-cell>
      <van-cell center is-link>
        <template #title>
          <span>病假证材料1.pdf</span>
        </template>
      </van-cell>
      <van-cell center is-link>
        <template #title>
          <span>病假证材料2.pdf</span>
        </template>
      </van-cell>
    </section>
    <section class="affair-detail-card">
      <div class="card-title">审批意见</div>
      <van-cell center v-for="(item, index) in opinions" :key="index">
        <template #title>
          <span>{{item.text}}</span>
        </template>
        <template #label>
          <van-row>
            <van-col span="12">{{item.name}}</van-col>
            <van-col span="12" style="text-align:right;">{{item.time}}</van-col>
          </van-row>
        </template>
      </van-cell>
      <van-field v-model="newMessage" autosize type="textarea" placeholder="请输入意见">
        <template #button>
          <van-button type="info" size="mini" @click="_commitMessage">提交</van-button>
        </template>
      </van-field>
    </section>
    <section class="affair-detail-footer">
      <van-row>
        <van-col span="12" class="footer-item divider">回退</van-col>
        <van-col span="12" class="footer-item">提交</van-col>
      </van-row>
    </section>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      item: {
        id: 0,
        title: '',
        name: '袁慎明',
        time: '2020-07-06',
        message: ''
      },
      opinions: [{
        text: '请领导批准请领导批准请领导批准请领导批准请领导批准请领导批准请领导批准',
        name: '袁慎明',
        time: '2020-07-06'
      }, {
        text: '拟同意',
        name: '张三',
        time: '2020-07-07'
      }],
      newMessage: ''

    }
  },
  computed: {
    ...mapGetters(['isWx']),
    offsetTop () {
      return this.isWx ? 0 : 46
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      let id = this.$route.query.id
      this.item.id = id
      this.item.title = '2020-07-07培训出差' + id + '天'
    },
    _commitMessage () {
      this.opinions.push({
        text: this.newMessage,
        name: '袁慎明',
        time: '2020-07-07'
      })
      this.newMessage = ''
    }
  }
}
</script>
<style lang="less" scoped>
.affair-detail {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: scroll;
  padding-top: 30px;
  padding-bottom: 60px;
  &-header {
    position: absolute;
    top: 0;
    left: 0;
    height: 150px;
    width: 100%;
    background-color: @wx-title-background;
    .title {
      z-index: 30;
      background-color: @wx-title-background;
      color: white;
      font-size: 18px;
      height: 30px;
      line-height: 30px;
      padding: 0 20px;
    }
  }
  &-card {
    position: relative;
    margin: 10px 20px;
    background-color: white;
    border-radius: 10px;
    color: #333333;
    line-height: 1.5;
    overflow: hidden;
    opacity: 0.9;
    .card-title {
      padding: 10px 15px;
      color: black;
      border-bottom: 1px solid @gray-3;
    }
  }
  &-footer {
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 40px;
    background-color: @wx-title-background;
    z-index: 9999;
    .footer-item {
      text-align: center;
      font-size: 16px;
      line-height: 40px;
      color: white;
    }
    .divider {
      border-right: 0.5px solid white;
    }
  }
}
</style>