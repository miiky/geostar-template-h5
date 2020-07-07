<!--
 * @Description: 文件描述
 * @Author: miiky_yang
 * @Date: 2020-06-22 10:52:43
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-06 17:55:23
--> 
<template>
  <div class="about">
    <van-cell-group>
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" label="描述信息" />
    </van-cell-group>
    <van-button type="default" @click="visible = !visible">默认按钮</van-button>
    <transition name="van-slide-right">
      <div v-show="visible">Slide Right</div>
    </transition>
  </div>
</template>
<script>
export default {
  data () {
    return {
      visible: false
    }
  },
  mounted () {
    this.$net.user.getUsers().then(res => {
      console.log('res=>', res)
    }).catch(err => {
      // console.log('err=>', err)
    })
  }
}
</script>
<style lang="less" scoped>
</style>
