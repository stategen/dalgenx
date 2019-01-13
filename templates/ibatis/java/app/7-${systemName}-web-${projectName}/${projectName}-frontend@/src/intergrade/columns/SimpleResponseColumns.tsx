/**
 *  Do not remove this unless you get business authorization.
 *  SimpleResponse
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {TIME_FORMAT, DATE_FORMAT, TIMESTAMP_FORMAT, ColumnConfig, KeyValue, TemporalType} from "@utils/DvaUtil";
import SimpleResponse from "../beans/SimpleResponse"
import UIColumns from "@utils/UIColumns";

namespace SimpleResponseColumns {

  /** message  */
  export const message = {
    key: 'message',
    dataIndex: 'message',
    title: 'message',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: SimpleResponse, index: number) =>{
      return message.renderColumn(record, null, text, index, message);
    },
  } as ColumnConfig<SimpleResponse>;

  /** success  */
  export const success = {
    key: 'success',
    dataIndex: 'success',
    title: 'success',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: SimpleResponse, index: number) =>{
      return success.renderColumn(record, null, text, index, success);
    },
  } as ColumnConfig<SimpleResponse>;


  export const simpleResponseRenderColumns = {
    message,
    success,
  }

}

export default SimpleResponseColumns;