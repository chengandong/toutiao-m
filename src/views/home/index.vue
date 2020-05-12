<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
    >
      <van-button
        class="search-btn"
        slot="title"
        round
        icon="search"
      >搜素</van-button>
    </van-nav-bar>
    <!-- 文章 频道列表 -->
    <van-tabs v-model="active">
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .van-nav-bar__title {
  max-width: none;
}
.search-btn {
  width: 277px;
  height: 32px;
  border: none;
  background: #5babfb;
  .van-icon {
    font-size: 16px;
  }
  .van-button__text {
    font-size: 14px;
    color: #fff;
  }
}
</style>
