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
    <van-cell-group class="messageList">
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
    </van-cell-group>
    <!-- 发送消息 -->
    <van-cell-group class="sendMessage-wrap">
      <van-field
        v-model="message"
        placeholder="请输入消息"
        :border="false"
      />
      <van-button type="primary" size="small">发送</van-button>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'UserChat',
  data () {
    return {
      message: ''
    }
  }
}
</script>

<style scoped lang="less">
.messageList {
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 44px;
  overflow-y: auto;
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
