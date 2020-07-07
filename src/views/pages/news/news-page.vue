<!--
 * @Description: 文件描述
 * @Author: miiky_yang
 * @Date: 2020-07-07 09:53:59
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-07 13:53:36
--> 
<template>
  <div class="news">
    {{navigator}}
  </div>
</template>
<script>
export default {
  data () {
    return {
      navigator: ''
    }
  },
  mounted () {
    console.log('navigator=>', navigator.userAgent.toLowerCase())
    this.navigator = navigator.userAgent.toLowerCase()
  }
}
</script>
<style lang="less" scoped>
.news {
}
</style>