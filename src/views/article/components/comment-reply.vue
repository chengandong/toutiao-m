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
      :isReplyBtnShow="false"
    />
    <van-cell :title="`${comment.aut_name}  的评论回复`" />
    <!-- 分割线 -->
    <van-divider>已展示所有评论</van-divider>
    <comment-list
      :source="comment.com_id"
      type="c"
      :commentList="commentList"
    />

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
      >
        写评论
      </van-button>
    </div>

    <!-- 发布回复 -->
    <van-popup
      v-model="isPostShow"
      position="bottom"
    >
      <!-- 子组件 -->
      <post-comment
        :target="comment.com_id"
        :article-id="articleId"
        @post-success="onPostSuccess"
      />
    </van-popup>
  </div>
</template>

<script>
import CommentItem from './comment-item'
import CommentList from './comment-list'
import PostComment from './post-comment'
export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentList,
    PostComment
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      isPostShow: false,
      commentList: []
    }
  },
  methods: {
    onPostSuccess (comment) {
      // 把 发布评论的数据放到评论列表数据顶部
      this.commentList.unshift(comment)

      // 更新评论的总数量
      this.comment.reply_count++
      // 关闭 写评论 弹出层
      this.isPostShow = false
    }
  }
}
</script>
<style scoped lang="less">
.article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 140px;
      height: 23px;
      line-height: 23px;
      border: 1px solid #eeeeee;
      color: #a7a7a7;
      font-size: 14px;
    }
}
</style>
