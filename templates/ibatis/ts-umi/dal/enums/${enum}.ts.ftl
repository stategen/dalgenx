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
<@genCopyright enum/>
import {Options} from "@utils/DvaUtil"

enum ${enum} {
<#list enum.enums as e>
  <#if (e.description?length>0)>
  /** ${e.description} */
  </#if>
  ${e} = "${e}"<#if e_has_next>,</#if>
</#list>

}

export const ${enum?uncap_first}Options = {
<#list enum.enums as e>
  _None:{
    value: null,
    title: '请选择',
  },
    <#if (e.description?length>0)>
  /** ${e.description} */
  </#if>
  ${e}: {
    value: ${enum}.${e},
    title: '${e.title}',
  }<#if e_has_next>,</#if>

</#list>
}

export default ${enum};