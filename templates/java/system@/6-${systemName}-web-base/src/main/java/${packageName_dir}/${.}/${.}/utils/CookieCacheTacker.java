package ${packageName}.utils;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;

import org.apache.commons.beanutils.ConvertUtils;
import org.stategen.framework.cache.BaseCacheTaker;
import org.stategen.framework.web.cookie.CookieGroup;

import ${packageName}.enums.CookieType.Login.LoginCookieNames;

/****
 * *从反欺诈的cookieGroup获取值关转换
 * 
 * @author niaoge
 * @version $Id: CookieCacheTacker.java, v 0.1 2020年7月29日 上午12:58:52 XiaZhengsheng Exp $
 */
public class CookieCacheTacker implements BaseCacheTaker<LoginCookieNames> {
    
    @Resource
    private CookieGroup<LoginCookieNames> loginCookieGroup;
    
    @SuppressWarnings("unchecked")
    @Override
    public <V> V get(LoginCookieNames enm, Class<? extends V> clz) {
        Cookie cookie = loginCookieGroup.getCookie(enm);
        if (cookie != null) {
            String value = cookie.getValue();
            if (clz == String.class) {
                return (V) value;
            }
            Object dest = ConvertUtils.convert(value, clz);
            return (V) dest;
        }
        return null;
    }
    
    @Override
    public <V> void set(LoginCookieNames enm, V v) {
        loginCookieGroup.addCookie(enm, v);
    }
    
}
