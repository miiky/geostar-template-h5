<!--
 * @Description: 文件描述
 * @Author: miiky_yang
 * @Date: 2020-07-07 09:53:59
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-10 17:05:09
--> 
<template>
  <div class="news-page">
    <van-empty description="新闻页面正在施工..." :image="require('_a/images/empty-image-default.png')" />
    <!-- <div>{{time}}</div> -->
  </div>
</template>
<script>
import moment from 'moment'
moment.locale('zh_CN')

export default {
  data () {
    return {
      navigator: '',
      time: ''
    }
  },
  mounted () {
    this.time = moment().format('dddd')
  }
}
</script>
<style lang="less" scoped>
.news-page {
}
</style>