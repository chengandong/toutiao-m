// 频道 相关请求模块
import request from '@/utils/request'

// 获取 全部频道列表
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
