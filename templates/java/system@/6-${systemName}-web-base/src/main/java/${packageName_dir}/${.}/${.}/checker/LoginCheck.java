package ${packageName}.checker;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.stategen.framework.annotation.Check;
import org.stategen.framework.annotation.CookieCheck;

import ${packageName}.enums.CookieType.Login;
/***
 * 该标识是用cookie检测实现，查看cookie中是否有被不能篡改的name为 login 的cookie
 * 
 * @author XiaZhengsheng
 * @version $Id: LoginCheck.java, v 0.1 2016年12月27日 上午9:41:30 XiaZhengsheng Exp $
 */
@Target({ElementType.METHOD,ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Check
@CookieCheck(cookieTypeClz =Login.class, cookieName =Login.USER_ID)
@Inherited
public @interface LoginCheck {
    
}
