<template>
  <div class="user-profile">
    <!-- 个人信息 导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell is-link center title="头像">
      <van-image
        width="36"
        height="36"
        fit="cover"
        round
        :src="userProfile.photo"
      />
    </van-cell>
    <van-cell is-link title="昵称" :value="userProfile.name"></van-cell>
    <van-cell is-link title="性别" :value="userProfile.gender === 0 ? '男' : '女'"></van-cell>
    <van-cell is-link title="生日" :value="userProfile.birthday"></van-cell>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
export default {
  name: 'UserProfile',
  data () {
    return {
      userProfile: {} // 用户个人信息数据
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile () {
      const { data } = await getUserProfile()
      this.userProfile = data.data
    }
  }
}
</script>

<style scoped lang="less">

</style>
