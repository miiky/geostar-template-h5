<!--
 * @Description: 文件描述
 * @Author: miiky_yang
 * @Date: 2020-07-22 12:57:42
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-22 14:48:51
--> 
<template>
  <van-popup v-model="show" round position="bottom" duration="0.2">
    <div class="affair-detail-follow">
      <div class="card-title">
        <span class="cancel" @click="_cancel">取消</span>
        <span>收藏案件</span>
        <span class="submit" @click="_submit">确定</span>
      </div>

      <van-field v-model="newTagName" center clearable label="添加标签" placeholder="请输入标签名称">
        <template #button>
          <van-button size="small" type="primary" @click="_addNewTag">添加</van-button>
        </template>
      </van-field>
      <section class="tag-panel">
        <template v-for="item in tagList">
          <div class="tag-item" :class="item.checked?'checked':''" :key="item.kid" v-text="item.bqmc"
            @click="item.checked = !item.checked"></div>
        </template>
        <div></div>
      </section>
    </div>
  </van-popup>
</template>
<script>
export default {
  data () {
    return {
      show: false,
      newTagName: '',
      tagList: [],
    }
  },
  methods: {
    _show () {
      this.findBqmxAllByBqlx()
      this.show = true
    },
    _addNewTag () {
      if (this.newTagName == '') {
        this.$notify({ type: 'warning', message: '标签名称不能为空！' })
        return
      }
      let params = {
        bqmc: this.newTagName
      }
      this.$net.attention.saveBqmx(params).then(res => {
        if (res.code == 1) {
          res.data.checked = false
          this.tagList.push(res.data)
          this.newTagName = ''
          this.$notify({ type: 'success', message: '添加标签成功' })
        } else {
          this.$notify({ type: 'warning', message: res.msg })
        }
      })
    },
    findBqmxAllByBqlx () {
      let params = { bqlx: 'GW_GZBQ' }
      this.$net.attention.findBqmxAllByBqlx(params).then(res => {
        console.log('findBqmxAllByBqlx=>', res)
        res.data.forEach(tag => {
          tag.checked = false
          this.tagList.push(tag)
        })
      })
    },
    _cancel () {
      Object.assign(this.$data, this.$options.data())
      this.show = false
    },
    _submit () {
      let checkedTags = this.tagList.filter(tag => {
        return tag.checked == true
      })
      if (checkedTags.length == 0) {
        this.$notify({ type: 'warning', message: '请选择标签！' })
        return
      }
      let tagNames = []
      checkedTags.forEach(tag => {
        tagNames.push(tag.bqmc)
      })
      this.$emit('on-submit', tagNames)
      this._cancel()
    }
  }
}
</script>
<style lang="less" scoped>
.affair-detail-follow {
  padding: 10px 0 50px 0;
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
  .tag-panel {
    text-align: left;
    padding: 15px;
    .tag-item {
      display: inline-block;
      color: #666666;
      font-size: 12px;
      line-height: 1;
      padding: 8px;
      margin-right: 5px;
      background-color: #f8f8f9;
      border: 1px solid #dcdee2;
      border-radius: 3px;
    }
    .checked {
      border-color: @wx-title-background;
      background-color: @wx-title-background;
      color: white;
    }
  }
}
</style>