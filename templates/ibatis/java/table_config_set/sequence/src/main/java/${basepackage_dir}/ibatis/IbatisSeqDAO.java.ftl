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
package ${basepackage}.ibatis;

import ${basepackage}.daointerface.SeqDAO;
import org.springframework.dao.DataAccessException;
import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

public class IbatisSeqDAO extends SqlMapClientDaoSupport implements SeqDAO {
    
<#list tableConfigSet.sequences as seq>
    
    public long getNext${StringHelper.tableNameToClassName(seq)}() throws DataAccessException {
        return ((Number) getSqlMapClientTemplate().queryForObject("SEQ.${seq}", null)).longValue();
    }    
</#list>

<#list sequencesList?word_list as seq>
    
    public long getNext${StringHelper.tableNameToClassName(seq)}() throws DataAccessException {
        return ((Number) getSqlMapClientTemplate().queryForObject("SEQ.${seq}", null)).longValue();
    }    
</#list>
}