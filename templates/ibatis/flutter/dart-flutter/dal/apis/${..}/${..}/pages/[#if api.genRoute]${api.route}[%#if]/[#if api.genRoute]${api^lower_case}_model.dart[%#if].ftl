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
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '${intergradePackage}/intergrades.dart';

class ${api}StateEx {

}

class ${api}Model extends ${api}AbstractModel with ${api}StateEx {
  static ChangeNotifierProvider<${api}Model> createProvider() {
    return ChangeNotifierProvider<${api}Model>(
      builder: (_) => ${api}Model(),
    );
  }

  static ${api}Model getModel(BuildContext context) {
     return Provider.of<${api}Model>(context);
  }
}