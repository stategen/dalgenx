/**
 *  Do not remove this unless you get business authorization.
 *  User
 *  init by [stategen.progen] ,can be edit manually ,keep when "keep this"
 *  由 [stategen.progen]代码生成器初始化，可以手工修改,但如果遇到 keep this ,请保留导出设置以备外部自动化调用
 */
import React from 'react';
import {connect} from 'dva';
import {UserDispatch, userEffects, UserProps, userReducers, UserState} from '@i/interfaces/UserFaces';
import User from "@i/beans/User";
import {Table, Modal, Col, Button, Popconfirm} from "antd";
import Page from "@components/Page/Page";
import DropOption from "@components/DropOption/DropOption";
import {ConnectionPros, operateOptions, cleanSelectRowsProps} from "@utils/DvaUtil";
import {AppProps} from "@i/interfaces/AppFaces";
import {TableProps, TableRowSelection} from "antd/lib/table";
import Row from "antd/lib/grid/row";
import StatesAlias from "@i/configs/${appName?uncap_first}-statesAlias";
import {FormItemProps} from "antd/es/form/FormItem";
import {ModelPage, ModelPageProps} from "@components/QueryModal/QueryModal";
import Link from "umi/link";
import UserColumns from "@i/columns/UserColumns";
import UserApiForms from "@i/forms/UserApiForms";


const {confirm} = Modal;

type UserPageProps = AppProps & UserProps;

interface HandleMenuClick {
  (e, record: User, index: number): any;
}

