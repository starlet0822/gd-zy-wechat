/*
 * @Description:
 * @Author: wuxxing
 * @LastEditTime: 2022-04-29 16:54:53
 */
const env = process.env.NODE_ENV
const propList = env === 'development' ? [] : ['*', '!border']

module.exports = {
  plugins: {
    // 兼容浏览器，添加前缀
    autoprefixer: {
      // overrideBrowserslist: [
      //   'Android 4.1',
      //   'iOS 7.1',
      //   'Chrome > 31',
      //   'ff > 31',
      //   'ie >= 8',
      //   'last 10 versions' // 所有主流浏览器最近10版本用
      // ],
      // grid: true
    },
    'postcss-pxtorem': {
      // rootValue({ file }) { // postcss-pxtorem 插件的版本需要 >= 5.0.0
      //   return file.indexOf('vant') !== -1 ? 37.5 : 75
      // },
      rootValue: 37.5, // 基准值 Vant 官方根字体大小是 37.5
      unitPrecision: 5, // （数字）允许REM单位增长的十进制数字
      propList: propList,
      selectorBlackList: ['.norem', '.vh-border'], // 选择器黑名单 匹配则不会转换成 rem单位, 大写PX不转换
      mediaQuery: false // 是否允许在媒体查询中转换px。
      // exclude: /node_modules/i  // （字符串，正则表达式，函数）要忽略并保留为px的文件路径 TODO:这句有点毛病
    }
  }
}
