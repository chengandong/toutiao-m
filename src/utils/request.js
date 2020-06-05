// 封装 axios 请求模块

import axios from 'axios'

import JSONbig from 'json-bigint'

// 加载 store
import store from '@/store/'

import { Toast } from 'vant'

import router from '@/router/'

const requestRefreshToken = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn', // 基准地址
  transformResponse: [function (data) {
    // 后端返回的数据可能不是 JSON 格式字符串
    // 如果不是的话，那么 JSONbig.parse 调用就会报错
    // 所以我们使用 try-catch 来捕获异常，处理异常的发生
    try {
      // 如果转换成功，则直接把结果返回
      return JSONbig.parse(data)
    } catch (err) {
      // console.log('转换失败', err)
      // 如果转换失败了，则进入这里
      // 我们在这里把数据原封不动的直接返回给请求使用
      return data
    }

    // axios 默认在内部使用 JSON.parse 来转换处理原始数据
    // return JSON.parse(data)
  }]
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

// 响应 拦截器
request.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  // 响应成功
  return response
}, async function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  // 响应失败, 超过 2xx 的状态码都会进入这

  const status = error.response.status

  if (status === 400) {
    Toast.fail('客户端请求参数异常!')
  } else if (status === 401) {
    // token 无效
    const { user } = store.state
    // 如果没有 user 或者没有 user.token, 便先去登录
    if (!user || !user.token) {
      return redirectLogin()
    }
    try {
      const { data } = await requestRefreshToken({
        method: 'PUT',
        url: '/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })

      // 将新 token 保存到 容器
      user.token = data.data.token
      store.commit('setUser', user)

      // 把 失败的请求 重新 发出去
      return request(error.config)
    } catch (err) {
      redirectLogin()
    }
  } else if (status === 403) {
    Toast.fail('没有权限操作')
  } else if (status >= 500) {
    Toast.fail('服务端异常，请稍后重试')
  }
  return Promise.reject(error)
})

function redirectLogin () {
  router.replace('/login')
}

export default request
