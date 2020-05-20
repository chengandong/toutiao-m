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
    <van-cell :title="`${comment.aut_name}  的评论回复`" />
    <!-- 分割线 -->
    <van-divider>已展示所有评论</van-divider>
    <comment-list
      :source="comment.com_id"
      type="c"
    />
  </div>
</template>

<script>
import CommentItem from './comment-item'
import CommentList from './comment-list'
export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentList
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
