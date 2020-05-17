<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
    >
      <van-button
        class="search-btn"
        slot="title"
        round
        icon="search"
        to="/search"
      >搜素</van-button>
    </van-nav-bar>
    <!-- 文章 频道列表 -->
    <van-tabs class="channel-tabs" v-model="active">
      <van-tab
        v-for="channel in channels"
        :key="channel.id"
        :title="channel.name"
      >
        <!-- 文章列表 数据 -->
        <article-list :channel="channel" />
      </van-tab>
      <!-- 汉堡按钮 -->
      <div slot="nav-right" class="nav-placeholder"></div>
      <div
        slot="nav-right"
        class="nav-icon"
        @click="isChannelEditShow = true"
      >
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>

    <!-- 圆角弹窗 -->
    <van-popup
      class="channel-edit-popup"
      v-model="isChannelEditShow"
      round
      closeable
      close-icon-position="top-left"
      position="bottom"
      get-container="body"
      :overlay="false"
      :style="{ height: '100%' }"
    >
      <!-- 频道编辑 子路由出口 -->
      <channel-edit
        :user-channels="channels"
        :active="active"
        @edit-active="active = $event"
        @popup-close="isChannelEditShow = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0, // 控制被激活的标签
      channels: [], // 文章频道
      isChannelEditShow: false // 是否显示弹出层(编辑频道)
    }
  },
  computed: {
    ...mapState(['user'])
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  created () {
    this.loadChannels()
  },
  methods: {
    // 获取用户频道列表
    async loadChannels () {
      let channels = []
      if (this.user) {
        // 登录状态,获取后台用户频道
        const { data } = await getUserChannels()
        channels = data.data.channels
      } else {
        // 未登录,获取本地用户频道
        const localChannels = getItem('user-channel')
        // 判断 本地存储有无
        if (localChannels) {
          channels = localChannels
        } else {
          const { data } = await getUserChannels()
          channels = data.data.channels
        }
      }
      // 把最终 数据放到 data中
      this.channels = channels
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .van-nav-bar__title {
  max-width: none;
}
.search-btn {
  width: 277px;
  height: 32px;
  border: none;
  background: #5babfb;
  .van-icon {
    font-size: 16px;
  }
  .van-button__text {
    font-size: 14px;
    color: #fff;
  }
}

.channel-tabs {
  /deep/ .van-tab {
    border-right: 1px solid #edeff3;
    border-bottom: 1px solid #edeff3;
  }
  /deep/ .van-tabs__line {
    width: 16px !important;
    height: 3px;
    background-color: #3296fa;
    bottom: 20px;
  }

  .nav-placeholder {
    width: 33px;
    flex-shrink: 0;
  }
  .nav-icon {
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 33px;
    height: 41px;
    background-color: #fff;
    opacity: .8;
    .van-icon-wap-nav {
      font-size: 24px;
      color: #333333;
    }
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 1px;
      background: url('./line.png') no-repeat;
      background-size: contain;
    }
  }
}

</style>
