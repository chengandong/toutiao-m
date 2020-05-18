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
    <h1 class="art-title">好累的一天啊，生活好难啊</h1>
    <van-cell :border="false" center class="art-author">
      <div slot="title" class="author-name">笑傲江湖</div>
      <div slot="label" class="art-pubdate">令狐冲</div>
      <van-image
        class="author-avatar"
        slot="icon"
        fit="cover"
        round
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
      <van-button
        class="follow-btn"
        slot="right-icon"
        type="info"
        icon="plus"
        round
      >关注
      </van-button>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleIndex',
  props: {
    articleId: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  .art-title {
    font-size: 20px;
    color: #3a3a3a;
    padding: 14px;
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
}
</style>
