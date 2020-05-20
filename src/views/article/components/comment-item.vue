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
          <div class="like-wrap">
            <van-icon class="like-icon" name="good-job-o" />
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
          >回复{{comment.reply_count}}</van-button>
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      required: true
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
