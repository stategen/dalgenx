<#--
    Copyright (C) 2018  niaoge<78493244@qq.com>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
-->
<@genCopyrightCanEdit api/>
import {connect} from 'dva';
import {${api}Dispatch, ${api?uncap_first}Effects, ${api}Props, ${api?uncap_first}Reducers, ${api}State} from '@i/interfaces/${api}Faces';
import ${api}, {${api}_ID} from "@i/beans/${api}";
import {${api?uncap_first}DefaultColumns} from "@i/columns/${api}Columns";
import {Table, Modal, Col, Button, Popconfirm} from "antd";
import Page from "@components/Page/Page";
import DropOption from "@components/DropOption/DropOption";
import {get${api}FormItemConfigMap} from "@i/forms/${api}FormConfigs";
import {ConnectionPros, operateOptions, cleanSelectRowsProps} from "@utils/DvaUtil";
import {AppProps} from "@i/interfaces/AppFaces";
import {TableProps, TableRowSelection} from "antd/lib/table";
import Row from "antd/lib/grid/row";
import {createModelPage} from "@components/QueryModal/QueryModal";
import {${api}ApiForms} from "@i/forms/${api}ApiForms";
import StatesAlias from "@i/configs/${systemName}Cms-statesAlias";

const {confirm} = Modal;

type ${api}PageProps =AppProps & ${api}Props;

const ${api?uncap_first}Page = (props: ${api}PageProps) => {
  const dispatch = props.dispatch;
  const pathname = props.location;
  const ${api?uncap_first}Area = props.${api?uncap_first}State.${api?uncap_first}Area;
  const ${api?uncap_first}Columns = Object.values(${api?uncap_first}DefaultColumns);

  const onAdd = () => {
    const ${api?uncap_first}State: ${api}State = {
      ${api?uncap_first}Area: {
        type: ${api?uncap_first}Effects.insert,
        item: {},
        doEdit: true,
        cancelState: {
          type: ${api?uncap_first}Reducers.updateState,
          doEdit: false,
        }
      }
    }
    dispatch(${api}Dispatch.updateState_reducer(${api?uncap_first}State));
  };

  const onDeleteItem = (${api?uncap_first}Id) => {
    dispatch(${api}Dispatch.delete_effect({${api?uncap_first}Id}, cleanSelectRowsProps))
  };


  const onEditItem = (${api?uncap_first}) => {
    dispatch(${api}Dispatch.updateState_reducer({
      ${api?uncap_first}Area: {
        type: ${api?uncap_first}Effects.update,
        item: ${api?uncap_first},
        doEdit: true,
        cancelState: {
          type: ${api?uncap_first}Reducers.updateState,
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
          onDeleteItem(record.${api?uncap_first}Id)
        },
      })
    }
  }

  ${api?uncap_first}Columns.push({
    title: 'Operation',
    key: 'operation',
    width: 100,
    render: (text, record: ${api}) => {
      return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={operateOptions}/>
    },
  });

  let ${api}EditorModalPage = null;
  if (${api?uncap_first}Area.doEdit) {
    const isCreate = ${api?uncap_first}Area.type === `${'$'}{${api?uncap_first}Effects.insert}`;
    const title = isCreate ? 'Create' : 'Update';
    const current${api}: ${api} = isCreate ? {} : ${api?uncap_first}Area.item;
    let ${api?uncap_first}FormItemConfigMap = get${api}FormItemConfigMap(current${api});
    ${api}EditorModalPage = createModelPage(true, title, ${api?uncap_first}Area, ${api?uncap_first}FormItemConfigMap, ${api}_ID, dispatch);
  }

  const onFilter = () => {
    dispatch(${api}Dispatch.updateState_reducer({
      ${api?uncap_first}Area: {
        type: ${api?uncap_first}Effects.get${api}PageListByDefaultQuery,
        doQuery: true,
        cancelState: {
          type: ${api?uncap_first}Reducers.updateState,
          doQuery: false,
        }
      }
    }));
  }


  let ${api}QueryForm = null;
  if (${api?uncap_first}Area.doQuery) {
    const title = 'Query';
    const filtersFormConfigs = ${api}ApiForms.get${api}PageListByDefaultQueryFormConfigs(${api?uncap_first}Area.queryRule ? ${api?uncap_first}Area.queryRule : {});
    ${api}QueryForm = createModelPage(false, title, ${api?uncap_first}Area, filtersFormConfigs, "", dispatch);
  }

  const rowSelection: TableRowSelection<${api}> = {
    onChange: (selectedRowKeys, selectedRows) => {
      const dispachData: ${api}State = {
        ${api?uncap_first}Area: {
          selectedRowKeys
        }
      }
      dispatch(${api}Dispatch.updateState_reducer(dispachData));
    },
    getCheckboxProps: (record) => ({
      disabled: record.${api?uncap_first}Id === 'ADMIN',
      /*name: record.name,*/
    }),
  };

  const handleDeleteItems = () => {
    dispatch(${api}Dispatch.deleteBy${api}Ids_effect({${api?uncap_first}Ids: ${api?uncap_first}Area.selectedRowKeys}, cleanSelectRowsProps));
  };

  const pagination = ${api?uncap_first}Area.pagination;
  if (pagination) {
    pagination.onChange = (page: number, pageSize?: number) => {
      dispatch(${api}Dispatch.get${api}PageListByDefaultQuery_effect({...${api?uncap_first}Area.queryRule, pageSize, page}));
    };
    pagination.showSizeChanger = true;
  }

  const tableProps: TableProps<${api}> = {
    rowSelection: rowSelection,
    bordered: true,
    rowKey: (${api?uncap_first}: ${api}) => ${api?uncap_first}.${api?uncap_first}Id,
    dataSource: ${api?uncap_first}Area.list,
    loading: loading.effects[`${'$'}{${api?uncap_first}Effects.getAll}`],
    columns: ${api?uncap_first}Columns,
    pagination: pagination,
  }


  return (
    <Page inner>
      <Row>
        <Col>
          <Button type="ghost" onClick={onAdd}>Create</Button>
          <Button type="ghost" onClick={onFilter}>Filter</Button>
          {
            ${api?uncap_first}Area.selectedRowKeys.length > 0 &&
            <Popconfirm title="Are you sure delete these items?" placement="left" onConfirm={handleDeleteItems}>
              <Button type="primary" style={{marginLeft: 8}}>Remove</Button>
              {`Selected ${'$'}{${api?uncap_first}Area.selectedRowKeys.length} items `}
            </Popconfirm>
          }
        </Col>
      </Row>
      <Table {...tableProps} />
      {${api}EditorModalPage && <${api}EditorModalPage/>}
      {${api}QueryForm && <${api}QueryForm/>}
    </Page>
  )
};

const mapStateToProps = (states: StatesAlias & ConnectionPros) : ${api}PageProps =>{
  const props: ${api}PageProps = {
    appState: states.app,
    ${api?uncap_first}State: states.${api?uncap_first},
    loading: states.loading,
  }
  return props;
}

const ${api}Page = connect(mapStateToProps)(${api?uncap_first}Page);

export default ${api}Page;
