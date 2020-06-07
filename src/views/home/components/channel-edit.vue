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
      >{{isEdit ? '完成' : '编辑'}}</van-button>
    </van-cell>
    <van-grid :gutter="10" class="grid-wrap">
      <van-grid-item
        class="grid-item"
        :class="{active: active === index}"
        v-for="(channel, index) in userChannels"
        center
        :icon="(isEdit && index !==0) ? 'close' : ''"
        :key="index"
        :text="channel.name"
        @click="onUserChannelClick(channel, index)"
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
        :text="Channel.name"
        @click="onAddChannel(Channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel
} from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
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
    },
    active: {
      type: Number,
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
    },
    ...mapState(['user'])
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
    async onAddChannel (Channel) {
      this.userChannels.push(Channel)

      // 数据持久化
      if (this.user) {
        // 登录状态,存储到后台
        await addUserChannel({
          channels: [
            { id: Channel.id, seq: this.userChannels.length }
          ]
        })
      } else {
        // 没有登录,存储到本地
        setItem('user-channel', this.userChannels)
      }
    },
    onUserChannelClick (channel, index) {
      // 判断 当前编辑按钮 所处状态
      if (this.isEdit && index !== 0) {
        // 删除频道
        this.deleteChannel(channel, index)
      } else {
        // 切换频道
        this.swithChannel(index)
      }
    },
    // 删除频道
    async deleteChannel (channel, index) {
      if (index <= this.active) {
        // 更新 激活频道的索引
        this.$emit('edit-active', this.active - 1)
      }
      this.userChannels.splice(index, 1)

      // 数据持久化
      if (this.user) {
        await deleteUserChannel(channel.id)
      } else {
        setItem('user-channel', this.userChannels)
      }
    },
    // 切换频道
    swithChannel (index) {
      // 子传父 数据通信
      this.$emit('edit-active', index) // 当前我的频道索引
      this.$emit('popup-close') // 关闭弹出层
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
  .active {
    /deep/ .van-grid-item__text {
      color: red !important;
    }
  }
}
</style>
