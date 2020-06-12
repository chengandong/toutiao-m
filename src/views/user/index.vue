<template>
  <div class="user-container">
    <!-- 导航条 -->
    <van-nav-bar
      class="app-nav-bar"
      :title="user.name"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 用户信息 -->
    <user-info :user="user" />
    <!-- 文章列表 -->
  </div>
</template>

<script>
import { getUserById } from '@/api/user'
import UserInfo from './components/user-info'
export default {
  name: 'UserIndex',
  components: {
    UserInfo
  },
  props: {
    userId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      user: {
        id: this.userId
      } // 用户信息数据
    }
  },
  created () {
    this.loadUser()
  },
  methods: {
    async loadUser () {
      const { data } = await getUserById(this.userId)
      this.user = data.data
    }
  }
}
</script>

<style>

</style>
