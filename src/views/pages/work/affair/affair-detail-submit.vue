<!--
 * @Description: 文件描述
 * @Author: miiky_yang
 * @Date: 2020-07-08 10:31:35
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-08 12:04:37
--> 
<template>
  <van-popup v-model="show" round position="bottom" :style="{ height: '40%' }" duration="0.2">
    <div class="affair-detail-submit">
      <div class="card-title">
        <span class="cancel" @click="_cancel">取消</span>
        <span>业务提交确认</span>
        <span class="submit" @click="_submit">确定</span>
      </div>
      <van-form>
        <van-field label="提交环节" class="field-item">
          <template #input>
            <van-radio-group v-model="radio">
              <van-radio class="radio-item" name="1">XXXX环节</van-radio>
              <van-radio class="radio-item" name="2">XXXXX环节</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field label="提交人员" class="field-item">
          <template #input>
            <van-checkbox-group v-model="checkboxGroup" direction="horizontal">
              <van-checkbox class="radio-item" name="1" shape="square">袁慎明</van-checkbox>
              <van-checkbox class="radio-item" name="2" shape="square">郭磊</van-checkbox>
              <van-checkbox class="radio-item" name="3" shape="square">胡涛</van-checkbox>
              <van-checkbox class="radio-item" name="4" shape="square">徐嘉</van-checkbox>
            </van-checkbox-group>
          </template>
        </van-field>
      </van-form>
    </div>

  </van-popup>
</template>
<script>
import { Notify } from 'vant';

export default {
  name: 'affair-detail-submit',
  data () {
    return {
      show: false,
      radio: '',
      checkboxGroup: []
    }
  },
  methods: {
    _cancel () {
      this.show = false
    },
    _submit () {
      this.show = false
      Notify({ type: 'success', message: '提交成功！', duration: 1000 });
    }
  }
}
</script>
<style lang="less" scoped>
.affair-detail-submit {
  padding: 10px 0;
  .card-title {
    text-align: center;
    font-weight: 600;
    font-size: 16px;
    padding: 10px 15px 15px;
    color: black;
    border-bottom: 1px solid @gray-3;
    .cancel {
      color: @gray-6;
      float: left;
    }
    .submit {
      color: @wx-title-background;
      float: right;
    }
  }
  .field-item {
    padding-top: 20px;
  }
  .radio-item {
    margin-bottom: 10px;
  }
}
</style>