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
import {routerRedux} from 'dva/router';
import {connect} from 'dva';
import {${api}ReactComponentFn, ${api}Props } from './${api}Faces';
import {${api?uncap_first}Effects, ${api?uncap_first}Reducers} from '@interfaces/${api}Faces';
<@genImports api.imports,'@'/>

const ${api?uncap_first}Page: ${api}ReactComponentFn = ({location, dispatch, ${api?uncap_first}: ${api?uncap_first}State, loading}: ${api}Props) => {
  const {pathname} = location;
  <#if api.areas?size gt 0>
  const  {<#list api.areas as area>${area?uncap_first}s<#if area_has_next>, </#if></#list>} =${api?uncap_first}State;
  </#if>

  return (
    <div>this is ${api} index</div>
  )
}

export default connect(({${api?uncap_first}: ${api?uncap_first}State, loading}) => ({${api?uncap_first}: ${api?uncap_first}State, loading}))(${api?uncap_first}Page)