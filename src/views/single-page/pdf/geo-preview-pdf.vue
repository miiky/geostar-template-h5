<template>
  <div class="geo-preview-pdf">
    <div class="header">
      <van-icon class="btn-back" name="arrow-left" size="20" @click="_back" />
      <span v-if="!vertical">{{'共 '+pageTotalNum+' 页'}}</span>
      <span v-else>
        <span class="header-btn btn-pre" @click.stop="prePage">上一页</span>
        <span class="header-page">{{pageNum+' / '+pageTotalNum}}</span>
        <span class="header-btn btn-next" @click.stop="nextPage">下一页</span>
      </span>
      <van-icon class="btn-vertical" name="apps-o" size="20" @click="vertical = !vertical" />
    </div>
    <section v-if="vertical">
      <van-swipe ref="pdfSwiper" :show-indicators="false" @change="_onChange">
        <van-swipe-item class="pdf-content">
          <pdf ref="pdf1" :src="pdfUrl" :page="1" :rotate="pageRotate" @progress="loadedRatio = $event"
            @page-loaded="pageLoaded($event)" @num-pages="pageTotalNum=$event" @error="pdfError($event)">
          </pdf>
        </van-swipe-item>
        <template v-for="item in pageTotalNum">
          <van-swipe-item v-if="item > 1" :key="item" class="pdf-content">
            <pdf :ref="'pdf'+item" :src="pdfUrl" :page="item"></pdf>
          </van-swipe-item>
        </template>
      </van-swipe>
    </section>
    <section v-else>
      <div class="pdf-content">
        <pdf ref="pdf1" :src="pdfUrl" :page="1" :rotate="pageRotate" @progress="loadedRatio = $event"
          @page-loaded="pageLoaded($event)" @num-pages="pageTotalNum=$event" @error="pdfError($event)">
        </pdf>
      </div>
      <template v-for="item in pageTotalNum">
        <div v-if="item > 1" :key="item" class="pdf-content">
          <pdf :ref="'pdf'+item" :src="pdfUrl" :page="item"></pdf>
        </div>
      </template>
    </section>
  </div>
</template>
<script>
import pdf from 'vue-pdf'
export default {
  name: 'Pdf',
  components: {
    pdf
  },
  data () {
    return {
      vertical: false,
      pdfUrl: "http://file.dakawengu.com/file/2018-05-29/20180527-tianfeng.pdf",
      pageNum: 1,
      pageTotalNum: 1,
      pageRotate: 0,
      // 加载进度
      loadedRatio: 0,
      curPageNum: 0,
    }
  },
  methods: {
    _back () {
      this.$router.go(-1)
    },
    prePage () {
      let p = this.pageNum
      p = p > 1 ? p - 1 : this.pageTotalNum
      this.pageNum = p
      this.$refs.pdfSwiper.prev()
    },
    nextPage () {
      let p = this.pageNum
      p = p < this.pageTotalNum ? p + 1 : 1
      this.pageNum = p
      this.$refs.pdfSwiper.next()
    },
    password (updatePassword, reason) {
      updatePassword(prompt('password is "123456"'))
      console.log('...reason...')
      console.log(reason)
      console.log('...reason...')
    },
    pageLoaded (e) {
      this.curPageNum = e
    },
    pdfError (error) {
      // console.error(error)
    },
    _onChange (index) {
      console.log(index)
      this.pageNum = index + 1
    }
  }
}
</script>
<style lang="less" scoped>
.geo-preview-pdf {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #828689;
  overflow: scroll;
  padding-top: 46px;
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 46px;
    background-color: #505457;
    color: white;
    line-height: 46px;
    text-align: center;
    z-index: 1;
    .header-page {
      padding: 0 10px;
    }
    .btn-back {
      float: left;
      height: 46px;
      line-height: 46px;
      margin-left: 15px;
    }
    .btn-vertical {
      float: right;
      height: 46px;
      line-height: 46px;
      margin-right: 15px;
    }
  }
  .pdf-content {
    padding: 10px;
  }
}
</style>