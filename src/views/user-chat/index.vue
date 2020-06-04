<template>
  <div class="user-chat">
    <!-- 导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      title="小程同学"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 消息列表 -->
    <van-cell-group class="messageList" ref="message-list">
      <van-cell
        class="message-item"
        :border="false"
        v-for="(message, index) in messageList"
        :key="index"
      >
        <van-image
          :slot="index % 2 === 0 ? 'default' : 'title'"
          width="40"
          height="40"
          :src=" index % 2 === 0 ? 'http://toutiao.meiduo.site/FqHn7ps9v5I8esWXJNKH0asrSwcB' : 'http://toutiao.meiduo.site/FlOAkWHoU8lnYwU6eCEPN-dHINHl'"
        />
        <div class="msg-wrap" :slot="index % 2 === 0 ? 'title' : 'default'">
          <span class="title">{{message.msg}}</span>
        </div>
      </van-cell>
    </van-cell-group>
    <!-- 发送消息 -->
    <van-cell-group class="sendMessage-wrap">
      <van-field
        v-model="message"
        placeholder="请输入消息"
        :border="false"
      />
      <van-button type="primary" size="small" @click="onSend">发送</van-button>
    </van-cell-group>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { getItem, setItem } from '@/utils/storage'
export default {
  name: 'UserChat',
  data () {
    return {
      message: '', // 输入框中信息
      socket: null, // WebSocket 通信对象
      messageList: getItem('chat-messages') || [] // 消息列表数据
    }
  },
  watch: {
    messageList () {
      setItem('chat-messages', this.messageList)
      // 数据改变之后 立即操作 DOM
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    }
  },
  created () {
    // 建立连接
    const socket = io('http://ttapi.research.itcast.cn')

    this.socket = socket

    socket.on('connect', () => {
      console.log('连接建立成功了')
    })

    // 监听message事件, 监听从服务器返回的数据
    socket.on('message', data => {
      this.messageList.push(data)
    })

    // 断开连接
    socket.on('disconnect', () => {
      console.log('连接断开')
    })
  },
  mounted () {
    this.scrollToBottom()
  },
  methods: {
    // 发送消息
    onSend () {
      // 后台需要的参数
      const data = {
        msg: this.message,
        timestamp: Date.now()
      }
      this.socket.emit('message', data)

      // 将用户 发出的数据 存入数组
      this.messageList.push(data)

      // 清空输入框
      this.message = ''
    },
    scrollToBottom () {
      const list = this.$refs['message-list']
      list.scrollTop = list.scrollHeight
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .messageList {
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 44px;
  overflow-y: auto;
  background-color: #f5f5f6;
  .van-cell {
    background-color: #f5f5f6;
  }
}
.message-item {
  display: flex;
  align-items: center;
  .msg-wrap {
    flex: 1;
    .title {
      background: #e0effb;
      padding: 10px;
    }
  }
}
.sendMessage-wrap {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
}
</style>
