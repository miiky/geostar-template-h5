<!--
 * @Description: 文件描述
 * @Author: miiky_yang
 * @Date: 2020-06-22 10:52:43
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-06 10:50:02
--> 
<template>
  <div class="home">
    <img alt="Vue logo" :src="require('_a/logo.png')" />
    <HelloWorld msg="Welcome to Geotar Vue template H5 App" />
  </div>
</template>
<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  }
};
</script>
<style lang="less" scoped>
.home {
  text-align: center;
  img {
    width: 50%;
  }
}
</style>
