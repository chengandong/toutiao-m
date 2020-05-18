<template>
  <div class="search-history">
    <van-cell title="搜素历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('update-histories', [])">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon
        v-else
        name="delete"
        @click="isDeleteShow = true"
      />
    </van-cell>
    <van-cell
      :title="history"
      v-for="(history, index) in searchHistories"
      :key="index"
      @click="onDelete(history, index)"
    >
      <van-icon
        v-show="isDeleteShow"
        name="close"
      />
    </van-cell>
  </div>
</template>

<script>
// import { setItem } from '@/utils/storage'
export default {
  name: 'SearchHistory',
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false // 删除的显示状态
    }
  },
  methods: {
    onDelete (history, index) {
      // 判断是否为删除状态
      if (this.isDeleteShow) {
        // 删除状态
        this.searchHistories.splice(index, 1)
        // 数据持久化
        // setItem('search-histories', this.searchHistories)
        return
      }
      // 非删除状态,展示搜索历史记录
      this.$emit('search', history)
    }
  }
}
</script>

<style scoped lang="less">
</style>
