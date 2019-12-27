package ${tableConfig.basepackage}.${dao_dir_name}.${impl_dir_name};

import java.util.List;
<#if dao_type="ibatis">
import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

</#if>
import org.stategen.framework.ibatis.util.PageQueryUtils;
import org.stategen.framework.ibatis.util.SqlDaoSupport;
import org.stategen.framework.lite.PageList;
<#if dao_type="mybatis">
import org.stategen.framework.mybatis.MybatisSqlDaoSupport;
</#if>

/**
 * SqlDaoSupportBase
 * 该类为兼容ibatis和mybatis,不可以修改
 * </pre>
 */
<#if dao_type="mybatis">
public class SqlDaoSupportBase extends MybatisSqlDaoSupport implements SqlDaoSupport {
    public <T> int update(String statementName, Object params) {
        return super.update(statementName, params);
    }

    public <T> void insert(String statementName, T t) {
        super.insert(statementName, t);
    }

    public <T> T selectOne(String statementName, Object params) {
        return super.selectOne(statementName, params);
    }

    public <T> List<T> selectList(String statementName, Object params) {
        return super.selectList(statementName, params);
    }

    public <T> PageList<T> pageQuery(String statementName, Object params, int pageNum, int pageSize) {
        return PageQueryUtils.pageQuery(this, statementName, params, pageNum, pageSize);
    }

}
</#if>

<#if dao_type="ibatis">
@SuppressWarnings("deprecation")
public class SqlDaoSupportBase extends SqlMapClientDaoSupport implements SqlDaoSupport {

    public <T> int update(String statementName, Object params) {
        int effectCount = getSqlMapClientTemplate().update(statementName, params);
        return effectCount;
    }

    public <T> void insert(String statementName, T t) {
        getSqlMapClientTemplate().insert(statementName, t);
    }

    @SuppressWarnings({ "unchecked" })
    public <T> T selectOne(String statementName, Object params) {
        return (T) getSqlMapClientTemplate().queryForObject(statementName, params);
    }

    @SuppressWarnings({ "unchecked" })
    public <T> List<T> selectList(String statementName, Object params) {
        return getSqlMapClientTemplate().queryForList(statementName, params);
    }

    public <T> PageList<T> pageQuery(String statementName, Object params, int pageNum, int pageSize) {
        return PageQueryUtils.pageQuery(this, statementName, params, pageNum, pageSize);
    }

}
</#if>