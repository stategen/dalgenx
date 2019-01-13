/**
 *  Do not remove this unless you get business authorization.
 *  AntdPageList
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {TIME_FORMAT, DATE_FORMAT, TIMESTAMP_FORMAT, ColumnConfig, KeyValue, TemporalType} from "@utils/DvaUtil";
import AntdPageList from "../beans/AntdPageList"
import UIColumns from "@utils/UIColumns";

namespace AntdPageListColumns {

  /** list  */
  export const list = {
    key: 'list',
    dataIndex: 'list',
    title: 'list',
    renderColumn: UIColumns.InputRender,
    isArray: true,
    config: {
    },
    render: (text: any, record: AntdPageList<E>, index: number) =>{
      return list.renderColumn(record, null, text, index, list);
    },
  } as ColumnConfig<AntdPageList<E>>;

  /** pagination  */
  export const pagination = {
    key: 'pagination',
    dataIndex: 'pagination',
    title: 'pagination',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: AntdPageList<E>, index: number) =>{
      return pagination.renderColumn(record, null, text, index, pagination);
    },
  } as ColumnConfig<AntdPageList<E>>;


  export const antdPageListRenderColumns = {
    list,
    pagination,
  }

}

export default AntdPageListColumns;