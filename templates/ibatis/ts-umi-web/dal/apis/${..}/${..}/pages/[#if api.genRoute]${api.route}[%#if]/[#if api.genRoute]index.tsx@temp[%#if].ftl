/**
 *  Do not remove this unless you get business authorization.
 *  ${api}
 *  init by [stategen.progen] ,can be edit manually ,keep when "keep this"
 *  由 [stategen.progen]代码生成器初始化，可以手工修改,但如果遇到 keep this ,请保留导出设置以备外部自动化调用
 */
<#assign bean>${StringUtil.trimLeftTo(api,'_')?cap_first}</#assign>
import {connect} from 'dva';
import {${api}Dispatch, ${api?uncap_first}Effects, ${api}Props, ${api?uncap_first}Reducers, ${api}State} from '@i/interfaces/${api}Faces';
import ${bean} from "@i/beans/${bean}";
import {${bean?uncap_first}DefaultColumns} from "@i/columns/${bean}Columns";
import {Table, Modal, Col, Button, Popconfirm, Form} from "antd";
import Page from "@components/Page/Page";
import DropOption from "@components/DropOption/DropOption";
import {get${bean}FormItemConfigMap, ${bean}FormItemConfigMap} from "@i/forms/${bean}FormConfigs";
import {ConnectionPros, operateOptions, cleanSelectRowsProps, KeyValue,} from "@utils/DvaUtil";
import {AppProps} from "@i/interfaces/AppFaces";
import {TableProps, TableRowSelection} from "antd/lib/table";
import Row from "antd/lib/grid/row";
import {${api}ApiForms} from "@i/forms/${api}ApiForms";
import StatesAlias from "@i/configs/tradeCms-statesAlias";
import UIUtil from "@utils/UIUtil";
import FormItem, {FormItemProps} from "antd/es/form/FormItem";
import {createModelPage} from "@components/QueryModal/QueryModal";
import Link from "umi/link";


const {confirm} = Modal;

type ${api}PageProps = AppProps & ${api}Props;

interface HandleMenuClick {
  (e, record: ${bean}, index: number): any;
}

const ${bean?uncap_first}IdRender = (text: any, record: ${bean}, index: number) =>{
  return (
    <Link to={"#"} key={record.${bean?uncap_first}Id} title={text}>
      {text}
    </Link>
  )
}
const ${api?uncap_first}Page = (props: ${api}PageProps) => {
  const loading = props.loading;
  const dispatch = props.dispatch;
  const ${bean?uncap_first}Area = props.${api?uncap_first}State.${bean?uncap_first}Area;
  //自定义渲染
  ${bean?uncap_first}DefaultColumns.${bean?uncap_first}Id.render=${bean?uncap_first}IdRender;
  const ${bean?uncap_first}Columns = Object.values(${bean?uncap_first}DefaultColumns);

  const onAdd = () => {
    const ${api?uncap_first}State: ${api}State = {
      ${bean?uncap_first}Area: {
        type: ${api?uncap_first}Effects.insert,
        index: -1,
        doEdit: true,
        cancelState: {
          type: ${api?uncap_first}Reducers.updateState,
          doEdit: false,
        }
      }
    }
    dispatch(${api}Dispatch.updateState_reducer(${api?uncap_first}State));
  };

  const onDeleteItem = (index) => {
    const ${bean?uncap_first} = props.${api?uncap_first}State.${bean?uncap_first}Area.list[index];
    if (${bean?uncap_first}) {
      dispatch(${api}Dispatch.delete_effect({${bean?uncap_first}Id: ${bean?uncap_first}.${bean?uncap_first}Id}, cleanSelectRowsProps))
    }
  };


  const onEditItem = (index) => {
    dispatch(${api}Dispatch.updateState_reducer({
      ${bean?uncap_first}Area: {
        type: ${api?uncap_first}Effects.update,
        index,
        doEdit: true,
        cancelState: {
          type: ${api?uncap_first}Reducers.updateState,
          doEdit: false,
          index: -1,
        }
      }
    }))
  };

  const handleMenuClick = function (e, record: ${bean}, index: number) {
    if (e.key === 'Update') {
      onEditItem(index);
    } else if (e.key === 'Delete') {
      confirm({
        title: 'Are you sure delete this record?',
        onOk: () => {
          onDeleteItem(index)
        },
      })
    }
  } as HandleMenuClick;

  ${bean?uncap_first}Columns.push({
    title: 'Operation',
    key: 'operation',
    width: 100,
    render: function (text, record: ${bean}, index: number) {
      return <DropOption key={index} onMenuClick={e => handleMenuClick(e, record, index)} menuOptions={operateOptions}/>
    },
  });

  let ${bean}EditorModalPage = null;
  if (${bean?uncap_first}Area.doEdit) {
    const index = ${bean?uncap_first}Area.index;
    const isCreate = index < 0;
    const title = isCreate ? '创建' : '更新';
    const current${bean}: ${bean} = isCreate ? {} : ${bean?uncap_first}Area.list[index];
    const ${bean?uncap_first}FormConfigMap = get${bean}FormItemConfigMap(current${bean});
    //1.调整顺序，自动生成 1,2,3任选
    const ${bean?uncap_first}FormConfigs = Object.values(${bean?uncap_first}FormConfigMap);
    //2.调整顺序
    // const ${bean?uncap_first}FormConfigs: FormItemConfig[] = [];
    // ${bean?uncap_first}FormConfigs.push(${bean?uncap_first}FormConfigMap.${bean}Name)
    // ${bean?uncap_first}FormConfigs.push(${bean?uncap_first}FormConfigMap.${bean}Id)
    // ${bean?uncap_first}FormConfigs.push(${bean?uncap_first}FormConfigMap.${bean}Type)
    ${bean}EditorModalPage = createModelPage(true, title, ${bean?uncap_first}Area, dispatch, ${bean?uncap_first}FormConfigs, null);

    //3.写定义组件
    // const customBuildFormItem: UIUtil.CustomBuildFormItem<${bean}FormItemConfigMap> = (formItemPropsMap: KeyValue<${bean}FormItemConfigMap, FormItemProps>) => {
    //   return (
    //     <>
    //       <FormItem
    //         {...formItemPropsMap.${api}Id}
    //       >
    //       </FormItem>
    //
    //       <FormItem
    //         {...formItemPropsMap.${api}Type}
    //       >
    //       </FormItem>
    //       <FormItem
    //         {...formItemPropsMap.${api}Name}
    //       >
    //       </FormItem>
    //       <FormItem
    //         {...formItemPropsMap.Description}
    //       >
    //       </FormItem>
    //     </>
    //   )
    // }
    // ${bean}EditorModalPage = createModelPage(true, title, ${bean?uncap_first}Area, dispatch, ${bean?uncap_first}FormConfigMap, customBuildFormItem);
  }

  const onFilter = () => {
    dispatch(${api}Dispatch.updateState_reducer({
      ${bean?uncap_first}Area: {
        type: ${api?uncap_first}Effects.get${bean}PageList,
        doQuery: true,
        cancelState: {
          type: ${api?uncap_first}Reducers.updateState,
          doQuery: false,
        }
      }
    }));
  }


  let ${bean}QueryForm = null;
  if (${bean?uncap_first}Area.doQuery) {
    const title = 'Query';
    const ${bean?uncap_first}PageListFormItemConfigMap = ${api}ApiForms.getGet${bean}PageListFormItemConfigMap(${bean?uncap_first}Area.queryRule ? ${bean?uncap_first}Area.queryRule : {});
    const formItemConfigs = Object.values(${bean?uncap_first}PageListFormItemConfigMap);
    ${bean}QueryForm = createModelPage(false, title, ${bean?uncap_first}Area, dispatch, formItemConfigs);
  }

  const rowSelection: TableRowSelection<${bean}> = {
    onChange: (selectedRowKeys, selectedRows) => {
      const dispachData: ${api}State = {
        ${bean?uncap_first}Area: {
          selectedRowKeys
        }
      }
      dispatch(${api}Dispatch.updateState_reducer(dispachData));
    },
    getCheckboxProps: (record) => ({
      disabled: false,//record.${bean?uncap_first}Id === 'ADMIN',
      /*name: record.name,*/
    }),
  };

  const handleDeleteItems = () => {
    dispatch(${api}Dispatch.deleteBy${bean}Ids_effect({${bean?uncap_first}Ids: ${bean?uncap_first}Area.selectedRowKeys}, cleanSelectRowsProps));
  };

  const pagination = ${bean?uncap_first}Area.pagination;
  if (pagination) {
    pagination.onChange = (page: number, pageSize?: number) => {
      dispatch(${api}Dispatch.get${bean}PageList_effect({...${bean?uncap_first}Area.queryRule, pageSize, page}));
    };
    pagination.showSizeChanger = true;
  }

  const tableProps: TableProps<${bean}> = {
    rowSelection: rowSelection,
    bordered: true,
    rowKey: (${bean?uncap_first}: ${bean}) => ${bean?uncap_first}.${bean?uncap_first}Id,
    dataSource: ${bean?uncap_first}Area.list,
    loading: loading.effects[${api?uncap_first}Effects.get${bean}PageList.toString()],
    columns: ${bean?uncap_first}Columns,
    pagination: pagination,
  }


  return (
    <Page
      inner>
      <Row>
        <Col>
          <Button type="ghost" onClick={onAdd}>创建</Button>
          <Button type="ghost" onClick={onFilter}>查询</Button>
          {
            ${bean?uncap_first}Area.selectedRowKeys.length > 0 &&
            <Popconfirm title="Are you sure delete these items?" placement="left" onConfirm={handleDeleteItems}>
              <Button type="primary" style={{marginLeft: 8}}>删除</Button>
              {'Selected '+${bean?uncap_first}Area.selectedRowKeys.length+' items' }
            </Popconfirm>
          }
        </Col>
      </Row>
      <Table {...tableProps} />
      {${bean}EditorModalPage && <${bean}EditorModalPage/>}
      {${bean}QueryForm && <${bean}QueryForm/>}
    </Page>
  )
};

const mapStateToProps = (states: StatesAlias & ConnectionPros): ${api}PageProps => {
  const props: ${api}PageProps = {
    appState: states.app,
    ${api?uncap_first}State: states.${api?uncap_first},
    loading: states.loading,
  }
  return props;
}

const ${api}Page = connect(mapStateToProps)(${api?uncap_first}Page);

export default ${api}Page;
