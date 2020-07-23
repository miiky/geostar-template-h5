<!--
 * @Description: 文件描述
 * @Author: miiky_yang
 * @Date: 2020-07-09 10:57:07
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-23 10:25:48
--> 
<template>
  <div class="login-page">
    <div class="login-page-top">
      <van-image class="logo" width="100" :src="require('_a/logo.png')" />
      <p class="title">自然资源政务服务系统</p>
      <p class="subtitle">Natural Resources Government Service System</p>
    </div>
    <van-form @submit="onSubmit" class="login-page-form">
      <van-field v-model="username" name="username" placeholder="用户名" size="large">
        <template #left-icon>
          <van-icon class="form-icon" name="manager" />
        </template>
      </van-field>
      <van-field v-model="password" type="password" name="password" placeholder="密码" size="large">
        <template #left-icon>
          <van-icon class="form-icon" name="lock" />
        </template>
      </van-field>
      <div style="margin:30px 16px 16px 16px;">
        <van-button round block color="#4277bd" native-type="submit" :loading="loading" loading-text="登录中...">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: 'yangchunyuan',
      password: '',
      loading: false,
    }
  },
  mounted () {
  },
  methods: {
    onSubmit (values) {
      this.loading = true
      this.$net.app.login(values).then(result => {
        console.log('login=>', result)
        this.$store.dispatch('setLoginInfo', {
          token: result.token,
          userId: result.id,
          username: result.name
        })
        this.$router.push({ name: 'HomePage' })
        this.loading = false
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
  }
}
</script>
<style lang="less" scoped>
.login-page {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: white;
  &-top {
    background-color: @wx-title-background;
    text-align: center;
    padding: 50px 0;
    .title {
      margin-top: 10px;
      font-size: 20px;
      color: white;
    }
    .subtitle {
      margin-top: 10px;
      font-size: 16px;
      color: white;
    }
  }
  &-form {
    margin-top: 30px;
    .form-icon {
      margin-right: 10px;
    }
  }
}
</style>
