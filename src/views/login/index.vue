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
    <van-form
      :show-error="false"
      :show-error-message="false"
      validate-first
      ref="login-form"
      @submit="onLogin"
      @failed="onFailed"
    >
      <van-field
        v-model="user.mobile"
        icon-prefix="toutiao"
        left-icon="shouji"
        name="mobile"
        center
        placeholder="请输入手机号"
        :rules="formRules.mobile"
      />
      <van-field
        v-model="user.code"
        clearable
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        center
        name="code"
        placeholder="请输入验证码"
        :rules="formRules.code"
      >
        <template #button>
          <van-count-down
            :time="time"
            format="ss s"
            v-if="isShow"
            @finish="isShow = false"
          />
          <van-button
            v-else
            class="send-btn"
            size="small"
            round
            :loading="isSendSmsLoading"
            @click.prevent="onSendSms"
          >发送验证码</van-button>
        </template>
      </van-field>
      <!-- 登录 按钮 -->
      <div class="login-btn-wrap">
      <van-button
        class="login-btn"
        type="primary"
        block
      >登录</van-button>
    </div>
    </van-form>
    <!-- 服务提示 -->
    <van-divider>账号：13911111111 密码：246810</van-divider>
    <van-divider>如果收不到验证码，请使用万能验证码：246810</van-divider>
    <!-- 同意条款 -->
    <div class="privacy">隐私条款</div>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
// 引入 Toast
// import { Toast } from 'vant'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13911111111', // 手机号
        code: '246810' // 短信验证码
      },
      formRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      time: 60 * 1000, // 倒计时总时长，单位为毫秒
      isShow: false, // 控制 发送按钮和 倒计时 是否显示
      isSendSmsLoading: false // 发送验证码按钮的 loading 状态
    }
  },
  methods: {
    // 用户认证 (登录注册)
    async onLogin () {
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, // 是否禁止背景点击
        duration: 0 // 展示时长(ms)，值为 0 时，toast 不会消失
      })
      try {
        const res = await login(this.user)
        // Toast.success('登录成功')
        this.$toast.success('登录成功')
        // 将 登录状态 数据 放到 Vuex容器中
        this.$store.commit('setUser', res.data.data)
        // 跳转 到原来 页面
        this.$router.back()
      } catch (err) {
        console.log('登录失败', err)
        this.$toast.fail('登录失败,手机号或验证码错误')
      }
    },
    // 提交表单且验证不通过后触发
    onFailed (error) {
      // 判断
      if (error.errors[0]) {
        // 文字提示
        this.$toast({
          message: error.errors[0].message,
          position: top // 防止 用户手机输入键盘 阻挡 提示信息
        })
      }
    },
    async onSendSms () {
      try {
        // 验证表单，支持传入name来验证单个表单项
        await this.$refs['login-form'].validate('mobile') // 返回值 Promise
        // 开启 发送 验证码 loding 状态 (防止用户因 网络慢,而频繁点击 发送请求)
        this.isSendSmsLoading = true
        // 发送 验证码
        await sendSms(this.user.mobile)
        // 验证码 发送成功 隐藏发送按钮
        this.isShow = true
      } catch (err) {
        // 定义 提示信息
        let message = ''
        if (err && err.response && err.response.status === 429) {
          // 发送短信 太频繁 提示
          message = '验证码发送太频繁,请稍后重试'
        } else if (err.name === 'mobile') {
          // 表单 验证失败 提示信息
          message = '请输入手机号'
        } else {
          message = '发送失败,请稍后重试'
        }
        // 文字提示
        this.$toast({
          message: message,
          position: top // 防止 用户手机输入键盘 阻挡 提示信息
        })
      }
      // 关闭 发送 验证码 loding 状态
      this.isSendSmsLoading = false
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
.privacy {
  position: absolute;
  bottom: 27px;
  left: 160px;
  font-size: 12px;
  color: #666;
}
</style>
