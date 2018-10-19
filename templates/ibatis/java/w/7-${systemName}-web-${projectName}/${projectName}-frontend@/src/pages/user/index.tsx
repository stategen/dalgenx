import React from 'react'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'
import {Row, Col, Button, Popconfirm} from 'antd'
import {Page} from '@components/index'
import queryString from 'query-string'
import List from './components/List'
import Filter from './components/Filter'
import Modal from './components/Modal';
import {userEffects, UserProps, userReducers} from '@i/interfaces/UserFaces';
import {ModalFuncProps} from "antd/lib/modal";

/*dva限定死了，必须与model中的namespace一致*/
const userPage = ({location, dispatch, userState, loading}:UserProps) => {

  const {query, pathname} = location;
  const {pagination, modalVisible, modalType, isMotion, selectedRowKeys} = userState;
  const {user, list:users} = userState;

  const handleRefresh = (newQuery?) => {
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery,
      }),
    }))
  }
  const isCreate =modalType ===`${'$'}{userEffects.createUser}`;

  const modalProps:ModalFuncProps = {
    ...({}),
    item: isCreate ? {} : user,
    visible: modalVisible,
    title: isCreate? 'Create User' : 'Update User',

    maskClosable: false,
    confirmLoading: loading.effects[modalType],
    wrapClassName: 'vertical-center-modal',
    onOk:(data)=>{
      dispatch({
        type: modalType,
        payload: data,
      })
        .then(() => {
          handleRefresh();
        })
    },
    onCancel:()=>{
      dispatch({
        type: userReducers.hideModal,
      })
    },
  }

  const listProps = {
    dataSource: users,
    loading: loading.effects[`${'$'}{userEffects.getUsers}`],
    pagination,
    location,
    isMotion,
    onChange(page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onDeleteItem(userId) {
      dispatch({
        type: userEffects.deleteUserById,
        payload: userId,
      })
        .then(() => {
          handleRefresh({
            page: (users.length === 1 && pagination.current > 1) ? pagination.current - 1 : pagination.current,
          })
        })
    },
    onEditItem(user) {
      dispatch({
        type: userReducers.showModal,
        payload: {
          modalType: userEffects.patchUser,
          user: user,
        },
      })
    },
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: userReducers.updateState,
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
    },
  }

  const filterProps = {
    isMotion,
    filter: {
      ...query,
    },
    onFilterChange(value) {
      handleRefresh({
        ...value,
        page: 1,
      })
    },
    onAdd() {
      dispatch({
        type: userReducers.showModal,
        payload: {
          modalType: userEffects.createUser,
        },
      })
    },
    switchIsMotion() {
      dispatch({type: userReducers.switchIsMotion})
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: userEffects.deleteUserByIds,
      payload: {
        ids: selectedRowKeys,
      },
    })
      .then(() => {
        handleRefresh({
          page: (users.length === selectedRowKeys.length && pagination.current > 1) ? pagination.current - 1 : pagination.current,
        })
      })
  }

  return (
    <Page inner>
      <Filter {...filterProps} />
      {
        selectedRowKeys.length > 0 &&
        <Row style={{marginBottom: 24, textAlign: 'right', fontSize: 13}}>
          <Col>
            {`Selected ${'$'}{selectedRowKeys.length} items `}
            <Popconfirm title="Are you sure delete these items?" placement="left" onConfirm={handleDeleteItems}>
              <Button type="primary" style={{marginLeft: 8}}>Remove</Button>
            </Popconfirm>
          </Col>
        </Row>
      };
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </Page>
  )
}
/*dva限定死了，必须与model中的namespace一致*/
export default connect(({user: userState, loading}) => ({userState, loading}))(userPage)
