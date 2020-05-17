<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(suggestion, index) in suggestions"
      :key="index"
      icon="search"
    >
      <div slot="title" v-html="highlight(suggestion)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'
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
      // 防抖处理
      handler: debounce(async function () {
        const { data } = await getSearchSuggestions(this.searchValue)
        this.suggestions = data.data.options
      }, 300),
      immediate: true // 该回调将会在侦听开始之后被立即调用
    }
  },
  methods: {
    // 使 搜索的 文字高亮显示
    highlight (suggestion) {
      return suggestion.replace(
        new RegExp(this.searchValue, 'gi'),
        `<span style="color: red">${this.searchValue}</span>`
      )
    }
  }
}
</script>

<style>

</style>
