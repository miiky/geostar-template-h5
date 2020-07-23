<!--
 * @Description: 文件描述
 * @Author: miiky_yang
 * @Date: 2020-07-16 11:56:12
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-22 12:26:51
--> 
<template>
  <div>
    <van-row>
      <van-col :span="8" class="footer-item divider">
        <button-back :context="context"></button-back>
      </van-col>
      <van-col :span="8" class="footer-item divider">
        <button-follow :context="context"></button-follow>
      </van-col>
      <van-col :span="8" class="footer-item">
        <button-submit :context="context"></button-submit>
      </van-col>
    </van-row>
  </div>
</template>
<script>
import ButtonBack from './button-back'
import ButtonFollow from './button-follow'
import ButtonSubmit from './button-submit'

export default {
  name: 'buttons',
  components: {
    ButtonBack, ButtonFollow, ButtonSubmit,
  },
  props: {
    context: Object
  }
}
</script>
<style lang="less" scoped>
.footer-item {
  text-align: center;
  font-size: 16px;
  line-height: 40px;
  color: white;
}
.divider {
  border-right: 0.5px solid white;
}
</style>
