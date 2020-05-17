<template>
  <div class="search-container">
    <!-- 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮 -->
    <form action="/">
      <van-search
        v-model="searchValue"
        placeholder="请输入搜索关键词"
        show-action
        background="#3296fa"
        @search="onSearch"
        @cancel="$router.back()"
        @focus="isResultShow = false"
      />
    </form>

    <!-- 搜索结果 -->
    <SearchResult
      v-if="isResultShow"
    />

    <!-- 联想建议 -->
    <SearchSuggestion
      v-else-if="searchValue"
    />

    <!-- 搜素历史 -->
    <SearchHistory
      v-else
    />
  </div>
</template>

<script>
import SearchSuggestion from './components/search-suggestion'
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
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
      isResultShow: false // 搜索结果状态是否显示
    }
  },
  methods: {
    onSearch () {
      // 显示 搜素结果
      this.isResultShow = true
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
