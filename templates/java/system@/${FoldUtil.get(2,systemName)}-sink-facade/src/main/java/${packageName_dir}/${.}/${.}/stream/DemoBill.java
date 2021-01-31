/**
 * Copyright (C) 2021  niaoge<78493244@qq.com>
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

package ${packageName}.stream;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * @author niaoge
 * @version $Id: DemoBill.java, v 0.1 2021年1月31日 上午9:08:00 XiaZhengsheng Exp $
 */
@Getter
@Setter
@ToString
public class DemoBill {
    private String id;
    private Integer billPay ;
    
}
