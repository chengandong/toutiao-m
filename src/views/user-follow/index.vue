<template>
  <div class="user-follow">
    <van-nav-bar
      class="app-nav-bar"
      left-arrow
      @click-left="$router.back()"
    >
      <van-tabs
        slot="title"
        v-model="active"
        background="#3296fa"
        color="#fff"
        title-inactive-color="#fff"
        title-active-color="#fff"
      >
        <van-tab title="关注" name="a">
          <follow-list />
        </van-tab>
        <van-tab title="粉丝" name="b">内容 2</van-tab>
      </van-tabs>
    </van-nav-bar>
  </div>
</template>

<script>
import FollowList from './components/follow-list'
export default {
  name: 'UserFollow',
  components: {
    FollowList
  },
  data () {
    return {
      active: 2
    }
  }
}
</script>

<style>

</style>
