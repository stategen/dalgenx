package ${packageName}.enums;

import org.stategen.framework.lite.ICookieType;
import org.stategen.framework.lite.IResponseStatus;

import ${packageName}.enums.ResponseStatus.NOT_LOGIN;
import ${packageName}.enums.ResponseStatus.PAY_NO_TOKEN;

public enum CookieType implements  ICookieType{
    LOGIN(Login.class,"_tk_",NOT_LOGIN.class),
    
    PAY_LOGIN(PayLogin.class,"_pay_",PAY_NO_TOKEN.class),
    ;
    
    private String cookiePrefixName;
    private Class<? extends ICookieType> cookieTypeClz;
    private Class<? extends IResponseStatus> responseStatusClzOfTokenError;
    
    CookieType(
            Class<? extends ICookieType> cookieTypeClz,
            String cookiePrefixName,
            Class<? extends IResponseStatus> responseStatusClzOfTokenError) {
        this.cookiePrefixName              = cookiePrefixName;
        this.cookieTypeClz                 = cookieTypeClz;
        this.responseStatusClzOfTokenError = responseStatusClzOfTokenError;
        register();
    }
    
    @Override
    public String getCookiePrefixName() {
        return cookiePrefixName;
    }
    
    /***不让fastjson序列化*/
    @Override	
    public Class<? extends ICookieType> _getCookieTypeClz() {
        return cookieTypeClz;
    }
    
    @Override
    public Class<? extends IResponseStatus> getResponseStatusClzOfTokenError() {
        return responseStatusClzOfTokenError;
    }
    
    public static abstract class Login implements ICookieType {
        
        public static final String USER_ID = "userId";
        
        public static enum LoginCookieNames {
            /****/
            userId,
            /****/
            currUserId() {
                
                @Override
                public String toString() {
                    return USER_ID;
                }
            },
            
            /****/
            currOrgId() {
                
                @Override
                public String toString() {
                    return "orgId";
                }
            }
            
        }
    }
    
    public static abstract class PayLogin implements ICookieType {
    }
    
}
