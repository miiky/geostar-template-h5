<!--
 * @Description: 文件描述
 * @Author: miiky_yang
 * @Date: 2020-07-07 10:30:43
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-07 11:34:06
--> 
<template>
  <div class="work-page">
    <div class="work-page-card" @click="_to('article')">
      <van-row type="flex" justify="space-around" align="center">
        <van-col span="8">
          <van-image width="100" height="100" :src="imgs[0]" />
        </van-col>
        <van-col span="8">
          <p class="card-title">综合办文</p>
          <p class="card-subtitle">办理综合办文~</p>
        </van-col>
      </van-row>
    </div>
    <div class="work-page-card" @click="_to('affair')">
      <van-row type="flex" justify="space-around" align="center">
        <van-col span="8">
          <p class="card-title">综合事务</p>
          <p class="card-subtitle">办理综合事务~</p>
        </van-col>
        <van-col span="8">
          <van-image width="100" height="100" :src="imgs[1]" />
        </van-col>
      </van-row>
    </div>
    <div class="work-page-card" @click="_to('approval')">
      <van-row type="flex" justify="space-around" align="center">
        <van-col span="8">
          <van-image width="100" height="100" :src="imgs[2]" />
        </van-col>
        <van-col span="8">
          <p class="card-title">综合审批</p>
          <p class="card-subtitle">办理综合办文~</p>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
import { Notify } from 'vant';

export default {
  data () {
    return {
      imgs: [require('_a/images/work/realNote.png'), require('_a/images/work/realPhone.png'),
      require('_a/images/work/realSqtNote.png')]
    }
  },
  methods: {
    _to (value) {
      if (value == 'affair') {
        this.$router.push({ name: 'AffairPage' })
      } else {
        Notify({ type: 'primary', message: '暂未开放！' });
      }
    }
  }
}
</script>
<style lang="less" scoped>
.work-page {
  position: relative;
  .work-page-card {
    background-color: white;
    margin: 20px 20px 0 20px;
    padding: 15px;
    border-radius: 4px;
    .card-title {
      font-size: 20px;
      line-height: 1.5;
    }
    .card-subtitle {
      font-size: 14px;
      line-height: 1.5;
    }
  }
}
</style>