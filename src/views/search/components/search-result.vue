<template>
  <div class="search-result">
    <van-list
      v-model="artLoading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoadArticle"
    >
      <van-cell
        v-for="(article, index) in articlelist"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api/search'
export default {
  name: 'SearchResult',
  props: {
    searchValue: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      articlelist: [],
      artLoading: false,
      finished: false,
      page: 1, // 页数
      perPage: 10 // 每页数量
    }
  },
  methods: {
    async onLoadArticle () {
      // 异步更新数据
      const { data } = await getSearchResults({
        page: this.page, // 页数
        per_page: this.perPage, // 每页数量
        q: this.searchValue // 搜索关键词
      })

      // 将数据 放到列表中
      const { results } = data.data
      this.articlelist.push(...results)
      // 关闭 loading
      this.artLoading = false

      // 判断是否 还有数据
      if (results.length) {
        // 如果有,获取下一页数据
        this.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style>
.search-result {
  position: fixed;
  left: 0;
  right: 0;
  top: 54px;
  bottom: 0;
  overflow-y: auto;
}
</style>
