export default {
  publicPath :'static',
  outputPath :'../WebRoot/pages',
  plugins: [
    'umi-plugin-dva',
    [
      'umi-plugin-routes',
      {
        exclude: [
            /model\.(j|t)sx?$/,
            /service\.(j|t)sx?$/,
            /.+CustomFaces\.(j|t)sx?$/,
            /.+\.(j|t)sx?\~temp$/,
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
          /utils\//,
          /pages\/app\//,
          /intergrade\//,
        ],
      },
    ],
    [
      'umi-plugin-dll',
      {
        exclude: [],
        include: ["dva", "dva/router", "dva/saga", "dva/fetch", "antd/es"],
      },
    ],
    './modifyHTMLScript.js'
  ],
}
