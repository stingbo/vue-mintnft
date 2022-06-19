const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  // pluginOptions: [new NodePolyfillPlugin()],
  publicPath: "/",
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:82",
        changeOrigin: true,
        wx: true,
        secure: false,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
});
