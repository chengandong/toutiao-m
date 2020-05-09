// PostCSS 的配置文件
module.exports = {
  // 配置 相关插件
  plugins: {
    // autoprefixer: {
    //   // 用来 要配置 要 兼容的浏览器
    //   browsers: ['Android >= 4.0', 'iOS >= 8'],
    // },
    // 用于将 px单位 转化为 rem
    'postcss-pxtorem': {
      // 转换的根元素基准值
      rootValue: 37.5,
      // 需要转换的 css属性, *代表的所有
      propList: ['*']
    }
  }
}
