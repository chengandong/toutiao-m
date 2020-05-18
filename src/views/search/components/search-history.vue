<template>
  <div class="search-history">
    <van-cell title="搜素历史">
      <div>
        <span>全部删除</span>
        &nbsp;&nbsp;
        <span>完成</span>
      </div>
      <!-- <van-icon name="delete" /> -->
    </van-cell>
    <van-cell
      :title="historie"
      v-for="(historie, index) in searchHistories"
      :key="index"
    >
      <van-icon name="close" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
</style>