const formItemProps: FormItemProps = {
  labelCol: {span: 7},
  wrapperCol: {span: 12},
}
const userIdRender = (text: any, record: User, index: number) => {
  return (
    <Link to={"#"} key={record.userId} title={text}>
      {text}
    </Link>
  )
}
const userPage = (props: UserPageProps) => {
  const loading = props.loading;
  const dispatch = props.dispatch;
  const userArea = props.userState.userArea;
  //自定义渲染
  const userRenderColumns = UserColumns.userRenderColumns;
  userRenderColumns.userId.render = userIdRender;
  const userColumns = Object.values(userRenderColumns);

  const onAdd = () => {
    const userState: UserState = {
      userArea: {
        type: userEffects.insert,
        index: -1,
        doEdit: true,
        cancelState: {
          type: userReducers.updateState,
          doEdit: false,
        }
      }
    }
    dispatch(UserDispatch.updateState_reducer(userState));
  };

  const onDeleteItem = (index) => {
    const user = props.userState.userArea.list[index];
    if (user) {
      dispatch(UserDispatch.delete_effect({userId: user.userId}, cleanSelectRowsProps))
    }
  };


  const onEditItem = (index) => {
    dispatch(UserDispatch.updateState_reducer({
      userArea: {
        type: userEffects.update,
        index,
        doEdit: true,
        cancelState: {
          type: userReducers.updateState,
          doEdit: false,
          index: -1,
        }
      }
    }))
  };

  const handleMenuClick = function (e, record: User, index: number) {
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

  userColumns.push({
    title: 'Operation',
    key: 'operation',
    width: 100,
    render: function (text, record: User, index: number) {
      return <DropOption key={index} onMenuClick={e => handleMenuClick(e, record, index)} menuOptions={operateOptions}/>
    },
  });

  let EditorModalPage = null;
  if (userArea.doEdit) {
    const index = userArea.index;
    const isCreate = index < 0;
    const title = isCreate ? '创建' : '更新';
    const current: User = isCreate ? {} : userArea.list[index];
    let formItemConfigMap = null;
    let getEditors = null;
    if (isCreate) {
      const insertFormItemConfigMap = UserApiForms.getInsertFormItemConfigMap(current, null, formItemProps);
      //可选1,自动排版，不漂亮,调整顺序也可以
      formItemConfigMap = insertFormItemConfigMap;
    } else {
      //点击 getUpdateFormItemConfigMap 进去即可将以下内容复制出来,然后自定义排版
      const updateFormItemConfigMap = UserApiForms.getUpdateFormItemConfigMap(current, null, formItemProps);
      formItemConfigMap = updateFormItemConfigMap;
      //2.也可以自定义排版，属性可以提示
      getEditors = () => {
        const UserIdEditor = updateFormItemConfigMap.UserId.Editor;
        const NameEditor = updateFormItemConfigMap.Name.Editor;

        //<#--
        const HoppyIdsEditor = updateFormItemConfigMap.HoppyIds.Editor;
        const CascaderPostAddressIdsEditor = updateFormItemConfigMap.CascaderPostAddressIds.Editor;
        const UsernameEditor = updateFormItemConfigMap.Username.Editor;
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
            <UserIdEditor
              readOnly
            >
            </UserIdEditor>
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
            <UsernameEditor
            >
            </UsernameEditor>
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
    const userFormConfigs = Object.values(formItemConfigMap);
    /*2.或者 调整顺序 */
    // const userFormConfigs: FormItemConfig[] = [];
    // userFormConfigs.push(formItemConfigMap.UserName)
    // userFormConfigs.push(formItemConfigMap.UserId)
    // userFormConfigs.push(formItemConfigMap.UserType)
    /* 自定义排序*/

    const modelPageProps: ModelPageProps<User> = {
      record: current,
      isEditor: true,
      title,
      areaState: userArea,
      dispatch,
      formItemConfigs: userFormConfigs,
      getEditors,
    };
    EditorModalPage = <ModelPage {...modelPageProps} />;
  }

  const onFilter = () => {
    dispatch(UserDispatch.updateState_reducer({
      userArea: {
        type: userEffects.getUserPageList,
        doQuery: true,
        cancelState: {
          type: userReducers.updateState,
          doQuery: false,
        }
      }
    }));
  }


  let UserQueryForm = null;
  if (userArea.doQuery) {
    const title = '查询';
    const record = userArea.queryRule || {};
    const userPageListFormItemConfigMap = UserApiForms.getUserPageListFormItemConfigMap(record);
    const formItemConfigs = Object.values(userPageListFormItemConfigMap);
    const modelPageProps = {record, isEditor: false, title, areaState: userArea, dispatch, formItemConfigs}
    UserQueryForm = <ModelPage {...modelPageProps}/>;
  }

  const rowSelection: TableRowSelection<User> = {
    onChange: (selectedRowKeys, selectedRows) => {
      const dispachData: UserState = {
        userArea: {
          selectedRowKeys
        }
      }
      dispatch(UserDispatch.updateState_reducer(dispachData));
    },
    getCheckboxProps: (record) => ({
      disabled: false,//record.userId === 'ADMIN',
      /*name: record.name,*/
    }),
  };

  const handleDeleteItems = () => {
    dispatch(UserDispatch.deleteByUserIds_effect({userIds: userArea.selectedRowKeys}, cleanSelectRowsProps));
  };

  const pagination = userArea.pagination;
  if (pagination) {
    pagination.onChange = (page: number, pageSize?: number) => {
      dispatch(UserDispatch.getUserPageList_effect({...userArea.queryRule, pageSize, page}));
    };
    pagination.showSizeChanger = true;
  }

  const tableProps: TableProps<User> = {
    rowSelection: rowSelection,
    bordered: true,
    rowKey: (user: User) => user.userId,
    dataSource: userArea.list,
    loading: loading.effects[userEffects.getUserPageList.toString()],
    columns: userColumns,
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
            userArea.selectedRowKeys.length > 0 &&
            <Popconfirm title="Are you sure delete these items?" placement="left" onConfirm={handleDeleteItems}>
              <Button type="primary" style={{marginLeft: 8}}>删除</Button>
              {'Selected ' + userArea.selectedRowKeys.length + ' items'}
            </Popconfirm>
          }
        </Col>
      </Row>
      <Table {...tableProps} />
      {EditorModalPage && {...EditorModalPage}}
      {UserQueryForm && {...UserQueryForm}}
    </Page>
  )
};

const mapStateToProps = (states: StatesAlias & ConnectionPros): UserPageProps => {
  const props: UserPageProps = {
    appState: states.app,
    userState: states.user,
    loading: states.loading,
  }
  return props;
}

const UserPage = connect(mapStateToProps)(userPage);

export default UserPage;
