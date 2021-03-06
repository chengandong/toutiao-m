import Vue from 'vue'
import dayjs from 'dayjs'

// 加载本地化语言配置
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用处理相对时间
dayjs.extend(relativeTime)

// 全局使用简体中文
dayjs.locale('zh-cn')

// 注册 全局过滤器
Vue.filter('relativeTime', value => {
  return dayjs(value).from(dayjs())
})

Vue.filter('datetime', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(format)
})
