<!--
 * @Description: 文件描述
 * @Author: miiky_yang
 * @Date: 2020-07-07 09:59:18
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-09 13:10:27
--> 
<template>
  <van-tabbar v-model="currentTab">
    <van-tabbar-item icon="bars" name="NewsPage" replace to="/news">新闻</van-tabbar-item>
    <van-tabbar-item icon="wap-home" name="HomePage" replace to="/home">主页</van-tabbar-item>
    <van-tabbar-item icon="todo-list" name="WorkPage" replace to="/work">办公</van-tabbar-item>
    <van-tabbar-item icon="smile" name="MinePage" replace to="/mine">我的</van-tabbar-item>
  </van-tabbar>
</template>
<script>
export default {
  name: 'geo-tabbar',
  data () {
    return {
      currentTab: this.$route.name
    }
  },
  watch: {
    $route (to, from) {
      this.currentTab = to.name
    }
  },
  mounted () {

  }
}
</script>
<style lang="less" scoped>
</style>