import {resolve} from "path";

export default {
  base: 'pages/',
  publicPath: 'static/',
  hash:true,
  outputPath: '../WebRoot/pages/static',
  // for query-string@6 https://github.com/sorrycc/blog/issues/68
  es5ImcompatibleVersions: true,
  targets: { ie: 11 },
  runtimePublicPath: true,
  devtool: "source-map",
  plugins: [
    [
      'umi-plugin-react',
      {
        dva: true,
        antd: true,
        routes: {
          exclude: [
            /model\.(j|t)sx?$/,
            /service\.(j|t)sx?$/,
            /models\//,
            /components\//,
            /services\//,
            /chart\/Container\.js$/,
            /chart\/ECharts\/.+Component\.sx?$/,
            /chart\/ECharts\/.+ComPonent\.sx?$/,
            /chart\/ECharts\/theme\/.+\.sx?$/,
            /chart\/highCharts\/.+Component\.sx?$/,
            /chart\/highCharts\/mapdata\/.+\.sx?$/,
            /chart\/Recharts\/.+Component\.sx?$/,
            /chart\/Recharts\/Container\.sx?$/,
            /pages\/app\//,

          ],
        },
        dll: {
          exclude: [],
          include: ["dva", "dva/router", "dva/saga", "dva/fetch", "antd/es"],
        },
        hardSource: /* isMac */process.platform === 'darwin',
        dynamicImport: {
          webpackChunkName: true,
          hash:true,
          level: 0,
          loadingComponent: './components/Loader/Loader',
        },
      },
    ],
  ],

  theme: "./theme.config.js",
  // 接口代理示例
  proxy: {
    "/${projectName?uncap_first}/api/v1/weather": {
      "target": "https://api.seniverse.com/",
      "changeOrigin": true,
      "pathRewrite": {"^/${projectName?uncap_first}/api/v1/weather": "/v3/weather"},
    },

    "/api/v1": {
      "target": ":8080",
      "changeOrigin": true,
    },
    // "/api/v2": {
    //   "target": "http://192.168.0.110",
    //   "changeOrigin": true,
    //   "pathRewrite": { "^/api/v2" : "/api/v2" }
    // }
  },
  alias: {
    "@i": resolve(__dirname, "./src/intergrade"),


    "themes": resolve(__dirname, "./src/themes"),
    "@components": resolve(__dirname, "./src/components"),
    "@utils": resolve(__dirname, "./src/utils"),
    "@pages": resolve(__dirname, "./src/pages"),



    "config": "./src/utils/config",
    "services": "./src/services",
    "routes": "./src/routes"
  },
  urlLoaderExcludes: [
    /\.svg$/,
  ],
  ignoreMomentLocale: true,
  chainWebpack (config) {
    config.module.rule('svg')
      .test(/\.svg$/i)
      .use('svg-sprite-loader')
      .loader(require.resolve('svg-sprite-loader')
    );
  },
}
