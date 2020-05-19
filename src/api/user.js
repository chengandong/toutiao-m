// 用户 相关请求模块
import request from '@/utils/request'

// 加载 store
// import store from '@/store/'

// 用户认证（登录注册）
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

// 获取短信验证码
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

// 获取用户自己信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}

// 获取用户频道列表
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}

// 关注用户
export const addFollow = userID => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: userID
    }
  })
}

// 取消关注用户
export const deleteFollow = userID => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${userID}`
  })
}
