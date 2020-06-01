<template>
  <div class="update-gender">
    <van-picker
      title="性别"
      show-toolbar
      :columns="columns"
      :default-index="defaultIndex"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onGenderChange"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateGender',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'], // 配置每一列显示的数据
      defaultIndex: this.value // 单列选择时，默认选中项的索引
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidclick: true // 禁止背景点击
      })
      // 修改用户性别
      await updateUserProfile({
        gender: this.defaultIndex // 性别，0-男，1-女
      })

      // 组件通信-修改父组件里面的性别
      this.$emit('input', this.defaultIndex)
      // 关闭弹出层
      this.$emit('close')

      // 成功提示
      this.$toast.success('保存成功')
    },
    onGenderChange (picker, item, index) {
      this.defaultIndex = index
    }
  }
}
</script>

<style>

</style>
