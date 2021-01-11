package ${packageName}.service.impl;

import javax.annotation.Resource;

import org.stategen.framework.lite.IIdGenerator;
import org.stategen.framework.util.AssertUtil;

import com.baidu.fsg.uid.impl.CachedUidGenerator;

public class IdGeneratorImpl implements IIdGenerator {
    
    /***初始化BAIDU UID, 也可以用别的id生成器,**/
    @Resource
    private CachedUidGenerator cachedUidGenerator;
    
    @SuppressWarnings("unchecked")
    @Override
    public <K, T> K generateId(Class<K> idClz, Class<T> bizTagClz) {
        Long uid = cachedUidGenerator.getUID();
        if (idClz == Long.class) {
            return (K) uid;
        }
        
        if (idClz == String.class) {
            return (K) uid.toString();
        }
        
        AssertUtil.throwException(idClz + "is Unsupported by IdGeneratorImpl");
        return null;
    }
    

    
}
