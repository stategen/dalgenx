import { resolve } from 'path';

module.exports ={
  devtool:"source-map",
  theme: "./theme.config.js",
  // 接口代理示例
  proxy: {
    "/cms/api/v1/weather": {
      "target": "https://api.seniverse.com/",
      "changeOrigin": true,
      "pathRewrite": { "^/cms/api/v1/weather": "/v3/weather" }
    },

    "/api/v1": {
      "target": ":8080",
      "changeOrigin": true,
    }
    // "/api/v2": {
    //   "target": "http://192.168.0.110",
    //   "changeOrigin": true,
    //   "pathRewrite": { "^/api/v2" : "/api/v2" }
    // }
  },
  alias: {
    "@i": resolve(__dirname,"./src/intergrade"),

    "themes": resolve(__dirname, './src/themes'),
    "@components": resolve(__dirname,"./src/components"),
    "@utils": resolve(__dirname,"./src/utils"),
    "@pages": resolve(__dirname,"./src/pages"),
  },
  urlLoaderExcludes: [
    /\.svg$/,
  ],
  ignoreMomentLocale: true
}
