/**
 *  Do not remove this unless you get business authorization.
 *  AntdPageList
 *  created by [stategen.progen] ,do not edit it manually otherwise your code will be override by next call progen,
 *  由 [stategen.progen]代码生成器创建，不要手动修改,否则将在下次创建时自动覆盖
 */
import {PaginationProps} from 'antd/es/pagination';
import {Bean} from "@utils/DvaUtil";


export default interface AntdPageList<E> extends Bean {

  /** list */
  list?: E[];

  /** pagination */
  pagination?: PaginationProps;

}

