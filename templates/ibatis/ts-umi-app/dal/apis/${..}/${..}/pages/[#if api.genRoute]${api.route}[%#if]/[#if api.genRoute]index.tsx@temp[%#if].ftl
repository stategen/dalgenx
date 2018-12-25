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

  return (
    <div>
      ${api?uncap_first}Page
    <div>
  )
}

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
