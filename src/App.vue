<template>
  <div id="app">
    <h1>头条</h1>
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <div class="box"></div>
    <i class="toutiao toutiao-shipin"></i>
    <i class="toutiao toutiao-wuwangluo"></i>
    <van-button icon-prefix="toutiao" icon="wode" type="primary">按钮</van-button>
    <!-- 路由出口 -->
    <router-view/>
  </div>
</template>

<style lang="less">
.box {
  width: 200px;
  height: 200px;
  background-color: pink;
}
</style>
