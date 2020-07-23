<!--
 * @Description: 文件描述
 * @Author: miiky_yang
 * @Date: 2020-07-07 11:27:37
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-23 10:31:31
--> 
<template>
  <div class="affair-page">
    <van-search v-model="searchKey" show-action shape="round" background="#4277bd"
      placeholder="请输入搜索关键词">
      <template #action>
        <div class="search-btn" @click="_onSearch">搜索</div>
      </template>
    </van-search>
    <van-sticky :offset-top="offsetTop">
      <div class="affair-page-tab">
        <van-row type="flex" justify="center" align="center">
          <van-col span="8" v-for="item in tabList" :key="item.code">
            <div class="tab-item" :class="currentTab == item.code?'tab-item-active':''"
              @click="_changeTab(item.code)">
              <div class="geo-triangle"></div>
              <p>{{item.name}}</p>
            </div>
          </van-col>
        </van-row>
      </div>
    </van-sticky>
    <section class="affair-page-list">
      <van-pull-refresh ref="refreshPanel" v-model="refreshing" @refresh="_onRefresh">
        <van-list v-model="loading" :finished="finished" :finished-text="finishedText"
          @load="_onLoad">
          <van-cell v-for="item in list" :key="item.id" @click="_toDetail(item)">
            <template #title style="width: inherit;">
              <div class="item-title">
                <span v-if="item.rollback == 1" class="tag">【回退件】</span>
                <span class="title">{{item.bt}}</span>
              </div>
            </template>
            <template #label>
              <div><span>{{(item.blhj||item.gzbq)+'/'+item.ywlxmc}}</span><span
                  style="float:right;">{{item.xssj}}</span></div>
            </template>
          </van-cell>
        </van-list>
      </van-pull-refresh>
    </section>
    <van-empty v-show="isEmpty" :image="require('_a/images/empty-image-default.png')"
      description="暂无信息" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      searchKey: '',
      tabList: [],
      currentTab: '',
      loading: false,
      finished: false,
      refreshing: false,
      finishedText: '没有更多了',
      nomore: true,
      list: [],
      pageSize: 20,
      pageNum: 0,

      isEmpty: false
    }
  },
  computed: {
    ...mapGetters(['isWx']),
    offsetTop () {
      return this.isWx ? 0 : 46
    }
  },
  async created () {
    this.$tools.loading('加载中...')
    await this.getTabList()
    await this.getList()
    this.$tools.clearLoading()
  },
  methods: {

    async getTabList () {
      let params = {}
      await this.$net.business.getWorkCenterCaseItem(params).then(res => {
        this.tabList = res.data
        if (this.tabList && this.tabList.length > 0) {
          this.currentTab = this.tabList[0].code
        }
      })
    },
    async getList () {
      if (this.currentTab == '') {
        this.isEmpty = true
        return
      }
      let params = {
        typeCode: this.currentTab,
        keyword: this.searchKey,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }
      await this.$net.business.getCaseList(params).then(res => {
        // 异步更新数据
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }
        this.pageNum++
        if (this.pageNum != 0) {
          this.list = [...this.list, ...res.data.content]
        } else {
          this.list = res.data.content
        }
        this.loading = false
        this.finished = res.data.last
      })
    },
    _onSearch () {
      this.list = []
      this._onRefresh()
    },
    _changeTab (tab) {
      this.currentTab = tab
      this.list = []

      this._onRefresh()
    },
    _onRefresh () {
      this.pageNum = 0
      // this.finished = false
      this.loading = true
      this._onLoad()
    },
    async _onLoad () {
      if (this.currentTab == '') {
        this.loading = false;
        return
      }
      await this.getList()
    },
    async _toDetail (item) {
      let workItemID
      if (item.processInstID && this.currentTab == 'gzj') {
        let result = await this.$net.workflow.getCurrentWorkItem({ processInstID: item.processInstID })
        console.log('getCurrentWorkItem', result)
        workItemID = result.workItemID
      } else {
        workItemID = item.workItemID
      }
      let query = {
        ywid: item.ywid,
        ywlx: item.ywlx,
        processInstID: item.processInstID,
        workItemID: workItemID
      }
      this.$router.push({ name: 'AffairDetail', query: query })
    }
  }
}
</script>
<style lang="less" scoped>
.affair-page {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  &-tab {
    background-color: white;
    border-bottom: 1px solid @gray-3;
    .tab-item {
      text-align: center;
      color: #333333;
      font-size: 14px;
      padding-bottom: 10px;
      .geo-triangle {
        margin: 0 auto;
        width: 0;
        height: 10px;
        border: 10px solid;
        border-color: white transparent transparent transparent;
      }
      .geo-triangle-none {
        border-color: white;
      }
    }
    .tab-item-active {
      font-size: 15px;
      font-weight: 600;
      color: @wx-title-background;
      .geo-triangle {
        border-color: @wx-title-background transparent transparent transparent;
      }
    }
  }
  &-list {
    .item-title {
      overflow: hidden;
      white-space: nowrap;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
      .tag {
        color: #802618;
      }
      .title {
        color: #333333;
      }
    }
  }
  .search-btn {
    color: white;
  }
}
</style>
<style lang="less">
.affair-page {
  .van-cell__title {
    width: inherit;
  }
}
</style>