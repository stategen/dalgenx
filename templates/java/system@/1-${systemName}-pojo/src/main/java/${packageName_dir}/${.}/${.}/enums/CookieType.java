package ${packageName}.enums;

import org.stategen.framework.lite.ICookieType;
import org.stategen.framework.lite.IResponseStatus;

import lombok.Getter;

@Getter
public enum CookieType implements ICookieType {
    LOGIN(Login.class, "_tk_", ResponseStatus.NOT_LOGIN),
    
    PAY_LOGIN(PayLogin.class, "_pay_", ResponseStatus.PAY_NO_TOKEN),
    ;
    
    private String cookiePrefixName;
    
    private Class<? extends ICookieType> registerClass;
    
    private IResponseStatus responseStatusOfTokenError;
    
    
    <T extends Enum<T> & IResponseStatus> CookieType(
            Class<? extends ICookieType> registerClass,
            String cookiePrefixName,
            T responseStatusOfTokenError) {
        this.registerClass                 = registerClass;
        this.cookiePrefixName              = cookiePrefixName;
        this.responseStatusOfTokenError =  responseStatusOfTokenError;
        register();
    }
    
    public static interface Login extends ICookieType {
        
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
    
    public static interface  PayLogin extends ICookieType {
    }
    
}
