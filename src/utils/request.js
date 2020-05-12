// 封装 axios 请求模块

import axios from 'axios'

// 加载 store
import store from '@/store/'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn' // 基准地址
})

// 请求 拦截器
request.interceptors.request.use(function (config) {
  // 结构 对象
  const { user } = store.state
  // 判断 状态管理容器 中 是否有 用户数据
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

export default request
