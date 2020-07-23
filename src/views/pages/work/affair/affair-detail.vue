<!--
 * @Description: 文件描述
 * @Author: miiky_yang
 * @Date: 2020-07-07 15:42:47
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-23 10:33:47
--> 
<template>
  <div class="affair-detail">
    <div class="affair-detail-header" :style="{top: offsetTop}"></div>
    <div class="affair-detail-title" ref="affairDetailTitle" :style="{top: offsetTop}">
      {{title}}</div>
    <section class="affair-detail-content" :style="{paddingTop: titleHeight}">
      <template v-for="item in menuItems">
        <component :ref="'component'+item.kid" :key="item.kid" :is="item.component"
          :title="item.bdmc" :context="context" :attachDirItems="attachDirItems"></component>
      </template>
    </section>
    <section class="affair-detail-footer">
      <buttons :context="context"></buttons>
    </section>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { Notify } from 'vant'
import Buttons from './commons/buttons'

export default {
  name: 'affair-detail',
  components: {
    Buttons
  },
  data () {
    return {
      loaded: false,
      newMessage: '',
      titleHeight: '39px',

      menuItems: [],
      context: null,
      attachDirItems: null,
    }
  },
  computed: {
    ...mapGetters(['isWx']),
    offsetTop () {
      return this.isWx ? '0' : '46px'
    },
    title () {
      this.$nextTick(() => {
        console.log('scrollHeight=>', this.$refs.affairDetailTitle.scrollHeight)
        this.titleHeight = this.$refs.affairDetailTitle.scrollHeight + 'px'
      })
      return this.context ? this.context.oasjd.ywmc : ''
    }
  },
  created () {
    this.getFormDataForSmallMobile()
  },
  methods: {
    getFormDataForSmallMobile () {
      this.$tools.loading('获取表单信息中...')
      let query = this.$route.query
      this.$net.business.getFormDataForSmallMobile(query).then(res => {
        this.$store.commit('SET_CONTEXT', res.data.context)
        this.context = res.data.context
        this.attachDirItems = res.data.attachDirItems
        res.data.menuItems.forEach(item => {
          item.component = () => ({
            component: import(`@/views${item.bdlj}`)
          })
        })
        this.menuItems = res.data.menuItems
        this.$tools.clearLoading()
        // 在下一栈中处理后续操作需要的Promise数据
        this.$nextTick(() => {
          setTimeout(() => {
            this.setPromise()
            // 等待异步组件加载完毕、异步组件默认加载延时200毫秒
          }, 200 * this.menuItems.length);
        })

      })
    },
    setPromise () {
      // 封装表单检测事件集合、提交前置数据集合、提交事件集合
      let validPromise = [], submitPromise = [], submitDataPromise = []
      this.menuItems.forEach(item => {
        let pro = this.$refs['component' + item.kid]
        console.log('pro', pro)
        if (pro && pro[0].valid) {
          validPromise.push(pro[0].valid)
        }
        if (pro && pro[0].submit) {
          submitPromise.push(pro[0].submit)
        }
        if (pro && pro[0].submitData) {
          submitDataPromise.push(pro[0].submitData)
        }
      })
      let payload = {
        validPromise: validPromise,
        submitPromise: submitPromise,
        submitDataPromise: submitDataPromise
      }
      this.$store.commit('SET_PROMISE', payload)
    }
  }
}
</script>
<style lang="less">
.affair-detail {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: scroll;
  &-header {
    position: fixed;
    top: 0;
    left: 0;
    height: 150px;
    width: 100%;
    background-color: @wx-title-background;
  }
  &-title {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 30;
    width: 100%;
    background-color: @wx-title-background;
    color: white;
    line-height: 1.2;
    min-height: 39px;
    font-size: 16px;
    padding: 10px 20px;
    box-shadow: 0px 2px 3px @wx-title-background;
  }
  .affair-detail-content {
    padding-bottom: 60px;
  }
  &-footer {
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 40px;
    background-color: @wx-title-background;
    z-index: 50;
  }
}
</style>