<template>
  <div class="comment-list">
    <van-cell title="全部评论"></van-cell>
    <van-list
      v-model="isCommentLoading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- 文章评论项 子组件 -->
      <comment-item
        v-for="(comment, index) in commentList"
        :key="index"
        :comment="comment"
      />
      <!-- <van-cell v-for="(comment, index) in commentList" :key="index" :title="comment.content" /> -->
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item'
export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    // 源id，文章id或评论id
    source: {
      type: [Number, String, Object],
      required: true
    },
    commentList: {
      type: Array,
      // 数组、对象的 默认值必须通过函数
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      // commentList: [],
      isCommentLoading: false,
      finished: false,
      offset: null, // 获取下一页数据的页码
      limit: 10 // 每页数量
    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      // 获取评论
      const { data } = await getComments({
        type: 'a', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        source: this.source.toString(), // 源id，文章id或评论id
        offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        limit: this.limit// 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
      })
      // 解构对象
      const { results } = data.data
      // 将数据 放入评论列表中
      this.commentList.push(...results)
      // 关闭 加载状态
      this.isCommentLoading = false
      // 判断 是否还有数据
      if (results.length) {
        // 改变 页码,获取下一页数据
        this.offset = data.data.last_id
      } else {
        // 加载完成
        this.finished = true
      }
    }
  }
}
</script>

<style>

</style>
