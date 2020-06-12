<template>
  <div class="user-info">
    <div class="row-warp">
      <van-image
        class="col-img"
        fit="cover"
        round
        :src="user.photo"
        @click="onPreviewImg(user.photo)"
       />
       <div class="col-info">
         <div class="row1">
           <div class="item">
             <div class="count">{{ user.art_count }}</div>
             <div class="text">发布</div>
           </div>
           <div class="item">
             <div class="count">{{ user.follow_count }}</div>
             <div class="text">关注</div>
           </div>
           <div class="item">
             <div class="count">{{ user.fans_count }}</div>
             <div class="text">粉丝</div>
           </div>
           <div class="item">
             <div class="count">{{ user.like_count }}</div>
             <div class="text">获赞</div>
           </div>
         </div>
         <div class="row2">
           <van-button
             type="primary"
             size="small"
             @click="$router.push('/user/chat')"
            >私信</van-button>
           <van-button type="info" size="small">关注</van-button>
         </div>
       </div>
    </div>
    <div class="intro-wrap">
      <div class="media" v-if="user.is_media">
        <span>认证：</span>
        <span>{{ user.certi }}</span>
      </div>
      <div class="intro">
        <span>简介：</span>
        <span>{{ user.intro }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
export default {
  name: 'UserInfo',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
    }
  },
  methods: {
    // 图片预览
    onPreviewImg (imgSrc) {
      ImagePreview([imgSrc])
    }
  }
}
</script>

<style scoped lang="less">
.user-info {
  padding: 13px;
  margin-bottom: 8px;
  background-color: #fff;
  .row-warp {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .col-img {
      width: 80px;
      height: 80px;
    }
    .item {
      text-align: center;
      .count {
        font-size: 14px;
        color: #0d0a10;
      }
      .text {
        font-size: 12px;
        color: #9c9b9d;
      }
    }
    .col-info {
      width: 70%;
      padding: 0 12px;
      .row1 {
        display: flex;
        justify-content: space-between;
        margin-bottom: 13px;
      }
      .row2 {
        display: flex;
        justify-content: space-between;
        .van-button {
          width: 45%;
          border-radius: 6px;
        }
      }
    }
  }
  .intro-wrap {
    margin-top: 10px;
    .media .intro {
      line-height: 28;
    }
    .media span:nth-child(1),
    .intro span:nth-child(1) {
      font-size: 14px;
      color: #646263;
    }
    .media span:last-child,
    .intro span:last-child {
      font-size: 14px;
      color: #212121;
    }
  }
}
</style>
