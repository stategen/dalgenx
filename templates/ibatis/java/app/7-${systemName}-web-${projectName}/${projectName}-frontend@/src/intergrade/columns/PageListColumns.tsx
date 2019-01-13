/**
 *  Do not remove this unless you get business authorization.
 *  PageList
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {TIME_FORMAT, DATE_FORMAT, TIMESTAMP_FORMAT, ColumnConfig, KeyValue, TemporalType} from "@utils/DvaUtil";
import PageList from "../beans/PageList"
import UIColumns from "@utils/UIColumns";

namespace PageListColumns {

  /** pageSize  */
  export const pageSize = {
    key: 'pageSize',
    dataIndex: 'pageSize',
    title: 'pageSize',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: PageList<E>, index: number) =>{
      return pageSize.renderColumn(record, null, text, index, pageSize);
    },
  } as ColumnConfig<PageList<E>>;

  /** pageNum  */
  export const pageNum = {
    key: 'pageNum',
    dataIndex: 'pageNum',
    title: 'pageNum',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: PageList<E>, index: number) =>{
      return pageNum.renderColumn(record, null, text, index, pageNum);
    },
  } as ColumnConfig<PageList<E>>;

  /** totalCount  */
  export const totalCount = {
    key: 'totalCount',
    dataIndex: 'totalCount',
    title: 'totalCount',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: PageList<E>, index: number) =>{
      return totalCount.renderColumn(record, null, text, index, totalCount);
    },
  } as ColumnConfig<PageList<E>>;

  /** totalPages  */
  export const totalPages = {
    key: 'totalPages',
    dataIndex: 'totalPages',
    title: 'totalPages',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: PageList<E>, index: number) =>{
      return totalPages.renderColumn(record, null, text, index, totalPages);
    },
  } as ColumnConfig<PageList<E>>;

  /** items  */
  export const items = {
    key: 'items',
    dataIndex: 'items',
    title: 'items',
    renderColumn: UIColumns.InputRender,
    isArray: true,
    config: {
    },
    render: (text: any, record: PageList<E>, index: number) =>{
      return items.renderColumn(record, null, text, index, items);
    },
  } as ColumnConfig<PageList<E>>;

  /** pagination  */
  export const pagination = {
    key: 'pagination',
    dataIndex: 'pagination',
    title: 'pagination',
    renderColumn: UIColumns.InputRender,
    config: {
    },
    render: (text: any, record: PageList<E>, index: number) =>{
      return pagination.renderColumn(record, null, text, index, pagination);
    },
  } as ColumnConfig<PageList<E>>;


  export const pageListRenderColumns = {
    pageSize,
    pageNum,
    totalCount,
    totalPages,
    items,
    pagination,
  }

}

export default PageListColumns;