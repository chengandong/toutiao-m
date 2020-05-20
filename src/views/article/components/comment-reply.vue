<template>
  <div class="comment-reply">
    <!-- 导航头部 -->
    <van-nav-bar
      :title="`${comment.reply_count}条回复`"
    >
      <van-icon
        slot="left"
        name="cross"
        @click="$emit('close')"
      />
    </van-nav-bar>

    <!-- 当前 评论项 -->
    <comment-item
      :comment="comment"
    />
  </div>
</template>

<script>
import CommentItem from './comment-item'
export default {
  name: 'CommentReply',
  components: {
    CommentItem
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="less">

</style>
