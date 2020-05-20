<template>
  <div class="post-comment">
    <van-field
      class="comment-text"
      v-model="message"
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
    >发布</van-button>
  </div>
</template>

<script>
export default {
  name: 'PostComment',
  data () {
    return {
      message: '' // 当前输入的值
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
