<template>
  <div class="follow-list">
    <van-list
      class="follow-info"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item, index) in list" :key="index">
        <!-- 头像 -->
        <van-image
          class="avatar"
          slot="icon"
          round
          fit="cover"
          :src="item.photo"
          @click="$router.push({
            name: 'user',
            params: {
              userId: item.id
            }
          })"
        />
        <div class="title" slot="title">{{item.name}}</div>
        <div class="label" slot="label">粉丝数：{{ item.fans_count }}</div>
        <div>关注</div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getFollowingsById } from '@/api/user'
export default {
  name: 'FollowList',
  data () {
    return {
      list: [],
      loading: false, // 是否处于加载状态
      finished: false, // 是否已加载完成
      page: 1, // 页数
      perPage: 20 // 每页数量
    }
  },
  methods: {
    async onLoad () {
      try {
        // 被关注的用户id
        const userId = this.$route.params.userId
        // 接口 所需的 Query 参数
        const params = {
          page: this.page,
          per_page: this.perPage
        }
        const { data } = await getFollowingsById(userId, params)

        // 获取到 关注的 用户信息
        const { results } = data.data

        // 将 用户信息 添加到 list列表
        this.list.push(...results)

        // 加载状态结束
        this.loading = false

        // 判断 数据是否 全部加载完成
        if (results.length) {
          this.page++
        } else {
          // 没有 数据 设置 结束状态
          this.finished = true
        }
      } catch (err) {
        this.$toast('获取数据失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.follow-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 0;
  overflow-y: auto;
  .follow-info {
    align-items: center;
    .avatar {
      width: 50px;
      height: 50px;
      margin-right: 12px;
    }
    .van-cell__title {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      .title {
      font-size: 14px;
      color: #222222;
      }
      .label {
        font-size: 12px;
        color: #999999;
      }
    }
  }
}
</style>
