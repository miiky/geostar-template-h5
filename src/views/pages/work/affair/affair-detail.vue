<!--
 * @Description: 文件描述
 * @Author: miiky_yang
 * @Date: 2020-07-07 15:42:47
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-08 15:44:03
--> 
<template>
  <div class="affair-detail">
    <!-- <van-sticky :offset-top="offsetTop"> -->
    <div class="affair-detail-header" :style="{top: offsetTop}"></div>
    <div class="affair-detail-title" :style="{top: offsetTop}">{{item.title}}</div>
    <!-- </van-sticky> -->
    <section class="affair-detail-card">
      <div class="card-title">
        <van-icon name="manager-o" size="18" style="vertical-align: middle;" />基本信息
      </div>
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
      <div class="card-title">
        <van-icon name="orders-o" size="18" style="vertical-align: middle;" />业务表单
      </div>
      <van-cell center is-link @click="_previewPDF">
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
      <div class="card-title">
        <van-icon name="edit" size="18" style="vertical-align: middle;" />审批意见
      </div>
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
          <van-button type="info" size="small" color="#4277bd" @click="_commitMessage">提交</van-button>
        </template>
      </van-field>
    </section>
    <section class="affair-detail-footer">
      <van-row>
        <van-col span="12" class="footer-item divider">回退</van-col>
        <van-col span="12" class="footer-item" @click="_submit">提交</van-col>
      </van-row>
    </section>
    <affair-detail-submit ref="AffairDetailSubmit"></affair-detail-submit>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { Notify } from 'vant'
import AffairDetailSubmit from './affair-detail-submit'

export default {
  components: {
    AffairDetailSubmit
  },
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
      return this.isWx ? '0' : '46px'
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
      if (this.newMessage == '') {
        Notify({ type: 'warning', message: '意见消息不能为空！', duration: 1000 })
        return
      }
      this.opinions.push({
        text: this.newMessage,
        name: '袁慎明',
        time: '2020-07-07'
      })
      this.newMessage = ''
    },
    _submit () {
      this.$refs.AffairDetailSubmit.show = true
    },
    _previewPDF () {
      // location.href = 'http://192.168.32.170:8088/long_message.pdf'
      this.$router.push({ name: 'PdfPreview' })

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
    position: fixed;
    top: 0;
    left: 0;
    height: 150px;
    width: 100%;
    background-color: @wx-title-background;
  }
  &-title {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 30;
    width: 100%;
    background-color: @wx-title-background;
    color: white;
    font-size: 18px;
    height: 30px;
    line-height: 30px;
    padding: 0 20px;
    box-shadow: 0px 2px 3px @wx-title-background;
  }
  &-card {
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
  &-footer {
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 40px;
    background-color: @wx-title-background;
    z-index: 50;
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