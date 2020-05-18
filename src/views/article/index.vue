<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />
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
        slot="right-icon"
        :type="article.is_followed ? 'default' : 'info'"
        :icon="article.is_followed ? '' : 'plus'"
        round
      >{{article.is_followed ? '已关注' : '关注'}}
      </van-button>
    </van-cell>
    <div class="markdown-body" v-html="article.content">
    </div>
  </div>
</template>

<script>
import './github-markdown.css'
import { getArticle } from '@/api/article'
export default {
  name: 'ArticleIndex',
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      article: {} // 文章数据
    }
  },
  created () {
    this.loadArticle()
  },
  methods: {
    async loadArticle () {
      const { data } = await getArticle(this.articleId)
      this.article = data.data
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
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
  }
  .markdown-body {
    padding: 14px;
    background-color: #fff;
  }
}
</style>
