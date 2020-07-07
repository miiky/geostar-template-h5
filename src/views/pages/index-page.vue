<!--
 * @Description: 文件描述
 * @Author: miiky_yang
 * @Date: 2020-06-22 10:52:43
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-07 17:33:55
--> 
<template>
  <div class="index-page">
    <geo-header v-show="needHeader" :currentTitleText="currentTitleText"></geo-header>
    <div class="index-viewer" :style="{top: offsetTop}">
      <router-view></router-view>
    </div>
    <geo-tabbar v-show="needTabbar"></geo-tabbar>
  </div>
</template>
<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'

import GeoHeader from '_v/commons/home/geo-header'
import GeoTabbar from '_v/commons/home/geo-tabbar'

export default {
  name: "Index",
  components: {
    GeoHeader, GeoTabbar
  },
  data () {
    return {
      currentTab: 'home'
    }
  },
  computed: {
    ...mapGetters(['currentTitleText', 'needTabbar', 'needHeader', 'isWx']),
    offsetTop () {
      return this.isWx ? '0' : '46px'
    }
  },
  mounted () {
  }
};
</script>
<style lang="less" scoped>
.index-viewer {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  // // overflow: scroll;
  -webkit-overflow-scrolling: touch;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
