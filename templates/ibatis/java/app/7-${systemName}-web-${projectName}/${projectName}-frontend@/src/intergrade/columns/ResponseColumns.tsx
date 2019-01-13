/**
 *  Do not remove this unless you get business authorization.
 *  Response
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {TIME_FORMAT, DATE_FORMAT, TIMESTAMP_FORMAT, ColumnConfig, KeyValue, TemporalType} from "@utils/DvaUtil";
import Response from "../beans/Response"
import UIColumns from "@utils/UIColumns";
import {responseStatusOptions} from '../enums/ResponseStatus';

namespace ResponseColumns {

  /** code  */
  export const code = {
    key: 'code',
    dataIndex: 'code',
    title: 'code',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: Response<T>, index: number) =>{
      return code.renderColumn(record, null, text, index, code);
    },
  } as ColumnConfig<Response<T>>;

  /** exeptionClass  */
  export const exeptionClass = {
    key: 'exeptionClass',
    dataIndex: 'exeptionClass',
    title: 'exeptionClass',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: Response<T>, index: number) =>{
      return exeptionClass.renderColumn(record, null, text, index, exeptionClass);
    },
  } as ColumnConfig<Response<T>>;

  /** data  */
  export const data = {
    key: 'data',
    dataIndex: 'data',
    title: 'data',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: Response<T>, index: number) =>{
      return data.renderColumn(record, null, text, index, data);
    },
  } as ColumnConfig<Response<T>>;

  /** status  */
  export const status = {
    key: 'status',
    dataIndex: 'status',
    title: 'status',
    renderColumn: UIColumns.SelectRender,
    isEnum: true,
    referConfig: {
      options: responseStatusOptions,
    },
    config: {
    },
    render: (text: any, record: Response<T>, index: number) =>{
      return status.renderColumn(record, null, text, index, status);
    },
  } as ColumnConfig<Response<T>>;

  /** message  */
  export const message = {
    key: 'message',
    dataIndex: 'message',
    title: 'message',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: Response<T>, index: number) =>{
      return message.renderColumn(record, null, text, index, message);
    },
  } as ColumnConfig<Response<T>>;

  /** success  */
  export const success = {
    key: 'success',
    dataIndex: 'success',
    title: 'success',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: Response<T>, index: number) =>{
      return success.renderColumn(record, null, text, index, success);
    },
  } as ColumnConfig<Response<T>>;


  export const responseRenderColumns = {
    code,
    exeptionClass,
    data,
    status,
    message,
    success,
  }

}

export default ResponseColumns;