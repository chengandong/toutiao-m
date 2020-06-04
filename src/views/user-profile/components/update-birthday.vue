<template>
  <div class="update-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'UpdateBirthday',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1949, 9, 1),
      maxDate: new Date(2020, 11, 31),
      currentDate: new Date()
    }
  },
  methods: {
    async onConfirm () {
      // totast 提示
      this.$toast.loading({
        message: '保存中',
        forbidclick: true // 禁止背景点击
      })
      // 将生日 日期格式转换为 接口需要的
      const birthdayData = dayjs(this.currentDate).format('YYYY-MM-DD')
      // 修改日期
      await updateUserProfile({
        birthday: birthdayData // 生日，格式'2018-12-20'
      })
      // 组件通信-修改父组件里面的性别
      this.$emit('input', birthdayData)
      // 关闭弹出层
      this.$emit('close')

      // 成功提示
      this.$toast.success('保存成功')
    }
  }
}
</script>

<style>

</style>
