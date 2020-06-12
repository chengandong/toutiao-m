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
    <!-- 文章列表 -->
  </div>
</template>

<script>
import { getUserById } from '@/api/user'
export default {
  name: 'UserIndex',
  props: {
    userId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      user: null // 用户信息数据
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
