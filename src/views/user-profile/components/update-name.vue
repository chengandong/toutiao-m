<template>
  <div class="update-name">
    <!-- 导航栏 -->
    <van-nav-bar
      title="昵称"
      left-text="取消"
      right-text="确认"
      left-arrow
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <div class="field-wrap">
      <van-field
        v-model="nickName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateName',
  props: {
    // name: {
    //   type: String,
    //   required: true
    // }
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      nickName: this.value
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidclick: true // 禁止背景点击
      })
      try {
        // 修改昵称
        await updateUserProfile({
          name: this.nickName.trim() // 昵称
        })

        // 组件通信-修改父组件里面的昵称
        // this.$emit('update-name', this.nickName)
        this.$emit('input', this.nickName)
        // 关闭弹出层
        this.$emit('close')

        // 成功提示
        this.$toast.success('保存成功')
      } catch (err) {
        console.dir(err)
        if (err && err.response && err.response.status === 409) {
          this.$toast.fail('昵称已存在,请更换!!!')
        } else if (err && err.response && err.response.status === 400) {
          this.$toast.fail('昵称必须是1到7个字符!!!')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.field-wrap {
  padding: 10px;
}
</style>
