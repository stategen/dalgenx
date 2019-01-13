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
            /pages\/app\//,

          ],
        },
        dll: {
          exclude: [],
          include: ["dva", "dva/router", "dva/saga", "dva/fetch", "antd/es","antd-mobile/es"],
        },
        hardSource: /* isMac */process.platform === 'darwin',
        dynamicImport: {
          webpackChunkName: true,
          hash:true,
          level: 0,
          loadingComponent: './components/loading/index',
        },

        pwa: false,
        hd: false,
        fastClick: true,
        title: 'cnode-with-umi',
      }
    ],
  ],
  alias: {
    "@": resolve(__dirname, "./src/"),
    "@i": resolve(__dirname, "./src/intergrade"),

    "themes": resolve(__dirname, "./src/themes"),
    "@components": resolve(__dirname, "./src/components"),
    "@utils": resolve(__dirname, "./src/utils"),
    "@pages": resolve(__dirname, "./src/pages"),
    "@images": resolve(__dirname, "./src/images"),


    "config": "./src/utils/config",
    "services": "./src/services",
    "routes": "./src/routes"
  },
};
