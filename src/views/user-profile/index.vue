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
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
    </van-cell>
    <van-cell is-link title="昵称" value="令狐冲"></van-cell>
    <van-cell is-link title="性别" value="男"></van-cell>
    <van-cell is-link title="生日" value="2020-05-20"></van-cell>
  </div>
</template>

<script>
export default {
  name: 'UserProfile'
}
</script>

<style scoped lang="less">

</style>
