<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell center :border="false">
      <div slot="title" class="channel-title">我的频道</div>
      <van-button
        class="edit-btn"
        type="danger"
        plain
        round
        size="mini"
      >编辑</van-button>
    </van-cell>
    <van-grid :gutter="10" class="grid-wrap">
      <van-grid-item
        class="grid-item"
        v-for="value in 8"
        center
        :key="value"
        text="文字"
      />
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell center :border="false">
      <div slot="title" class="channel-title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" class="grid-wrap">
      <van-grid-item
        class="grid-item"
        v-for="value in 8"
        :key="value"
        center
        icon="plus"
        text="文字"
      />
    </van-grid>
  </div>
</template>

<script>
export default {
  name: 'ChannelEdit'
}
</script>

<style scoped lang="less">
.channel-edit {
  padding-top: 50px;
  .channel-title {
    font-size: 16px;
    color: #333;
  }
  .edit-btn {
    width: 52px;
    height: 24px;
    line-height: 24px;
  }
  .grid-wrap {
    margin-top: 24px;
    margin-bottom: 37px;
    .grid-item {
      width: 80px;
      height: 43px;
      /deep/ .van-grid-item__content {
        background-color: #f4f5f6;
        .van-grid-item__text {
          font-size: 14px;
          color: #222;
          margin-top: 0;
        }
        .van-icon-plus {
          position: absolute;
          left: 6px;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
