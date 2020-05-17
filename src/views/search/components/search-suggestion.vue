<template>
  <div class="search-suggestion">
    <van-cell title="vue" icon="search"></van-cell>
    <van-cell title="react" icon="search"></van-cell>
  </div>
</template>

<script>
import getSearchSuggestions from '@/api/search'
export default {
  name: 'SearchSuggestion',
  props: {
    searchValue: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: [] // 联想建议数据
    }
  },
  watch: {
    // 属性名: 监视数据名称
    // searchValue () {
    //   console.log(123)
    // }

    searchValue: {
      async handler () {
        const { data } = await getSearchSuggestions(this.searchValue)
        console.log(data)
      },
      immediate: true // 该回调将会在侦听开始之后被立即调用
    }
  }
}
</script>

<style>

</style>
