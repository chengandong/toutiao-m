<template>
  <div class="search-container">
    <!-- 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮 -->
    <form action="/">
      <van-search
        v-model="searchValue"
        placeholder="请输入搜索关键词"
        show-action
        background="#3296fa"
        @search="onSearch(searchValue)"
        @cancel="$router.back()"
        @focus="isResultShow = false"
      />
    </form>

    <!-- 搜索结果 -->
    <SearchResult
      v-if="isResultShow"
      :search-value="searchValue"
    />

    <!-- 联想建议 -->
    <SearchSuggestion
      v-else-if="searchValue"
      :search-value="searchValue"
      @search="onSearch"
    />

    <!-- 搜素历史 -->
    <SearchHistory
      v-else
      :search-histories="searchHistories"
    />
  </div>
</template>

<script>
import SearchSuggestion from './components/search-suggestion'
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
import {
  setItem,
  getItem
} from '@/utils/storage'
import { mapState } from 'vuex'
import { getSearchHistories } from '@/api/search'
export default {
  name: 'SearchIndex',
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResult
  },
  data () {
    return {
      searchValue: '', // 搜索框中的关键字
      isResultShow: false, // 搜索结果状态是否显示
      searchHistories: [] // 搜素历史记录
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.loadSearchHistories()
  },
  methods: {
    onSearch (searchValue) {
      // 将搜索框中值设置为 你点击搜素的值
      this.searchValue = searchValue
      // 检测索引
      const index = this.searchHistories.indexOf(this.searchValue)
      // 判断
      if (index !== -1) {
        // 把重复项 删除
        this.searchHistories.splice(index, 1)
      }
      // 把新的搜素记录 放入搜素历史记录 顶部
      this.searchHistories.unshift(this.searchValue)

      // 将搜素历史 记录保存到 本地
      setItem('search-histories', this.searchHistories)
      // 显示 搜素结果
      this.isResultShow = true
    },
    async loadSearchHistories () {
      let searchHistories = getItem('search-histories') || []
      // 判断 用户是否登录
      if (this.user) {
        const { data } = await getSearchHistories()
        // 数组去重
        searchHistories = [...new Set([
          ...searchHistories,
          ...data.data.keywords
        ])]
      }
      this.searchHistories = searchHistories
    }
  }
}
</script>

<style scoped lang="less">
.search-container {
  .van-search__action {
    font-size: 14px;
    color: #fff;
  }
}

</style>
