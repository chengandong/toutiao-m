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
      <van-tab
        v-for="channel in channels"
        :key="channel.id"
        :title="channel.name"
      >
        <!-- 文章列表 数据 -->
        <article-list :channel="channel" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0,
      channels: [] // 文章频道
    }
  },
  components: {
    ArticleList
  },
  created () {
    this.loadChannels()
  },
  methods: {
    // 获取用户频道列表
    async loadChannels () {
      const { data } = await getUserChannels()
      this.channels = data.data.channels
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
