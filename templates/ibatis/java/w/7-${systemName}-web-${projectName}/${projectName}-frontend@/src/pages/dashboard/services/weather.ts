import { config } from '@utils/index'
import {Method, Net, RequestInitEx} from '@utils/Net'
import {apiUrlKey} from "@i/configs/tradeCms-config";

const { APIV1 } = config

export function query (params) {
//   params.key = 'i7sau1babuzwhycn'
//   return Net.request(null,{
//     url: `https://api.seniverse.com/v3/weather/now.json`,
//     method: 'get',
//     data: params,
//   })

  params.key = 'i7sau1babuzwhycn';
  let requestInit: RequestInitEx = <RequestInitEx>{};
  requestInit.apiUrlKey = apiUrlKey;
  requestInit.url = '/api/v1/weather/now.json';
  requestInit.data = params;
  requestInit.method = Method.GET;
  return Net.fetch(requestInit);
}
