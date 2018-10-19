package ${packageName}.enums;

import org.stategen.framework.lite.ICookieType;

public enum CookieType implements  ICookieType{
    BASE(BASE.class,"_tk_"),
    
    PAY_LOGIN(PAY_LOGIN.class,"_pay_"),
    ;
    
    private String cookiePrefixName;
    private Class<? extends ICookieType> cookieTypeClz;
    
    CookieType(Class<? extends ICookieType> cookieTypeClz,String cookiePrefixName){
        this.cookiePrefixName =cookiePrefixName;
        this.cookieTypeClz =cookieTypeClz;
        regist();
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
    
    public static abstract class BASE implements ICookieType {
    }
    
    public static abstract class PAY_LOGIN implements ICookieType {
    }

}
