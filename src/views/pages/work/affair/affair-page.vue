<!--
 * @Description: 文件描述
 * @Author: miiky_yang
 * @Date: 2020-07-07 11:27:37
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-07 17:49:51
--> 
<template>
  <div class="affair-page">
    <van-search v-model="searchKey" show-action shape="round" background="#4277bd" placeholder="请输入搜索关键词">
      <template #action>
        <div class="search-btn" @click="_onSearch">搜索</div>
      </template>
    </van-search>
    <van-sticky :offset-top="offsetTop">
      <div class="affair-page-tab">
        <van-row type="flex" justify="center" align="center">
          <van-col span="8" v-for="item in tabList" :key="item.code">
            <div class="tab-item" :class="currentTab == item.code?'tab-item-active':''" @click="_changeTab(item.code)">
              <div class="geo-triangle"></div>
              <p>{{item.name}}</p>
            </div>
          </van-col>
        </van-row>
      </div>
    </van-sticky>
    <section class="affair-page-list">
      <van-pull-refresh ref="refreshPanel" v-model="refreshing" @refresh="_onRefresh">
        <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="_onLoad">
          <van-cell v-for="item in list" :key="item.id" :label="item.name" :value="item.time"
            :to="{name: 'AffairDetail', query: {id: item.id}}">
            <template #title>
              <div>{{item.title}}</div>
            </template>
          </van-cell>
        </van-list>
      </van-pull-refresh>
    </section>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      searchKey: '',
      tabList: [{ code: 'todo', name: '待办' }, { code: 'handle', name: '经办' }, { code: 'finish', name: '办结' }],
      currentTab: 'todo',
      loading: false,
      finished: false,
      refreshing: false,
      finishedText: '没有更多了',
      list: []
    }
  },
  computed: {
    ...mapGetters(['isWx']),
    offsetTop () {
      return this.isWx ? 0 : 46
    }
  },
  methods: {
    _onSearch () {
      this._onRefresh()
    },
    _changeTab (tab) {
      this.currentTab = tab
      this.list = []
      this._onRefresh()
    },
    _onRefresh () {
      this.finished = false
      this.loading = true
      this._onLoad()
    },
    _onLoad () {
      // 异步更新数据
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }
        for (let i = 0; i < 20; i++) {
          this.list.push({
            id: this.list.length + 1,
            title: '2020-07-07培训出差' + (this.list.length + 1) + '天',
            name: '袁慎明',
            time: '2020-07-06'
          });
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
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
  }
  .search-btn {
    color: white;
  }
}
</style>