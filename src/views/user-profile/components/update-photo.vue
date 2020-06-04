<template>
  <div class="update-photo">
    <img class="image" :src="image" ref="image" />
    <van-nav-bar
      class="navBar"
      left-text="取消"
      right-text="确认"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserPhoto } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  name: 'UpdatePhoto',
  props: {
    file: {
      // type: Object,
      required: true
    }
  },
  data () {
    return {
      image: window.URL.createObjectURL(this.file), // 头像blob数据
      cropper: null // 裁切器实例
    }
  },
  mounted () {
    const image = this.$refs.image

    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  },
  methods: {
    getCroppedCanvas () {
      return new Promise(resolve => {
        this.cropper.getCroppedCanvas().toBlob((file) => {
          resolve(file)
        })
      })
    },
    async onConfirm () {
      // toast 提示
      this.$toast.loading({
        message: '保存中',
        forbidclick: true
      })
      // 接口要求 Content-Type 是 multipart/form-data
      const file = await this.getCroppedCanvas()
      const fd = new FormData()

      fd.append('photo', file)
      // 修改头像
      await updateUserPhoto(fd)

      // 组件通信-修改父组件里面的头像
      this.$emit('update-photo', window.URL.createObjectURL(file))
      // 关闭弹出层
      this.$emit('close')

      // 成功提示
      this.$toast.success('保存成功')
    }
  }
}
</script>

<style scoped lang="less">
.navBar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
}
.image {
  display: block;
  max-width: 100%;
}
</style>
