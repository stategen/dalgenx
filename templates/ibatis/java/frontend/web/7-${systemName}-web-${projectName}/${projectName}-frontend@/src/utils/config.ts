// const APIV1 = '/api/v1'
// const APIV2 = '/api/v2'



import AppApis from "@i/apis/AppApis";
import FileSummaryApis from "@i/apis/FileSummaryApis";
//typecript
let uploadApi=null;
uploadApi=FileSummaryApis.upload;

const config = {
  name: 'AntD Admin',
  prefix: 'antdAdmin',
  footerText: 'Ant Design Admin  © 2018 zuiidea',
  logo: './static/public/logo.svg',
  iconFontCSS: './static/public/iconfont.css',
  iconFontJS: './static/public/iconfont.js',
  openPages: ['/login'],
  optionsApis:AppApis,
  uploadApi,
}

export  default  config;
