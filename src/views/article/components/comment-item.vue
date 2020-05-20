<template>
  <div class="comment-item">
    <van-cell>
      <van-image
        class="avatar"
        slot="icon"
        round
        fit="cover"
        :src="comment.aut_photo"
      />
      <div slot="title">
        <div class="author-info">
          <div class="author-name">{{comment.aut_name}}</div>
          <div class="like-wrap" @click="onCommentLike">
            <van-icon
              class="like-icon"
              :class="{
                liked: comment.like_count !==0
              }"
              :name="comment.like_count !==0 ? 'good-job' : 'good-job-o'"
            />
            <span class="like-count">{{comment.like_count}}</span>
          </div>
        </div>
        <div class="content">{{comment.content}}</div>
        <div class="bottom-wrap">
          <span class="pubdate">{{comment.pubdate | datetime('MM-DD HH:mm')}}</span>
          <van-button
            class="reply-btn"
            round
            size="size"
            @click="$emit('reply-click', comment)"
            v-if="isReplyBtnShow"
          >回复{{comment.reply_count}}</van-button>
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
import { addCommentLike, deleteCommentLike } from '@/api/comment'
export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      required: true
    },
    // 回复 按钮显示状态
    isReplyBtnShow: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  },
  methods: {
    async onCommentLike () {
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true // 禁用背景点击
      })
      const commentID = this.comment.com_id.toString()
      if (this.comment.is_liking) {
        // 已点赞, 取消点赞
        await deleteCommentLike(commentID)
        this.comment.like_count--
      } else {
        // 未点赞, 点赞
        await addCommentLike(commentID)
        this.comment.like_count++
      }
      // 更新视图
      this.comment.is_liking = !this.comment.is_liking
      // Toast 提示
      this.$toast.success(`${this.comment.is_liking ? '点赞成功' : '取消点赞'}`)
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 36px;
    height: 36px;
    margin-right: 13px;
  }
  .author-info {
    display: flex;
    justify-content: space-between;
    .author-name {
      font-size: 14px;
      color: #45699c ;
    }
    .like-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      .like-icon {
        font-size: 16px;
        margin-right: 3px;
      }
      .like-icon.liked {
        color: pink;
      }
      .like-count {
        font-size: 14px;
        margin-top: 1px;
      }
    }
  }
  .content {
    font-size: 16px;
    color: #222222;
    margin-top: 12px;
  }
  .bottom-wrap {
    margin-top: 10px;
    .pubdate {
      font-size: 12px;
      margin-right: 12px;
    }
    .reply-btn {
      width: 68px;
      height: 24px;
      background-color: #f4f5f6;
      color: #222222;
      font-size: 12px;
    }
  }
}
</style>
