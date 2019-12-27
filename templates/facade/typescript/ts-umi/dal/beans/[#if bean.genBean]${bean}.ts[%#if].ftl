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
<@genCopyright bean/>
<@genImports bean.imports,'../'/>
import {Bean} from "@utils/DvaUtil";

<#list bean.fields as f>
  <#if f.isId>
/** ${f} */
export const ${bean}_ID: string = '${f}';
  <#break>
  </#if>
</#list>

export default interface ${bean}<@genBeanType bean ''/> extends Bean<#if bean.extend>, ${bean.parentBean}</#if> {

  <#list bean.fields as f>
  <#if (f.description?length>0)>
  /** ${f.description} */
  </#if>
  ${f}?: <#if f.isGeneric><#if f.genericName??>${f.genericName}<#else>${f.generic}</#if><#else>${f.type}</#if><#if f.isArray>[]</#if>;

  </#list>
}

