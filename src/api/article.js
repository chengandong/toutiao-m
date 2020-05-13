// 文章 相关 请求模块
import request from '@/utils/request'

// 获取 文章 频道新闻推荐
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}