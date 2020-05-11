// 本地 存储 封装 模块

// 设置 本地存储 数据
export const setItem = (name, value) => {
  // 判断value 是否是 对象
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}
// 获取 本地存储 数据
export const getItem = name => {
  const data = window.localStorage.getItem(name)
  try {
    // JSON 格式 转换为 js对象
    return JSON.parse(data)
  } catch (err) {
    // 不是 JSON格式,原样返回
    return data
  }
}
// 移除 本地存储 数据
export const removeItem = name => {
  window.localStorage.removeItem(name)
}
