<template>
  <div class="login-container">
    <!-- 登录 导航头部 -->
    <van-nav-bar
      class="app-nav-bar"
      title="注册 / 登录"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 表单 区域 -->
    <van-cell-group>
      <van-field
        v-model="user.mobile"
        icon-prefix="toutiao"
        left-icon="shouji"
        placeholder="请输入手机号"
      />
      <van-field
        v-model="user.code"
        clearable
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        placeholder="请输入验证码"
      >
        <template #button>
          <van-button
            class="send-btn"
            size="small"
            round
          >发送验证码</van-button>
        </template>
      </van-field>
    </van-cell-group>
    <div class="login-btn-wrap">
      <van-button
        class="login-btn"
        type="primary"
        block
        @click="onLogin"
      >登录</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
// 引入 Toast
// import { Toast } from 'vant'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13911111111', // 手机号
        code: '246810' // 短信验证码
      }
    }
  },
  methods: {
    async onLogin () {
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, // 是否禁止背景点击
        duration: 0 // 展示时长(ms)，值为 0 时，toast 不会消失
      })
      try {
        const res = await login(this.user)
        console.log(res)
        // Toast.success('登录成功')
        this.$toast.success('登录成功')
      } catch (err) {
        console.log('登录失败', err)
        this.$toast.fail('登录失败,手机号或验证码错误')
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .send-btn {
    width: 76px;
    height: 23px;
    background-color: #ededed;
    .van-button__text {
      font-size: 11px;
      color: #666666;
    }
  }
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
}
</style>
