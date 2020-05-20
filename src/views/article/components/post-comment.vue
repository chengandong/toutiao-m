<template>
  <div class="post-comment">
    <van-field
      class="comment-text"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入评论内容"
      show-word-limit
    />
    <van-button
      class="publish-btn"
      plain
      type="primary"
      size="small"
      :disabled="!message"
      @click="onPost"
    >发布</van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  name: 'PostComment',
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    },
    // 如果 发布评论回复,需要文章Id
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  data () {
    return {
      message: '' // 当前输入的值
    }
  },
  methods: {
    // 发布评论
    async onPost () {
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true // 禁用背景点击
      })
      const { data } = await addComment({
        target: this.target.toString(), // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
        content: this.message, // 评论内容
        art_id: this.articleId ? this.articleId.toString() : null
        // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
      })
      // 组件传值
      this.$emit('post-success', data.data.new_obj)
      // 成功提示
      this.$toast.success('发布成功')
      // 清空 文本框内容
      this.message = ''
    }
  }
}
</script>

<style scoped lang="less">
.post-comment {
  display: flex;
  align-items: center;
  padding: 14px;
  .comment-text {
    background-color: #f5f7f9;
  }
  .publish-btn {
    margin-left: 10px;
  }
}
</style>
