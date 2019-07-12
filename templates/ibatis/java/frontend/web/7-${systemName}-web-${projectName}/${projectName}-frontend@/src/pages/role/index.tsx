/**
 *  Do not remove this unless you get business authorization.
 *  Role
 *  init by [stategen.progen] ,can be edit manually ,keep when "keep this"
 *  由 [stategen.progen]代码生成器初始化，可以手工修改,但如果遇到 keep this ,请保留导出设置以备外部自动化调用
 */
import React from 'react';
import {connect} from 'dva';
import {RoleDispatch, roleEffects, RoleProps, roleReducers, RoleState} from '@i/interfaces/RoleFaces';
import Role from "@i/beans/Role";
import {Table, Modal, Col, Button, Popconfirm} from "antd";
import Page from "@components/Page/Page";
import DropOption from "@components/DropOption/DropOption";
import {ConnectionPros, operateOptions, cleanSelectRowsProps} from "@utils/DvaUtil";
import {AppProps} from "@i/interfaces/AppFaces";
import {TableProps, TableRowSelection} from "antd/lib/table";
import Row from "antd/lib/grid/row";
import StatesAlias from "@i/configs/${systemName?uncap_first}${projectName?cap_first}-statesAlias";
import {FormItemProps} from "antd/es/form/FormItem";
import {ModelPage, ModelPageProps} from "@components/QueryModal/QueryModal";
import Link from "umi/link";
import RoleColumns from "@i/columns/RoleColumns";
import RoleApiForms from "@i/forms/RoleApiForms";


const {confirm} = Modal;

type RolePageProps = AppProps & RoleProps;

interface HandleMenuClick {
  (e, record: Role, index: number): any;
}

