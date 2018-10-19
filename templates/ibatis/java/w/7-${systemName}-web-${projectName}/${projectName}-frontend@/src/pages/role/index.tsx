import {connect} from 'dva';
import {RoleDispatch, roleEffects, RoleProps, roleReducers, RoleState} from '@i/interfaces/RoleFaces';
import Role, {ROLE_ID} from "@i/beans/Role";
import {roleDefaultColumns} from "@i/columns/RoleColumns";
import {Table, Modal, Col, Button, Popconfirm} from "antd";
import Page from "@components/Page/Page";
import User from "@i/beans/User";
import DropOption from "@components/DropOption/DropOption";
import {getRoleFormConfigs} from "@i/forms/RoleFormConfigs";
import {FormItemProps} from "antd/lib/form/FormItem";
import {
  BaseProps,
  AreaState, Payload, ConnectionPros
} from "@utils/DvaUtil";
import {AppProps} from "@i/interfaces/AppFaces";
import {TableProps, TableRowSelection} from "antd/lib/table";
import Row from "antd/lib/grid/row";
import {createModelPage} from "@components/QueryModal/QueryModal";
import {RoleApiForms} from "@i/forms/RoleApiForms";
import StatesAlias from "@i/configs/tradeCms-statesAlias";

const {confirm} = Modal;
const formItemLayout: FormItemProps = {
  labelCol: {
    xs: {span: 32},
    sm: {span: 10},
  },
  wrapperCol: {
    xs: {span: 32},
    sm: {span: 18},
  },
};

const cleanSelectRoleRowsProps: AreaState<Role> = {
  selectedRowKeys: [],
};

const menuOptions = [{key: 'Update', name: 'Update'}, {key: 'Delete', name: 'Delete'}];

const rolePage = ({location, dispatch, roleState, appState, loading}: RoleProps & AppProps & BaseProps) => {
  const {pathname} = location;
  const roleArea = roleState.roleArea;
  const roleColumns = Object.values(roleDefaultColumns);

  const onAdd = () => {
    const roleState: RoleState = {
      roleArea: {
        type: roleEffects.insert,
        item: {},
        doEdit: true,
        cancelState: {
          type: roleReducers.updateState,
          doEdit: false,
        }
      }
    }
    dispatch(RoleDispatch.updateState_reducer(roleState));
  };

  const onDeleteItem = (roleId) => {
    dispatch(RoleDispatch.deleteWithResponse_effect({roleId}, cleanSelectRoleRowsProps))
  };


  const onEditItem = (role) => {
    dispatch(RoleDispatch.updateState_reducer({
      roleArea: {
        type: roleEffects.update,
        item: role,
        doEdit: true,
        cancelState: {
          type: roleReducers.updateState,
          doEdit: false,
        }
      }
    }))
  };

  const handleMenuClick = (record, e) => {
    if (e.key === 'Update') {
      onEditItem(record);
    } else if (e.key === 'Delete') {
      confirm({
        title: 'Are you sure delete this record?',
        onOk: () => {
          onDeleteItem(record.roleId)
        },
      })
    }
  }

  roleColumns.push({
    title: 'Operation',
    key: 'operation',
    width: 100,
    render: (text, record: User) => {
      return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={menuOptions}/>
    },
  });

  let RoleEditorModalPage = null;
  if (roleArea.doEdit) {
    const isCreate = roleArea.type === `${'$'}{roleEffects.insert}`;
    const title = isCreate ? 'Create' : 'Update';
    const currentRole: Role = isCreate ? {} : roleArea.item;
    let roleFormConfigs = getRoleFormConfigs(currentRole);
    RoleEditorModalPage = createModelPage(true, title, roleArea, roleFormConfigs, ROLE_ID, dispatch);
  }

  const onFilter = () => {
    dispatch(RoleDispatch.updateState_reducer({
      roleArea: {
        type: roleEffects.getRolePageListByDefaultQuery,
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
    const title = 'Query';
    const filtersFormConfigs = RoleApiForms.getRolePageListByDefaultQueryFormConfigs(roleArea.queryRule ? roleArea.queryRule : {});
    RoleQueryForm = createModelPage(false, title, roleArea, filtersFormConfigs, "", dispatch);
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
      disabled: record.roleId === 'ADMIN',
      /*name: record.name,*/
    }),
  };

  const handleDeleteItems = () => {
    dispatch(RoleDispatch.batchDelete_effect({roleIds: roleArea.selectedRowKeys}, cleanSelectRoleRowsProps));
  };

  const pagination = roleArea.pagination;
  if (pagination) {
    pagination.onChange = (page: number, pageSize?: number) => {
      dispatch(RoleDispatch.getRolePageListByDefaultQuery_effect({...roleArea.queryRule, pageSize, page}));
    };
    pagination.showSizeChanger = true;
  }

  const tableProps: TableProps<Role> = {
    rowSelection: rowSelection,
    bordered: true,
    rowKey: (role: Role) => role.roleId,
    dataSource: roleArea.list,
    loading: loading.effects[`${'$'}{roleEffects.getAll}`],
    columns: roleColumns,
    pagination: pagination,
  }

  return (
    <Page inner>
      <Row>
        <Col>
          <Button type="ghost" onClick={onAdd}>Create</Button>
          <Button type="ghost" onClick={onFilter}>Filter</Button>
          {
            roleArea.selectedRowKeys.length > 0 &&
            <Popconfirm title="Are you sure delete these items?" placement="left" onConfirm={handleDeleteItems}>
              <Button type="primary" style={{marginLeft: 8}}>Remove</Button>
              {`Selected ${'$'}{roleArea.selectedRowKeys.length} items `}
            </Popconfirm>
          }
        </Col>
      </Row>
      <Table {...tableProps} />
      {RoleEditorModalPage && <RoleEditorModalPage/>}
      {RoleQueryForm && <RoleQueryForm/>}
    </Page>
  )
};

const newVar = connect(({role: roleState, app: appState, loading}: StatesAlias & ConnectionPros) => ({
  roleState,
  appState,
  loading
}))(rolePage);

export default newVar;
