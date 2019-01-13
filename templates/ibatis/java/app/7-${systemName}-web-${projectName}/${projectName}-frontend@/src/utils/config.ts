// const APIV1 = '/api/v1'
// const APIV2 = '/api/v2'



import AppApis from "@i/apis/AppApis";
import FileSummaryApis from "@i/apis/FileSummaryApis";
//typecript
let uploadApi=null;
uploadApi=FileSummaryApis.upload;

const config = {
  openPages: ['/login'],
  optionsApis:AppApis,
  uploadApi,
}

export  default  config;
