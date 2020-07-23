<!--
 * @Description: 文件描述
 * @Author: miiky_yang
 * @Date: 2020-07-16 11:57:06
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-23 11:12:24
--> 
<template>
  <div>
    <div @click="_handleFollow"><span v-show="isFollow">取消</span>关注</div>
    <affair-detail-follow-popup ref="AffairDetailFollowPopup" @on-submit="follow">
    </affair-detail-follow-popup>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import AffairDetailFollowPopup from '../popups/affair-detail-follow-popup'

export default {
  name: 'button-follow',
  components: {
    AffairDetailFollowPopup
  },
  data () {
    return {
      isFollow: false
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'context'])
  },
  mounted () {
    if (this.context) {
      this.isFollow = this.context.isFollow == 1
    }
  },
  methods: {
    ...mapActions(['changeFollowState']),
    _handleFollow () {
      if (this.isFollow) {
        this.cancleFollow()
      } else {
        this.$refs.AffairDetailFollowPopup._show()
      }
    },
    cancleFollow () {
      let params = {
        processinstid: this.context.processInstID,
        ywid: this.context.ywid,
        ywlx: this.context.ywlx
      }
      this.$net.attention.updateAttenState(params).then(res => {
        console.log('updateAttenState=>', res)
        if (res.code == 1) {
          this.$notify({ type: 'success', message: '取消关注成功！' })
          this.isFollow = false
          this.changeFollowState(this.isFollow)
        }
      })
    },
    follow (e) {
      let params = {
        gzbq: e.join(','),
        ywid: this.context.ywid,
        ywlx: this.context.ywlx,
        processinstid: this.context.processInstID,
        yhmc: this.currentUser.employeeName
      }
      this.$net.attention.addUserAttention(params).then(res => {
        console.log('addUserAttention=>', res)
        if (res.code == 1) {
          this.$notify({ type: 'success', message: '关注成功！' })
          this.isFollow = true
          this.changeFollowState(this.isFollow)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>