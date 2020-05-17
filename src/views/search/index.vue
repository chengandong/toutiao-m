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
      />
    </form>
  </div>
</template>

<script>
export default {
  name: 'SearchIndex',
  data () {
    return {
      searchValue: ''
    }
  },
  methods: {
    onSearch (val) {
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
