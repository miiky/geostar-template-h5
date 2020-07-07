<!--
 * @Description: 文件描述
 * @Author: miiky_yang
 * @Date: 2020-06-22 10:52:43
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-07 17:27:37
--> 
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="less">
#app {
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
