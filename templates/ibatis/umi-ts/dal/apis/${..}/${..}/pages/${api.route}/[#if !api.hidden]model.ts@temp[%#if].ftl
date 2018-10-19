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
import {mergeObjects} from "@utils/DvaUtil";
import {${api?uncap_first}DefaultModel} from "@models/${api}DefaultModel";
import {${api}Model} from "@interfaces/${api}Faces";
import ${api}Apis from "@i/apis/${api}Apis";
import {${api?uncap_first}CustomState} from './${api}CustomFaces';
<@genImports api.imports,'@'/>

const ${api?uncap_first}Model: ${api}Model = ${api?uncap_first}DefaultModel;
${api?uncap_first}Model.state=mergeObjects(${api?uncap_first}Model.state,${api?uncap_first}CustomState);

export default ${api?uncap_first}Model;