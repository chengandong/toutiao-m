<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isRefreshLoading"
      :success-text="SuccessText"
      :success-duration="1500"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell v-for="article in articles" :key="article.id" :title="article.title" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
export default {
  name: 'ArticleList',
  data () {
    return {
      articles: [], // 文章数据列表
      loading: false, // 加载中 的 loading状态
      finished: false, // 加载 结束的 状态
      timestamp: null, // 获取下一页数据 时间戳
      isRefreshLoading: false, // 是否处于加载中状态
      SuccessText: '' // 刷新成功提示文案
    }
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  methods: {
    async onLoad () {
      // 获取 文章 频道新闻
      const { data } = await getArticles({
        channel_id: this.channel.id, // 频道ID
        timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
      })

      // 解构对象
      const { results } = data.data
      // 把数据 放入 article 数组中
      this.articles.push(...results)

      // 加载状态结束
      this.loading = false

      // 判断 数据是否 全部加载完成
      if (results.length) {
        // 更新 时间戳 以便 获取下一页 数据
        this.timestamp = data.data.pre_timestamp
      } else {
        // 没有 数据 设置 结束状态
        this.finished = true
      }
    },

    // 下拉刷新时触发
    async onRefresh () {
      // 获取 文章 频道新闻
      const { data } = await getArticles({
        channel_id: this.channel.id, // 频道ID
        timestamp: Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
      })
      const { results } = data.data
      // 顶部 追加 数据
      this.articles.unshift(...results)
      // 关闭 刷新时的 loading状态
      this.isRefreshLoading = false
      // 设置 刷新成功时提示文案
      this.SuccessText = `更新了${results.length}条数据`
    }
  }
}
</script>

<style scoped lang="less">
.article-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 50px;
  overflow: auto;
}
</style>
