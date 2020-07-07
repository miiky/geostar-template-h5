<!--
 * @Description: 文件描述
 * @Author: miiky_yang
 * @Date: 2020-07-07 09:59:18
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-07 11:39:38
--> 
<template>
  <van-tabbar v-model="currentTab">
    <van-tabbar-item icon="search" name="news" replace to="/news">新闻</van-tabbar-item>
    <van-tabbar-item icon="home-o" name="home" replace to="/home">主页</van-tabbar-item>
    <van-tabbar-item icon="friends-o" name="work" replace to="/work">办公</van-tabbar-item>
    <van-tabbar-item icon="setting-o" name="mine" replace to="/mine">我的</van-tabbar-item>
  </van-tabbar>
</template>
<script>
export default {
  name: 'geo-tabbar',
  data () {
    return {
      currentTab: 'news'
    }
  }
}
</script>
<style lang="less" scoped>
</style>