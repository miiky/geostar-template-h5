/*
 * @Description: vue配置文件
 * @Author: miiky_yang
 * @Date: 2020-06-22 10:58:56
 * @LastEditors: miiky_yang
 * @LastEditTime: 2020-07-07 13:14:17
 */
// 是否为生产环境
const isProduction = process.env.NODE_ENV !== "development"

// gzip压缩
const CompressionWebpackPlugin = require("compression-webpack-plugin")

const path = require("path") //引入path模块
let resolve = dir => {
  return path.join(__dirname, dir) //path.join(__dirname)设置绝对路径
}
module.exports = {
  publicPath: "./",
  lintOnSave: false,
  productionSourceMap: false,
  configureWebpack: config => {
    // 生产环境相关配置
    if (isProduction) {
      //gzip压缩
      const productionGzipExtensions = ["html", "js", "css"]
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
          threshold: 10240, // 只有大小大于该值的资源会被处理 10240
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false // 删除原文件
        })
      );
      // 公共代码抽离
      config.optimization = {
        splitChunks: {
          cacheGroups: {
            vendor: {
              chunks: "all",
              test: /node_modules/,
              name: "vendor",
              minChunks: 1,
              maxInitialRequests: 5,
              minSize: 0,
              priority: 100
            },
            common: {
              chunks: "all",
              test: /[\\/]src[\\/]js[\\/]/,
              name: "common",
              minChunks: 2,
              maxInitialRequests: 5,
              minSize: 0,
              priority: 60
            },
            styles: {
              name: "styles",
              test: /\.(sa|sc|c)ss$/,
              chunks: "all",
              enforce: true
            },
            runtimeChunk: {
              name: "manifest"
            }
          }
        }
      }
    }
  },
  chainWebpack: config => {
    // 别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("_a", resolve("src/assets"))
      .set("_c", resolve("src/components"))
      .set("_l", resolve("src/libs"))
      .set("_u", resolve("src/utils"))
      .set("_v", resolve("src/views"))
  },
  css: {
    loaderOptions: {
      // css: {
      //   localIdentName: '[name]__[local]-[hash:base64:5]',
      //   camelCase: true
      // },
      less: {
        modifyVars: {
          // 通过 less 文件覆盖（文件路径为绝对路径）
          hack: `true; @import "${path.join(__dirname,
            'src/assets/style/geo-vant-cover.less'
          )}";`
        }
      }
    }
  },
  devServer: {
    open: false,
    port: 8088,
    hot: true
    // 代理地址
  }
}