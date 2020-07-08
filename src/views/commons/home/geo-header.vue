<!--
 * @Description: 文件描述
 * @Author: miiky_yang
 * @Date: 2020-07-07 10:02:00
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-08 09:48:09
--> 
<template>
  <van-nav-bar :title="currentTitleText" :left-text="leftText" :right-text="rightText" z-index="9999" placeholder fixed
    left-arrow @click-left="_onClickLeft" @click-right="_onClickRight" />
</template>
<script>

export default {
  props: {
    currentTitleText: String
  },
  data () {
    return {
      leftText: '返回',
      rightText: ''
    }
  },
  methods: {
    _onClickRight () {
    },
    _onClickLeft () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less">
.van-hairline--bottom::after {
  border-bottom-width: 0 !important;
}
</style>