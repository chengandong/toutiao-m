<template>
  <van-cell class="article-item">
    <!-- 自定义左侧标题 -->
    <div slot="title" class="title van-multi-ellipsis--l3">{{ article.title }}</div>
    <!-- 自定义标题下方描述 -->
    <div slot="label">
      <!-- 三张 封面 -->
      <div class="cover-wrap" v-if="article.cover.type === 3">
        <div
          class="cover-item"
          fit="cover"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image
            class="cover-img"
            :src="img"
          />
        </div>
      </div>
      <div class="lable-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate }}</span>
      </div>
    </div>
    <!-- 自定义右侧内容 default默认插槽 -->
    <van-image
      class="right-cover"
      v-if="article.cover.type === 1"
      fit="cover"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
.title {
  font-size: 16px;
  color: #3a3a3a;
}
.van-cell__value {
  flex: unset;
  width: 116px;
  height: 73px;
  margin-left: 12px;
  .right-cover {
    width: 100%;
    height: 100%;
  }
}
.cover-wrap {
  display: flex;
  padding: 15px 0;
  .cover-item {
    flex: 1;
    height: 73px;
    &:not(:last-child) {
        padding-right: 2px;
      }
    .cover-img {
      width: 116px;
      height: 73px;
    }
  }
}
</style>
