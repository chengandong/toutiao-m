<template>
  <div class="my-container">
    <van-cell-group class="user-info-wrap">
      <!-- 个人 信息 头部 -->
      <van-cell
        center
        title="单元格"
        value="内容"
        :border="false"
        class="user-info"
      >
        <van-image
          class="user-avatar"
          slot="icon"
          round
          fit="cover"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <div slot="title">昵称</div>
        <van-button
          type="default"
          round
          size="mini"
        >编辑资料</van-button>
      </van-cell>
      <!-- 个人 信息 数据栏 -->
      <van-grid
        class="data-info"
        center
        :border="false"
      >
        <van-grid-item>
          <div slot="text">
            <div class="count">123</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text">
            <div class="count">123</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text">
            <div class="count">123</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text">
            <div class="count">123</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <!-- Grid 宫格 页面导航 -->
    <van-grid :column-num="2" class="">
      <van-grid-item
        class="shoucang"
        icon-prefix="toutiao"
        icon="shoucang"
        text="收藏"
      />
      <van-grid-item
        class="lishi"
        icon-prefix="toutiao"
        icon="lishi"
        text="历史"
      />
    </van-grid>
    <!-- 页面导航 -->
    <van-cell title="消息通知" is-link to="/" />
    <van-cell title="小程同学" is-link to="/" />
    <van-cell title="退出登录" class="login_out"/>
  </div>
</template>

<script>
export default {
  name: 'MyIndex'
}
</script>

<style scoped lang="less">
.user-info-wrap {
  background: url('./banner.png') no-repeat;
  background-size: cover;
  box-sizing: border-box;
  // color: #fff;
  font-size: 15px;
  padding: 46px 16px 14px;
  .user-info {
    background: none;
    .user-avatar {
      width: 66px;
      height: 66px;
      padding: 2px;
      margin-right: 12px;
      background-color: #fff;
    }
  }
  .data-info {
    text-align: center;
    .van-grid-item__content {
      background: none;
    }
    .count {
      font-size: 18px;
    }
    .text {
      font-size: 12px;
    }
  }
}
.shoucang {
  font-size: 22px;
  color: #eb5253;
}
.lishi {
  color: #ff9f21;
}
.login_out {
  text-align: center;
  color: #d86262;
  font-size: 15px;
}
</style>
