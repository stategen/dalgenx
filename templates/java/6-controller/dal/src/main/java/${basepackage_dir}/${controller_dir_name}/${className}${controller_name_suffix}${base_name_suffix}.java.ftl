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
<#include '/java_copyright.include'/>
package ${tableConfig.basepackage}.${controller_dir_name};

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.stategen.framework.annotation.Wrap;

import ${tableConfig.basepackage}.${service_dir_name}.${tableConfig.className}${service_name_suffix}${internal_service_suffix};
/**
 * ${tableConfig.className}${controller_name_suffix}
<#include '/java_description.include'/>
 * 新生成的类中的方法，只有在不同名的情况下才会被追加到该类下，因此该类可以修改任何部分
 * 在虚类中最好不要定义@RequestMapping，考虑到多个继承后不知道是哪端被调用了。
 * </pre>
 */

@RequestMapping("/api/${tableConfig.className?uncap_first}")
@Wrap
public abstract class ${tableConfig.className}${controller_name_suffix}${base_name_suffix} {

    @Resource
    protected ${tableConfig.className}${service_name_suffix}${internal_service_suffix} ${tableConfig.className?uncap_first}${service_name_suffix};

<#list tableConfig.sqls as sql>
    <#if sql.facade>
    /**
     * @see ${tableConfig.basepackage}.${service_dir_name}.${impl_dir_name}.${tableConfig.className}${service_name_suffix}${impl_name_suffix}#${sql.operation}
     * ${sql.remarks!}
     * sql:<#compress>${StringHelper.removeCrlf(sql.executeSql)?trim}</#compress>
     * 该方法用dalgen自动生成,不让该方法对外，请将public去掉
     */
    @ResponseBody
    public Object ${sql.operation}(<@generateOperationArguments sql/>) {
        return ${tableConfig.className?uncap_first}${service_name_suffix}.${sql.operation}(<@generateOperationParams sql/>);
    }
  </#if>
</#list>
}



