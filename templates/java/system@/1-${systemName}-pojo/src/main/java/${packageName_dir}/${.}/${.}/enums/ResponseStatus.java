package ${packageName}.enums;

import org.stategen.framework.lite.IResponseStatus;

import lombok.Getter;

/**
 * The Enum ResponseStatus.
 *
 * @author niaoge
 * @version $Id: ResponseStatus.java, v 0.1 2021年1月7日 上午5:35:05 XiaZhengsheng Exp $$
 */
@Getter
public enum ResponseStatus implements IResponseStatus {

    //OK(200, "操作成功"),
    OK(Ok.class, true, 200, "操作成功", null, false),

    ERROR(Error.class, false, 500, "服务器内部错误", "500.html", false),

    MISSED(Missed.class, false, 404, "没有资源", "404.html", false),

    PAY_NO_TOKEN(PayNotToken.class, false, 311, "权限校验没有通过", "pay.html", true),

    NOT_LOGIN(NotLogin.class, false, 211, "没有登录!", "login.html", true),
    
    BLOCK(Block.class, false, 403, "稍后再试", "block.html", false),

    ;

    public static interface Ok extends IResponseStatus {
    }

    public static interface Error extends IResponseStatus {
    }

    public static interface Missed extends IResponseStatus {
    }

    public static interface PayNotToken extends IResponseStatus {
    }

    public static interface NotLogin extends IResponseStatus {
    }
	
    public static interface Block extends IResponseStatus {
    }


    private Integer status;
    private String message;
    private Class<? extends IResponseStatus> registerClass;
    private Boolean success;
    private String errorPage;
    private boolean redirect;

    ResponseStatus(Class<? extends IResponseStatus> registerClass, Boolean success, Integer statusCode, String message, String errorPage,
                   boolean redirect) {
        this.status = statusCode;
        this.message = message;
        this.registerClass = registerClass;
        this.success = success;
        this.errorPage = errorPage;
        this.redirect = redirect;
        register();
    }





}
