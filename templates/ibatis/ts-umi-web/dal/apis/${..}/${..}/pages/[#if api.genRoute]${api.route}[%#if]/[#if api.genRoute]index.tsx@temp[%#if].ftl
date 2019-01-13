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
import React from 'react';
import {connect} from 'dva';
import {${api}Dispatch, ${api?uncap_first}Effects, ${api}Props, ${api?uncap_first}Reducers, ${api}State} from '@i/interfaces/${api}Faces';
import ${api} from "@i/beans/${api}";
import {Table, Modal, Col, Button, Popconfirm} from "antd";
import Page from "@components/Page/Page";
import DropOption from "@components/DropOption/DropOption";
import {ConnectionPros, operateOptions, cleanSelectRowsProps} from "@utils/DvaUtil";
import {AppProps} from "@i/interfaces/AppFaces";
import {TableProps, TableRowSelection} from "antd/lib/table";
import Row from "antd/lib/grid/row";
import StatesAlias from "@i/configs/tradeCms-statesAlias";
import {FormItemProps} from "antd/es/form/FormItem";
import {ModelPage, ModelPageProps} from "@components/QueryModal/QueryModal";
import Link from "umi/link";
import ${api}Columns from "@i/columns/${api}Columns";
import ${api}ApiForms from "@i/forms/${api}ApiForms";


const {confirm} = Modal;

type ${api}PageProps = AppProps & ${api}Props;

interface HandleMenuClick {
  (e, record: ${api}, index: number): any;
}

const formItemProps: FormItemProps = {
  labelCol: {span: 7},
  wrapperCol: {span: 12},
}
const ${api?uncap_first}IdRender = (text: any, record: ${api}, index: number) => {
  return (
    <Link to={"#"} key={record.${api?uncap_first}Id} title={text}>
      {text}
    </Link>
  )
}
const ${api?uncap_first}Page = (props: ${api}PageProps) => {
  const loading = props.loading;
  const dispatch = props.dispatch;
  const ${api?uncap_first}Area = props.${api?uncap_first}State.${api?uncap_first}Area;
  //自定义渲染
  const ${api?uncap_first}RenderColumns = ${api}Columns.${api?uncap_first}RenderColumns;
  ${api?uncap_first}RenderColumns.${api?uncap_first}Id.render = ${api?uncap_first}IdRender;
  const ${api?uncap_first}Columns = Object.values(${api?uncap_first}RenderColumns);

  const onAdd = () => {
    const ${api?uncap_first}State: ${api}State = {
      ${api?uncap_first}Area: {
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
    const ${api?uncap_first} = props.${api?uncap_first}State.${api?uncap_first}Area.list[index];
    if (${api?uncap_first}) {
      dispatch(${api}Dispatch.delete_effect({${api?uncap_first}Id: ${api?uncap_first}.${api?uncap_first}Id}, cleanSelectRowsProps))
    }
  };


  const onEditItem = (index) => {
    dispatch(${api}Dispatch.updateState_reducer({
      ${api?uncap_first}Area: {
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

  const handleMenuClick = function (e, record: ${api}, index: number) {
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

  ${api?uncap_first}Columns.push({
    title: 'Operation',
    key: 'operation',
    width: 100,
    render: function (text, record: ${api}, index: number) {
      return <DropOption key={index} onMenuClick={e => handleMenuClick(e, record, index)} menuOptions={operateOptions}/>
    },
  });

  let EditorModalPage = null;
  if (${api?uncap_first}Area.doEdit) {
    const index = ${api?uncap_first}Area.index;
    const isCreate = index < 0;
    const title = isCreate ? '创建' : '更新';
    const current: ${api} = isCreate ? {} : ${api?uncap_first}Area.list[index];
    let formItemConfigMap = null;
    let getEditors = null;
    if (isCreate) {
      const insertFormItemConfigMap = ${api}ApiForms.getInsertFormItemConfigMap(current, null, formItemProps);
      //可选1,自动排版，不漂亮,调整顺序也可以
      formItemConfigMap = insertFormItemConfigMap;
    } else {
      //点击 getUpdateFormItemConfigMap 进去即可将以下内容复制出来,然后自定义排版
      const updateFormItemConfigMap = ${api}ApiForms.getUpdateFormItemConfigMap(current, null, formItemProps);
      formItemConfigMap = updateFormItemConfigMap;
      //2.也可以自定义排版，属性可以提示
      getEditors = () => {
        const ${api}IdEditor = updateFormItemConfigMap.${api}Id.Editor;
        const NameEditor = updateFormItemConfigMap.Name.Editor;

        //<#--
        const HoppyIdsEditor = updateFormItemConfigMap.HoppyIds.Editor;
        const CascaderPostAddressIdsEditor = updateFormItemConfigMap.CascaderPostAddressIds.Editor;
        const ${api}nameEditor = updateFormItemConfigMap.${api}name.Editor;
        const PasswordEditor = updateFormItemConfigMap.Password.Editor;
        const RoleTypeEditor = updateFormItemConfigMap.RoleType.Editor;
        const NickNameEditor = updateFormItemConfigMap.NickName.Editor;
        const AgeEditor = updateFormItemConfigMap.Age.Editor;
        const AddressEditor = updateFormItemConfigMap.Address.Editor;
        const AvatarImgIdEditor = updateFormItemConfigMap.AvatarImgId.Editor;
        const EmailEditor = updateFormItemConfigMap.Email.Editor;
        const ValiDatetimeEditor = updateFormItemConfigMap.ValiDatetime.Editor;
        const BirthdayDateEditor = updateFormItemConfigMap.BirthdayDate.Editor;
        const WorkTimeEditor = updateFormItemConfigMap.WorkTime.Editor;
        const ProvinceIdEditor = updateFormItemConfigMap.ProvinceId.Editor;
        const CityIdEditor = updateFormItemConfigMap.CityId.Editor;
        const StatusEditor = updateFormItemConfigMap.Status.Editor;
        const GradeEditor = updateFormItemConfigMap.Grade.Editor;
        const SexEditor = updateFormItemConfigMap.Sex.Editor;
        const PostAddressIdEditor = updateFormItemConfigMap.PostAddressId.Editor;
        //-->
        //
        return (
          <>
            <${api}IdEditor
              readOnly
            >
            </${api}IdEditor>
            <NameEditor
            >
            </NameEditor>
            //{/*<#--*/}
            <HoppyIdsEditor
            >
            </HoppyIdsEditor>
            <CascaderPostAddressIdsEditor
            >
            </CascaderPostAddressIdsEditor>
            <${api}nameEditor
            >
            </${api}nameEditor>
            <PasswordEditor
            >
            </PasswordEditor>
            <RoleTypeEditor
            >
            </RoleTypeEditor>

            <NickNameEditor
            >
            </NickNameEditor>
            <AgeEditor
            >
            </AgeEditor>
            <AddressEditor
            >
            </AddressEditor>
            <AvatarImgIdEditor
            >
            </AvatarImgIdEditor>
            <EmailEditor
            >
            </EmailEditor>
            <ValiDatetimeEditor
            >
            </ValiDatetimeEditor>
            <BirthdayDateEditor
            >
            </BirthdayDateEditor>
            <WorkTimeEditor
            >
            </WorkTimeEditor>
            <ProvinceIdEditor
            >
            </ProvinceIdEditor>
            <CityIdEditor
            >
            </CityIdEditor>
            <StatusEditor
            >
            </StatusEditor>
            <GradeEditor
            >
            </GradeEditor>
            <SexEditor
            >
            </SexEditor>
            <PostAddressIdEditor
            >
            </PostAddressIdEditor>
            // --> */};
            //
          </>
        )

      }
    }


    /*1.调整顺序，自动生成 1,2,3任选*/
    const ${api?uncap_first}FormConfigs = Object.values(formItemConfigMap);
    /*2.或者 调整顺序 */
    // const ${api?uncap_first}FormConfigs: FormItemConfig[] = [];
    // ${api?uncap_first}FormConfigs.push(formItemConfigMap.${api}Name)
    // ${api?uncap_first}FormConfigs.push(formItemConfigMap.${api}Id)
    // ${api?uncap_first}FormConfigs.push(formItemConfigMap.${api}Type)
    /* 自定义排序*/

    const modelPageProps: ModelPageProps<${api}> = {
      record: current,
      isEditor: true,
      title,
      areaState: ${api?uncap_first}Area,
      dispatch,
      formItemConfigs: ${api?uncap_first}FormConfigs,
      getEditors,
    };
    EditorModalPage = <ModelPage {...modelPageProps} />;
  }

  const onFilter = () => {
    dispatch(${api}Dispatch.updateState_reducer({
      ${api?uncap_first}Area: {
        type: ${api?uncap_first}Effects.get${api}PageList,
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
    const title = '查询';
    const record = ${api?uncap_first}Area.queryRule || {};
    const ${api?uncap_first}PageListFormItemConfigMap = ${api}ApiForms.get${api}PageListFormItemConfigMap(record);
    const formItemConfigs = Object.values(${api?uncap_first}PageListFormItemConfigMap);
    const modelPageProps = {record, isEditor: false, title, areaState: ${api?uncap_first}Area, dispatch, formItemConfigs}
    ${api}QueryForm = <ModelPage {...modelPageProps}/>;
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
      disabled: false,//record.${api?uncap_first}Id === 'ADMIN',
      /*name: record.name,*/
    }),
  };

  const handleDeleteItems = () => {
    dispatch(${api}Dispatch.deleteBy${api}Ids_effect({${api?uncap_first}Ids: ${api?uncap_first}Area.selectedRowKeys}, cleanSelectRowsProps));
  };

  const pagination = ${api?uncap_first}Area.pagination;
  if (pagination) {
    pagination.onChange = (page: number, pageSize?: number) => {
      dispatch(${api}Dispatch.get${api}PageList_effect({...${api?uncap_first}Area.queryRule, pageSize, page}));
    };
    pagination.showSizeChanger = true;
  }

  const tableProps: TableProps<${api}> = {
    rowSelection: rowSelection,
    bordered: true,
    rowKey: (${api?uncap_first}: ${api}) => ${api?uncap_first}.${api?uncap_first}Id,
    dataSource: ${api?uncap_first}Area.list,
    loading: loading.effects[${api?uncap_first}Effects.get${api}PageList.toString()],
    columns: ${api?uncap_first}Columns,
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
            ${api?uncap_first}Area.selectedRowKeys.length > 0 &&
            <Popconfirm title="Are you sure delete these items?" placement="left" onConfirm={handleDeleteItems}>
              <Button type="primary" style={{marginLeft: 8}}>删除</Button>
              {'Selected ' + ${api?uncap_first}Area.selectedRowKeys.length + ' items'}
            </Popconfirm>
          }
        </Col>
      </Row>
      <Table {...tableProps} />
      {EditorModalPage && {...EditorModalPage}}
      {${api}QueryForm && {...${api}QueryForm}}
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
