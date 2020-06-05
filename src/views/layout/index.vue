<template>
  <div class="layout-container">
    <!-- 二级 路由出口 采用组件缓冲-->
    <keep-alive>
      <router-view />
    </keep-alive>
    <!-- 底部导航栏 -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item
        :icon="ishomeShow ? 'wap-home' : 'home-o'"
        to="/"
        @click="iconHome"
      >首页</van-tabbar-item>
      <van-tabbar-item
        :icon="iscommentShow ? 'comment' : 'comment-o'"
        to="/qa"
        @click="iconComment"
        >问答</van-tabbar-item>
      <van-tabbar-item
        :icon="isvideoShow ? 'video' : 'video-o'"
        to="/video"
        @click="iconVideo"
      >视频</van-tabbar-item>
      <van-tabbar-item
        :icon="ismanagerShow ? 'manager' : 'manager-o'"
        to="/my"
        @click="iconManager"
      >{{user ? '我的' : '未登录'}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'LayoutIndex',
  data () {
    return {
      active: 0,
      ishomeShow: false,
      iscommentShow: false,
      isvideoShow: false,
      ismanagerShow: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    iconHome () {
      this.ishomeShow = true
      this.iscommentShow = false
      this.isvideoShow = false
      this.ismanagerShow = false
    },
    iconComment () {
      this.ishomeShow = false
      this.iscommentShow = true
      this.isvideoShow = false
      this.ismanagerShow = false
    },
    iconVideo () {
      this.ishomeShow = false
      this.iscommentShow = false
      this.isvideoShow = true
      this.ismanagerShow = false
    },
    iconManager () {
      this.ishomeShow = false
      this.iscommentShow = false
      this.isvideoShow = false
      this.ismanagerShow = true
    }
  }
}
</script>

<style scoped lang="less">

</style>
