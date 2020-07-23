<!--
 * @Description: 文件描述
 * @Author: miiky_yang
 * @Date: 2020-07-10 17:08:33
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-16 18:10:11
--> 
<template>
  <section class="affair-detail-card">
    <div class="card-title">
      <van-icon name="manager-o" size="18" style="vertical-align: middle;" />
      <span v-text="title" />
    </div>
    <van-form>
      <van-field label="事项名称">
        <template #input>
          <span v-text="context.oasjd.ywxilmc"></span>
        </template>
      </van-field>
      <van-field label="申请人">
        <template #input>
          <span v-text="context.oasjd.jbrmc"></span>
        </template>
      </van-field>
      <van-field label="申请部门">
        <template #input>
          <span v-text="context.oasjd.bljgmc"></span>
        </template>
      </van-field>
      <van-field label="申请时间">
        <template #input>
          <span v-text="context.oasjd.cjsj"></span>
        </template>
      </van-field>
    </van-form>
  </section>
</template>
<script>
export default {
  name: 'affair-detail-base',
  props: {
    title: String,
    context: Object
  },
  mounted () {
    this.initBus()
  },
  methods: {
    initBus () {
      console.log('initbus base')
      this.$bus.$on('beforeSubmit', 'affair-detail-base', () => {
        console.log('initbus base invoke...')
        let canSubmit = true
        this.$store.commit('SET_BEFORE_SUBMIT_STATUS', canSubmit)
      })
    },
    valid () {
      let canSubmit = true
      return new Promise((resolve, reject) => { resolve(canSubmit) })
    },
    submitData () {
      return new Promise((resolve, reject) => { resolve('base') })
    },
    submit () {
      return new Promise((resolve, reject) => { resolve('base') })
    }
  }
}
</script>
<style lang="less" scoped>
.affair-detail-card {
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
</style>