const formItemProps: FormItemProps = {
  labelCol: {span: 7},
  wrapperCol: {span: 12},
}
const roleIdRender = (text: any, record: Role, index: number) => {
  return (
    <Link to={"#"} key={record.roleId} title={text}>
      {text}
    </Link>
  )
}
const rolePage = (props: RolePageProps) => {
  const loading = props.loading;
  const dispatch = props.dispatch;
  const roleArea = props.roleState.roleArea;
  //自定义渲染
  const renderColumns = RoleColumns.renderColumns;
  renderColumns.roleId.render = roleIdRender;
  const roleColumns = Object.values(renderColumns);

  const onAdd = () => {
    const roleState: RoleState = {
      roleArea: {
        type: roleEffects.insert,
        index: -1,
        doEdit: true,
        cancelState: {
          type: roleReducers.updateState,
          doEdit: false,
        }
      }
    }
    dispatch(RoleDispatch.updateState_reducer(roleState));
  };

  const onDeleteItem = (index) => {
    const role = props.roleState.roleArea.list[index];
    if (role) {
      dispatch(RoleDispatch.delete_effect({roleId: role.roleId}, cleanSelectRowsProps))
    }
  };


  const onEditItem = (index) => {
    dispatch(RoleDispatch.updateState_reducer({
      roleArea: {
        type: roleEffects.update,
        index,
        doEdit: true,
        cancelState: {
          type: roleReducers.updateState,
          doEdit: false,
          index: -1,
        }
      }
    }))
  };

  const handleMenuClick = function (e, record: Role, index: number) {
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

  roleColumns.push({
    title: 'Operation',
    key: 'operation',
    width: 100,
    render: function (text, record: Role, index: number) {
      return <DropOption key={index} onMenuClick={e => handleMenuClick(e, record, index)} menuOptions={operateOptions}/>
    },
  });

  let EditorModalPage = null;
  if (roleArea.doEdit) {
    const index = roleArea.index;
    const isCreate = index < 0;
    const title = isCreate ? '创建' : '更新';
    const current: Role = isCreate ? {} : roleArea.list[index];
    let formItemConfigMap = null;
    let getEditors = null;
    if (isCreate) {
      const insertFormItemConfigMap = RoleApiForms.getInsertFormItemConfigMap(current, null, formItemProps);
      //可选1,自动排版，不漂亮,调整顺序也可以
      formItemConfigMap = insertFormItemConfigMap;
    } else {
      //点击 getUpdateFormItemConfigMap 进去即可将以下内容复制出来,然后自定义排版
      const updateFormItemConfigMap = RoleApiForms.getUpdateFormItemConfigMap(current, null, formItemProps);
      formItemConfigMap = updateFormItemConfigMap;
      //2.也可以自定义排版，属性可以提示
      getEditors = () => {
        const RoleIdEditor = updateFormItemConfigMap.RoleId.Editor;
        const RoleNameEditor = updateFormItemConfigMap.RoleName.Editor

        //        //
        return (
          <>
            <RoleIdEditor
              readOnly
            >
            </RoleIdEditor>
            <RoleNameEditor
            >
            </RoleNameEditor>
            //{/* */};
            //
          </>
        )

      }
    }


    /*1.调整顺序，自动生成 1,2,3任选*/
    const roleFormConfigs = Object.values(formItemConfigMap);
    /*2.或者 调整顺序 */
    // const roleFormConfigs: FormItemConfig[] = [];
    // roleFormConfigs.push(formItemConfigMap.RoleName)
    // roleFormConfigs.push(formItemConfigMap.RoleId)
    // roleFormConfigs.push(formItemConfigMap.RoleType)
    /* 自定义排序*/

    const modelPageProps: ModelPageProps<Role> = {
      record: current,
      isEditor: true,
      title,
      areaState: roleArea,
      dispatch,
      formItemConfigs: roleFormConfigs,
      getEditors,
    };
    EditorModalPage = <ModelPage {...modelPageProps} />;
  }

  const onFilter = () => {
    dispatch(RoleDispatch.updateState_reducer({
      roleArea: {
        type: roleEffects.getRolePageList,
        doQuery: true,
        cancelState: {
          type: roleReducers.updateState,
          doQuery: false,
        }
      }
    }));
  }


  let RoleQueryForm = null;
  if (roleArea.doQuery) {
    const title = '查询';
    const record = roleArea.queryRule || {};
    const rolePageListFormItemConfigMap = RoleApiForms.getRolePageListFormItemConfigMap(record);
    const formItemConfigs = Object.values(rolePageListFormItemConfigMap);
    const modelPageProps = {record, isEditor: false, title, areaState: roleArea, dispatch, formItemConfigs}
    RoleQueryForm = <ModelPage {...modelPageProps}/>;
  }

  const rowSelection: TableRowSelection<Role> = {
    onChange: (selectedRowKeys, selectedRows) => {
      const dispachData: RoleState = {
        roleArea: {
          selectedRowKeys
        }
      }
      dispatch(RoleDispatch.updateState_reducer(dispachData));
    },
    getCheckboxProps: (record) => ({
      disabled: false,//record.roleId === 'ADMIN',
      /*name: record.name,*/
    }),
  };

  const handleDeleteItems = () => {
    dispatch(RoleDispatch.deleteByRoleIds_effect({roleIds: roleArea.selectedRowKeys}, cleanSelectRowsProps));
  };

  const pagination = roleArea.pagination;
  if (pagination) {
    pagination.onChange = (page: number, pageSize?: number) => {
      dispatch(RoleDispatch.getRolePageList_effect({...roleArea.queryRule, pageSize, page}));
    };
    pagination.showSizeChanger = true;
  }

  const tableProps: TableProps<Role> = {
    rowSelection: rowSelection,
    bordered: true,
    rowKey: (role: Role) => role.roleId,
    dataSource: roleArea.list,
    loading: loading.effects[roleEffects.getRolePageList.toString()],
    columns: roleColumns,
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
            roleArea.selectedRowKeys.length > 0 &&
            <Popconfirm title="Are you sure delete these items?" placement="left" onConfirm={handleDeleteItems}>
              <Button type="primary" style={{marginLeft: 8}}>删除</Button>
              {'Selected ' + roleArea.selectedRowKeys.length + ' items'}
            </Popconfirm>
          }
        </Col>
      </Row>
      <Table {...tableProps} />
      {EditorModalPage && {...EditorModalPage}}
      {RoleQueryForm && {...RoleQueryForm}}
    </Page>
  )
};

const mapStateToProps = (states: StatesAlias & ConnectionPros): RolePageProps => {
  const props: RolePageProps = {
    appState: states.app,
    roleState: states.role,
    loading: states.loading,
  }
  return props;
}

const RolePage = connect(mapStateToProps)(rolePage);

export default RolePage;
