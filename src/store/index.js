import Vue from 'vue'
import Vuex from 'vuex'

import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)

// 定义 一常量 记录 登录状态字段名
const USER_KEY = 'toutiao-user'

export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY), // 当前 用户登录状态
    cachePages: ['LayoutIndex'] // 缓冲组件
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 解决 页面刷新数据 丢失,将 数据 储存到本地 存储中
      setItem(USER_KEY, state.user)
    },

    // 添加 缓冲页面
    addCachePage (state, pageName) {
      if (!state.cachePages.includes(pageName)) {
        state.cachePages.push(pageName)
      }
    },

    // 移除缓冲页面
    removeCachePage (state, pageName) {
      const index = state.cachePages.indexOf(pageName)
      if (index !== -1) {
        state.cachePages.splice(index, 1)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
