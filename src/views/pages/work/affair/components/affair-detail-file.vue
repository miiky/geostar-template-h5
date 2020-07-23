<!--
 * @Description: 文件描述
 * @Author: miiky_yang
 * @Date: 2020-07-10 17:08:33
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-16 18:10:04
--> 
<template>
  <section class="affair-detail-card" key="serviceform">
    <div class="card-title">
      <van-icon name="orders-o" size="18" style="vertical-align: middle;" />
      <span v-text="title" />
    </div>
    <van-cell-group v-if="onlyFile">
      <p v-if="attachDirItems[0].children.length == 0"
        style="text-align:center;padding: 16px 0;color: #969799;font-size: 14px;">暂无附件
      </p>
      <van-cell v-for="item in attachDirItems[0].children" :key="item.mlid" center is-link
        @click="_previewPDF(item.mlid)">
        <template #title>
          <span>{{item.mlmc}}</span>
        </template>
      </van-cell>
    </van-cell-group>
    <van-collapse v-else v-model="activeNames" :border="false">
      <van-collapse-item v-for="item in fileList" :key="item.mlid" :title="item.mlmc" :name="item.mlid">
        <p v-if="item.children.length == 0" style="text-align:center;padding: 16px 0;">暂无附件</p>
        <van-cell v-for="ele in item.children" :key="ele.mlid" center is-link @click="_previewPDF(ele.mlid)">
          <template #title>
            <span>{{ele.mlmc}}</span>
          </template>
        </van-cell>
      </van-collapse-item>
    </van-collapse>
  </section>
</template>
<script>
export default {
  name: 'affair-detail-file',
  props: {
    title: String,
    context: Object,
    attachDirItems: Array
  },
  data () {
    return {
      activeNames: []
    }
  },
  computed: {
    onlyFile () {
      return this.attachDirItems && this.attachDirItems.length == 1
    },
    fileList () {
      return this.$tools.composeTreeData(this.attachDirItems, { id: 'mlid', pid: 'fmlid' })
    }
  },
  mounted () {
    this.initBus()
  },
  methods: {
    initBus () {
      console.log('initbus file')
      this.$bus.$on('beforeSubmit', 'affair-detail-file', () => {
        console.log('initbus file invoke...')
        let canSubmit = true
        this.$store.commit('SET_BEFORE_SUBMIT_STATUS', canSubmit)
      })
    },
    _previewPDF (id) {
      this.$router.push({ name: 'PdfPreview', query: { id: id } })
    },
    valid () {
      let canSubmit = true
      return new Promise((resolve, reject) => { resolve(canSubmit) })
    },
    submitData () {
      return new Promise((resolve, reject) => { resolve('file') })
    },
    submit () {
      return new Promise((resolve, reject) => { resolve('file') })
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
<style lang="less">
.affair-detail-card {
  .van-collapse-item__content {
    padding: 0 0 0 16px;
  }
}
</style>