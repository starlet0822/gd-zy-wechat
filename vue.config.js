/*
 * @Description: 项目配置
 * @Author: wuxxing
 * @LastEditTime: 2022-03-20 22:05:17
 */
const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)
// const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
const CompressionPlugin = require('compression-webpack-plugin')
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')

module.exports = {
  publicPath: './', // 署应用包时的基本 URL。 vue-router hash 模式使用 本地静态部署 serve -s dist
  // publicPath: defaultSettings.baseUrl, // 署应用包时的基本 URL。
  lintOnSave: false,
  productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  devServer: {
    port: 8088,
    open: false,
    overlay: {
      //  当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
      warnings: false,
      errors: true
    }
  },
  css: {
    extract: true, // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。
    sourceMap: false,
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // // 直接覆盖变量
            // 'text-color': '#111',
            // 'border-color': '#eee',
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "${path.resolve(
              __dirname,
              './src/assets/css/vant.less'
            )}";`
          }
        }
      }
    }
  },
  pluginOptions: {
    // 第三方插件配置
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/assets/css/vars.less')] // less全局变量
    }
  },
  configureWebpack: (config) => {
    config.plugins.push(
      new SkeletonWebpackPlugin({
        webpackConfig: {
          entry: {
            app: path.join(__dirname, './src/components/common/skeleton/index.js')
          }
        },
        minimize: true,
        quiet: true,
        router: {
          mode: 'hash',
          routes: [
            { path: '/home', skeletonId: 'skeleton' },
            { path: '/about', skeletonId: 'skeleton' }
          ]
        }
      })
    )
    // gzip压缩
    config.plugins.push(new CompressionPlugin({
      filename: '[path][name].gz',
      test: /\.(js|css)$/i
    }))
  },
  chainWebpack: (config) => {
    console.log('当前环境为：' + process.env.NODE_ENV)
    config.plugin('html').tap((args) => {
      args[0].title = '广东中医企业微信'
      return args
    })
    // 开发环境可使用 开发工具
    // config.when(process.env.NODE_ENV === 'development', config => config.devtool('cheap-source-map'))
    // 别名 alias
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@comp', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@css', resolve('src/assets/css'))
      .set('@img', resolve('src/assets/img'))
      .set('@utils', resolve('src/utils'))
      .set('@api', resolve('src/api'))
  }
}
