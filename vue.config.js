const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "/",
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
