<template>
  <div class="user-profile">
    <!-- 个人信息 导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <input
      type="file"
      hidden
      ref="file"
      accept="image/*"
      @change="onFileChange"
    />
    <van-cell is-link center title="头像" @click="$refs.file.click()">
      <van-image
        width="36"
        height="36"
        fit="cover"
        round
        :src="userProfile.photo"
      />
    </van-cell>
    <van-cell
      is-link
      title="昵称"
      :value="userProfile.name"
      @click="isEditNameShow = true"
    ></van-cell>
    <van-cell
      is-link
      title="性别"
      :value="userProfile.gender === 0 ? '男' : '女'"
      @click="isEditGenderShow = true"
    ></van-cell>
    <van-cell
      is-link title="生日"
      :value="userProfile.birthday"
      @click="isEditBirthdayShow = true"
    ></van-cell>

    <!-- 昵称 弹出层 -->
    <van-popup
      v-model="isEditNameShow"
      :overlay="false"
      round
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!-- 当传递给子组件的数据既要使用又要修改, 使用 v-model 简写 -->
      <update-name
        v-if="isEditNameShow"
        v-model="userProfile.name"
        @close="isEditNameShow = false"
      />
    </van-popup>

    <!-- 性别 弹出层 -->
    <van-popup
      v-if="isEditGenderShow"
      v-model="isEditGenderShow"
      round
      position="bottom"
    >
      <update-gender
        v-model="userProfile.gender"
        @close="isEditGenderShow = false"
      />
    </van-popup>

    <!-- 生日 弹出层 -->
    <van-popup
      v-model="isEditBirthdayShow"
      round
      position="bottom"
    >
      <update-birthday
        v-if="isEditBirthdayShow"
        v-model="userProfile.birthday"
        @close="isEditBirthdayShow = false"
      />
    </van-popup>
    <!-- 头像 弹出层 -->
    <van-popup
      class="update-photo-popup"
      v-model="isEditPhotoShow"
      round
      position="bottom"
      style="height: 100%"
    >
      <update-photo
        v-if="isEditPhotoShow"
        :file="previewImage"
        @update-photo="userProfile.photo = $event"
        @close="isEditPhotoShow = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name'
import UpdateGender from './components/update-gender'
import UpdateBirthday from './components/update-birthday'
import UpdatePhoto from './components/update-photo'
export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  data () {
    return {
      userProfile: {}, // 用户个人信息数据
      isEditNameShow: false, // 是否显示编辑昵称弹出层
      isEditGenderShow: false, // 是否显示编辑性别弹出层
      isEditBirthdayShow: false, // 是否显示编辑生日弹出层
      isEditPhotoShow: false, // 是否显示编辑头像弹出层
      previewImage: null // 上传预览图片数据
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile () {
      const { data } = await getUserProfile()
      this.userProfile = data.data
    },

    onFileChange () {
      // 预览图片
      const file = this.$refs.file.files[0]

      this.previewImage = file

      // 展示弹出层
      this.isEditPhotoShow = true

      // 解决相同 文件不触发 该事件
      this.$refs.file.value = ''
    }
  }
}
</script>

<style scoped lang="less">
.van-popup {
  background-color: #f5f7f9;
}
.update-photo-popup {
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
