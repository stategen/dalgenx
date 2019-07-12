/**
 *  Do not remove this unless you get business authorization.
 *  Topic
 *  init by [stategen.progen] ,can be edit manually ,keep when "keep this"
 *  由 [stategen.progen]代码生成器初始化，可以手工修改,但如果遇到 keep this ,请保留导出设置以备外部自动化调用
 */
import React from 'react';
import {connect} from 'dva';
import {Bbs_topicDispatch, bbs_topicEffects, Bbs_topicProps, bbs_topicReducers, Bbs_topicState} from '@i/interfaces/Bbs_topicFaces';
import Topic from "@i/beans/Topic";
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
import TopicColumns from "@i/columns/TopicColumns";
import Bbs_topicApiForms from "@i/forms/Bbs_topicApiForms";


const {confirm} = Modal;

type Bbs_topicPageProps = AppProps & Bbs_topicProps;

interface HandleMenuClick {
  (e, record: Topic, index: number): any;
}

const formItemProps: FormItemProps = {
  labelCol: {span: 7},
  wrapperCol: {span: 12},
}
const bbs_topicIdRender = (text: any, record: Topic, index: number) => {
  return (
    <Link to={"#"} key={record.topicId} title={text}>
      {text}
    </Link>
  )
}
const bbs_topicPage = (props: Bbs_topicPageProps) => {
  const loading = props.loading;
  const dispatch = props.dispatch;
  const topicArea = props.bbs_topicState.topicArea;
  //自定义渲染
  const renderColumns = TopicColumns.renderColumns;
  renderColumns.topicId.render = bbs_topicIdRender;
  const bbs_topicColumns = Object.values(renderColumns);

  const onAdd = () => {
    const bbs_topicState: Bbs_topicState = {
      topicArea: {
        type: bbs_topicEffects.insert,
        index: -1,
        doEdit: true,
        cancelState: {
          type: bbs_topicReducers.updateState,
          doEdit: false,
        }
      }
    }
    dispatch(Bbs_topicDispatch.updateState_reducer(bbs_topicState));
  };

  const onDeleteItem = (index) => {
    const bbs_topic = props.bbs_topicState.topicArea.list[index];
    if (bbs_topic) {
      dispatch(Bbs_topicDispatch.delete_effect({topicId: bbs_topic.topicId}, cleanSelectRowsProps))
    }
  };


  const onEditItem = (index) => {
    dispatch(Bbs_topicDispatch.updateState_reducer({
      topicArea: {
        type: bbs_topicEffects.update,
        index,
        doEdit: true,
        cancelState: {
          type: bbs_topicReducers.updateState,
          doEdit: false,
          index: -1,
        }
      }
    }))
  };

  const handleMenuClick = function (e, record: Topic, index: number) {
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

  bbs_topicColumns.push({
    title: 'Operation',
    key: 'operation',
    width: 100,
    render: function (text, record: Topic, index: number) {
      return <DropOption key={index} onMenuClick={e => handleMenuClick(e, record, index)} menuOptions={operateOptions}/>
    },
  });

  let EditorModalPage = null;
  if (topicArea.doEdit) {
    const index = topicArea.index;
    const isCreate = index < 0;
    const title = isCreate ? '创建' : '更新';
    const current: Topic = isCreate ? {} : topicArea.list[index];
    let formItemConfigMap = null;
    let getEditors = null;
    if (isCreate) {
      const insertFormItemConfigMap = Bbs_topicApiForms.getInsertFormItemConfigMap(current, null, formItemProps);
      //可选1,自动排版，不漂亮,调整顺序也可以
      formItemConfigMap = insertFormItemConfigMap;
    } else {
      //点击 getUpdateFormItemConfigMap 进去即可将以下内容复制出来,然后自定义排版
      const updateFormItemConfigMap = Bbs_topicApiForms.getUpdateFormItemConfigMap(current, null, formItemProps);
      formItemConfigMap = updateFormItemConfigMap;
      //2.也可以自定义排版，属性可以提示
      getEditors = () => {
        const Bbs_topicIdEditor = updateFormItemConfigMap.TopicId.Editor;
        const TitleEditor = updateFormItemConfigMap.Title.Editor;

        //        //
        return (
          <>
            <Bbs_topicIdEditor
              readOnly
            >
            </Bbs_topicIdEditor>
            <TitleEditor
            >
            </TitleEditor>
            //{/* */};
            //
          </>
        )

      }
    }


    /*1.调整顺序，自动生成 1,2,3任选*/
    const bbs_topicFormConfigs = Object.values(formItemConfigMap);
    /*2.或者 调整顺序 */
    // const bbs_topicFormConfigs: FormItemConfig[] = [];
    // bbs_topicFormConfigs.push(formItemConfigMap.Bbs_topicName)
    // bbs_topicFormConfigs.push(formItemConfigMap.TopicId)
    // bbs_topicFormConfigs.push(formItemConfigMap.Bbs_topicType)
    /* 自定义排序*/

    const modelPageProps: ModelPageProps<Topic> = {
      record: current,
      isEditor: true,
      title,
      areaState: topicArea,
      dispatch,
      formItemConfigs: bbs_topicFormConfigs,
      getEditors,
    };
    EditorModalPage = <ModelPage {...modelPageProps} />;
  }

  const onFilter = () => {
    dispatch(Bbs_topicDispatch.updateState_reducer({
      topicArea: {
        type: bbs_topicEffects.getTopicPageList,
        doQuery: true,
        cancelState: {
          type: bbs_topicReducers.updateState,
          doQuery: false,
        }
      }
    }));
  }


  let Bbs_topicQueryForm = null;
  if (topicArea.doQuery) {
    const title = '查询';
    const record = topicArea.queryRule || {};
    const bbs_topicPageListFormItemConfigMap = Bbs_topicApiForms.getTopicPageListFormItemConfigMap(record);
    const formItemConfigs = Object.values(bbs_topicPageListFormItemConfigMap);
    const modelPageProps = {record, isEditor: false, title, areaState: topicArea, dispatch, formItemConfigs}
    Bbs_topicQueryForm = <ModelPage {...modelPageProps}/>;
  }

  const rowSelection: TableRowSelection<Topic> = {
    onChange: (selectedRowKeys, selectedRows) => {
      const dispachData: Bbs_topicState = {
        topicArea: {
          selectedRowKeys
        }
      }
      dispatch(Bbs_topicDispatch.updateState_reducer(dispachData));
    },
    getCheckboxProps: (record) => ({
      disabled: false,//record.topicId === 'ADMIN',
      /*name: record.name,*/
    }),
  };

  const handleDeleteItems = () => {
    dispatch(Bbs_topicDispatch.deleteByTopicIds_effect({topicIds: topicArea.selectedRowKeys}, cleanSelectRowsProps));
  };

  const pagination = topicArea.pagination;
  if (pagination) {
    pagination.onChange = (page: number, pageSize?: number) => {
      dispatch(Bbs_topicDispatch.getTopicPageList_effect({...topicArea.queryRule, pageSize, page}));
    };
    pagination.showSizeChanger = true;
  }

  const tableProps: TableProps<Topic> = {
    rowSelection: rowSelection,
    bordered: true,
    rowKey: (bbs_topic: Topic) => bbs_topic.topicId,
    dataSource: topicArea.list,
    loading: loading.effects[bbs_topicEffects.getTopicPageList.toString()],
    columns: bbs_topicColumns,
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
            topicArea.selectedRowKeys.length > 0 &&
            <Popconfirm title="Are you sure delete these items?" placement="left" onConfirm={handleDeleteItems}>
              <Button type="primary" style={{marginLeft: 8}}>删除</Button>
              {'Selected ' + topicArea.selectedRowKeys.length + ' items'}
            </Popconfirm>
          }
        </Col>
      </Row>
      <Table {...tableProps} />
      {EditorModalPage && {...EditorModalPage}}
      {Bbs_topicQueryForm && {...Bbs_topicQueryForm}}
    </Page>
  )
};

const mapStateToProps = (states: StatesAlias & ConnectionPros): Bbs_topicPageProps => {
  const props: Bbs_topicPageProps = {
    appState: states.app,
    bbs_topicState: states.bbs_topic,
    loading: states.loading,
  }
  return props;
}

const Bbs_topicPage = connect(mapStateToProps)(bbs_topicPage);

export default Bbs_topicPage;
