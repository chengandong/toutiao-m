<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <div>啦啦啦</div>
    <van-nav-bar
      class="app-nav-bar"
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 文章信息 -->
    <div class="article-wrap">
      <!-- 作者信息 -->
      <h1 class="art-title">{{article.title}}</h1>
      <van-cell :border="false" center class="art-author">
        <div slot="title" class="author-name">{{article.aut_name}}</div>
        <div slot="label" class="art-pubdate">{{article.pubdate | relativeTime}}</div>
        <van-image
          class="author-avatar"
          slot="icon"
          fit="cover"
          round
          :src="article.aut_photo"
        />
        <van-button
          class="follow-btn"
          :class="{active:article.is_followed}"
          slot="right-icon"
          :type="article.is_followed ? 'default' : 'info'"
          :icon="article.is_followed ? '' : 'plus'"
          :loading="isFollowLoading"
          round
          @click="onFollow"
        >{{article.is_followed ? '已关注' : '关注'}}
        </van-button>
      </van-cell>
      <!-- 文章内容 -->
      <div
        class="markdown-body"
        v-html="article.content"
        ref="article-content"
      >
      </div>
      <van-divider class="art-end">文章内容结束</van-divider>
      <!-- 文章评论列表 -->
      <comment-list
        :source="articleId"
        :commentList="commentList"
        @comment-totalCount="commentTotalCount = $event"
        @reply-click="onReplyClick"
      />
    </div>
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
      <van-icon
         :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
         :color="article.attitude === 1 ? 'hotpink' : '#777'"
         @click="onLike"
       />
      <van-icon
        name="comment-o"
        :info="commentTotalCount"
       />
       <van-icon
         :color="article.is_collected ? 'orange' : '#777'"
         :name="article.is_collected ? 'star' : 'star-o'"
         @click="onCollect"
       />
       <van-icon name="share" color="#777777"></van-icon>
    </div>

    <!-- 写评论 -->
    <van-popup
      v-model="isPostShow"
      position="bottom"
    >
      <!-- 子组件 -->
      <post-comment
        :target="articleId"
        @post-success="onPostSuccess"
      />
    </van-popup>

    <!-- 评论的回复 -->
    <van-popup
      v-model="isReplyShow"
      position="bottom"
    >
      <comment-reply
        v-if="isReplyShow"
        :comment="replyComment"
        :article-id="articleId"
        @close="isReplyShow = false"
      />
    </van-popup>
  </div>
</template>

<script>
import './github-markdown.css'
import {
  getArticle,
  addCollect,
  deleteCollect,
  addLike,
  deleteLike
} from '@/api/article'
import { ImagePreview } from 'vant'
import { addFollow, deleteFollow } from '@/api/user'
import CommentList from './components/comment-list'
import PostComment from './components/post-comment'
import CommentReply from './components/comment-reply'
export default {
  name: 'ArticleIndex',
  components: {
    CommentList,
    PostComment,
    CommentReply
  },
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      article: {}, // 文章数据
      isFollowLoading: false, // 是否显示为加载状态
      isPostShow: false, // 是否显示弹出层
      commentList: [], // 文章评论列表
      commentTotalCount: 0, // 评论总数
      isReplyShow: false, // 是否显示弹出层
      replyComment: {} // 当前评论回复数据
    }
  },
  created () {
    this.loadArticle()
  },
  methods: {
    async loadArticle () {
      const { data } = await getArticle(this.articleId)
      this.article = data.data
      // 数据修改后 立即更新DOM
      this.$nextTick(() => {
        this.handlePerviewImage()
      })
    },
    // 点击 预览图片
    handlePerviewImage () {
      // 获取文章内容DOM 元素
      const articleContent = this.$refs['article-content']
      // 获取所有 img图片
      const imgs = articleContent.querySelectorAll('img')

      // 定义 图片 路径
      const imgPaths = []

      // 循环遍历 img
      imgs.forEach((img, index) => {
        imgPaths.push(img.src)
        // 为每一张 图片注册点击事件
        img.onclick = function () {
          ImagePreview({
            images: imgPaths, // 需要预览的图片 URL 数组
            startPosition: index // 图片预览起始位置索引
          })
        }
      })
    },
    // 关注用户
    async onFollow () {
      // 开启loading
      this.isFollowLoading = true
      // 判断 用户是否被关注
      if (this.article.is_followed) {
        // 已关注,取消关注
        await deleteFollow(this.article.aut_id)
      } else {
        // 未关注,添加关注
        await addFollow(this.article.aut_id)
      }
      this.article.is_followed = !this.article.is_followed
      // 关闭 loading
      this.isFollowLoading = false
      this.$toast.success(`${this.article.is_followed ? '关注成功' : '取消关注'}`)
    },
    // 收藏文章
    async onCollect () {
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true // 禁用背景点击
      })
      // 判断当前 文章收藏状态
      if (this.article.is_collected) {
        // 已收藏,取消收藏
        await deleteCollect(this.articleId)
      } else {
        // 未收藏,添加收藏
        await addCollect(this.articleId)
      }
      // 改变视图
      this.article.is_collected = !this.article.is_collected
      // Toast 提示
      this.$toast.success(`${this.article.is_collected ? '收藏成功' : '取消收藏'}`)
    },
    // 对文章点赞
    async onLike () {
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true // 禁用背景点击
      })
      if (this.article.attitude === 1) {
        // 已点赞, 取消点赞
        await deleteLike(this.articleId)
        // 更改视图
        this.article.attitude = -1
      } else {
        // 为点赞, 点赞
        await addLike(this.articleId)
        // 更改视图
        this.article.attitude = 1
      }
      // Toast 提示
      this.$toast.success(`${this.article.attitude === 1 ? '点赞成功' : '取消点赞'}`)
    },
    onPostSuccess (comment) {
      // 把 发布评论的数据放到评论列表数据顶部
      this.commentList.unshift(comment)

      // 更新评论的总数量
      this.commentTotalCount++
      // 关闭 写评论 弹出层
      this.isPostShow = false
    },
    onReplyClick (comment) {
      // 展示 评论回复 内容
      this.isReplyShow = true
      this.replyComment = comment
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  .article-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 44px;
    overflow-y: auto;
  }
  .art-title {
    font-size: 20px;
    color: #3a3a3a;
    padding: 24px 20px 18px;
    margin: 0;
    background-color: #fff;
  }
  .art-author {
    .author-avatar {
      width: 36px;
      height: 36px;
      margin-right: 8px;
    }
    .author-name {
      font-size: 14px;
      color: #333;
    }
    .art-pubdate {
      font-size: 12px;
      color: #b7b7b7;
    }
    .follow-btn {
      width: 85px;
      height: 29px;
      .van-icon-plus {
        font-size: 15px;
      }
    }
    .follow-btn.active {
      color: #fff;
      background-color: #f85959;
    }
  }
  .markdown-body {
    padding: 14px;
    padding-bottom: 20px;
    background-color: #fff;
  }
  .art-end {
    background-color: #fff;
    margin: 0;
    padding-bottom: 16px;
  }
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
    .van-icon {
      font-size: 20px;
      .van-info {
        font-size: 12px;
        background-color: #e22829;
      }
    }
  }
}
</style>
