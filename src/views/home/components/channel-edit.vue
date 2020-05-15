<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell center :border="false">
      <div slot="title" class="channel-title">我的频道</div>
      <van-button
        class="edit-btn"
        type="danger"
        plain
        round
        size="mini"
        @click="isEdit = !isEdit"
      >{{isEdit ? '编辑' : '完成'}}</van-button>
    </van-cell>
    <van-grid :gutter="10" class="grid-wrap">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in userChannels"
        center
        :icon="isEdit ? 'close' : ''"
        :key="index"
        :text="channel.name"
      />
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell center :border="false">
      <div slot="title" class="channel-title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" class="grid-wrap">
      <van-grid-item
        class="grid-item"
        v-for="(Channel, inndex) in recommendChannels"
        :key="inndex"
        center
        icon="plus"
        :text="Channel.name"
        @click="onAddChannel(Channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
export default {
  name: 'ChannelEdit',
  data () {
    return {
      allChannels: [], // 全部频道列表数据
      isEdit: false // 是否为编辑状态
    }
  },
  props: {
    userChannels: {
      type: Array,
      required: true
    }
  },
  // 计算属性里面的数据 会根据数据的变化而重新求值
  computed: {
    // 推荐频道 数据列表
    recommendChannels () {
      // filter()方法创建一个新数组,通过所提供函数实现的测试的所有元素
      return this.allChannels.filter(channel => {
        // 根据方法返回的布尔值 true 来判断数据
        // find 方法查找满足条件的单个元素
        return !this.userChannels.find(userChannel => {
          // 判断
          return channel.id === userChannel.id
        })
      })

      // 方法二
      // const arr = []
      // this.allChannels.forEach(channel => {
      //   let flag = false
      //   for (let i = 0; i < this.userChannels.length; i++) {
      //     if (this.userChannels[i].id === channel.id) {
      //       flag = true
      //       break
      //     }
      //   }
      //   if (!flag) {
      //     arr.push(channel)
      //   }
      // })
      // return arr
    }
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    // 全部频道列表
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    onAddChannel (Channel) {
      this.userChannels.push(Channel)

      // 数据持久化
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding-top: 50px;
  .channel-title {
    font-size: 16px;
    color: #333;
  }
  .edit-btn {
    width: 52px;
    height: 24px;
    line-height: 24px;
  }
  .grid-wrap {
    margin-top: 24px;
    margin-bottom: 37px;
    .grid-item {
      width: 80px;
      height: 43px;
      /deep/ .van-grid-item__content {
        background-color: #f4f5f6;
        .van-grid-item__text {
          font-size: 14px;
          color: #222;
          margin-top: 0;
        }
        .van-icon-plus {
          position: absolute;
          left: 6px;
          font-size: 16px;
        }
        .van-icon-close {
          position: absolute;
          right: -5px;
          top: -5px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
