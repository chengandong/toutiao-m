<template>
  <div class="my-container">
    <van-cell-group class="user-info-wrap" v-if="user">
      <!-- 个人 信息 头部 -->
      <van-cell
        center
        :border="false"
        class="user-info"
      >
        <van-image
          class="user-avatar"
          slot="icon"
          round
          fit="cover"
          :src="userInfo.photo"
        />
        <div slot="title" class="user-nickName">{{userInfo.name}}</div>
        <van-button
          type="default"
          round
          size="mini"
          class="editBtn"
          to="/user/profile"
        >编辑资料</van-button>
      </van-cell>
      <!-- 个人 信息 数据栏 -->
      <van-grid
        class="data-info"
        center
        :border="false"
      >
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{userInfo.art_count}}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{userInfo.follow_count}}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{userInfo.fans_count}}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{userInfo.like_count}}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <!-- 未登录 -->
    <div class="no-login" v-else>
      <div @click="$router.push('/login')">
        <img class="cellphone" src="./cellphone.png">
      </div>
      <div class="text">登录 / 注册</div>
    </div>
    <!-- Grid 宫格 页面导航 -->
    <van-grid :column-num="2" class="nav-grid mb-5">
      <van-grid-item
        class="nav-grid-item"
        icon-prefix="toutiao"
        icon="shoucang"
        text="收藏"
      />
      <van-grid-item
        class="nav-grid-item"
        icon-prefix="toutiao"
        icon="lishi"
        text="历史"
      />
    </van-grid>
    <!-- 页面导航 -->
    <van-cell title="消息通知" is-link to="/" class="message" />
    <van-cell title="小程同学" is-link to="/" class="mb-5 smartXC" />
    <van-cell
      v-if="user"
      title="退出登录"
      class="login_out"
      @click="onLoginOut"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyIndex',
  data () {
    return {
      userInfo: {} // 用户信息
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.loadUserInfo()
  },
  methods: {
    // 用户 退出
    onLoginOut () {
      // Dialog 弹出框
      this.$dialog.confirm({
        title: '退出提示',
        message: '亲,确定要退出当前账号嘛？'
      })
        .then(() => {
          // 清除 用户 登录状态
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    // 获取用户自己信息
    async loadUserInfo () {
      if (this.user) {
        const { data } = await getUserInfo()
        this.userInfo = data.data
      }
    }
  }
}
</script>

<style scoped lang="less">
.user-info-wrap {
  background: url('./banner.png') no-repeat;
  background-size: cover;
  box-sizing: border-box;
  color: #fff;
  .user-info {
    height: 116px;
    background: unset;
    padding-top: 38px;
    padding-bottom: 11px;
    .user-avatar {
      width: 66px;
      height: 66px;
      padding: 2px;
      box-sizing: border-box;
      margin-right: 12px;
      background-color: #fff;
    }
    .user-nickName {
      font-size: 15px;
      color: #fff;
    }
    .editBtn {
      height: 16px;
      line-height: 16px;
      font-size: 10px;
      color: #666;
    }
  }
  .data-info {
    .data-info-item {
      height: 66px;
      /deep/ .van-grid-item__content {
      background: unset;
      .text-wrap {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .count {
          font-size: 18px;
        }
        .text {
          font-size: 12px;
        }
      }
    }
    }
  }
}

.nav-grid {
  /deep/ .nav-grid-item {
    height: 70px;
    .toutiao {
      font-size: 23px;
    }
    .van-grid-item__text {
      font-size: 14px;
      color: #333;
    }
    .toutiao-shoucang {
      color: #eb5253;
    }
    .toutiao-lishi {
      color: #ff9f21;
    }
  }
}

.no-login {
  height: 180px;
  background: url('./banner.png');
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .cellphone {
    width: 66px;
    height: 66px;
    margin-bottom: 8px;
  }
  .text {
    font-size: 14px;
    color: #fff;
  }
}
.message {
  height: 50px;
}
.smartXC {
  height: 50px;
}
.van-cell__title {
  display: flex;
  align-items: center;
  font-size: 15px;
  color: #333;
}
.login_out {
  height: 52px;
}
.login_out .van-cell__title {
  display: flex;
  justify-content: center;
  color: #d86262;
  font-size: 15px;
}
.mb-5 {
  margin-bottom: 5px;
}
</style>
