package ${packageName}.enums;

import org.stategen.framework.lite.IResponseStatus;

public enum ResponseStatus implements IResponseStatus {

    //OK(200, "操作成功"),
    OK(OK.class, true, 200, "操作成功", null, false),

    ERROR(ERROR.class, false, 500, "服务器内部错误", "500.html", false),

    MISSED(MISSED.class, false, 404, "没有资源", "404.html", false),

    PAY_NO_TOKEN(PAY_NO_TOKEN.class, false, 311, "权限校验没有通过", "pay.html", true),

    NOT_LOGIN(NOT_LOGIN.class, false, 211, "没有登录!", "login.html", true),

    ;

    public static abstract class OK implements IResponseStatus {
    }

    public static abstract class ERROR implements IResponseStatus {
    }

    public static abstract class MISSED implements IResponseStatus {
    }

    public static abstract class PAY_NO_TOKEN implements IResponseStatus {
    }

    public static abstract class NOT_LOGIN implements IResponseStatus {
    }


    private Integer status;
    private String message;
    private Class<? extends IResponseStatus> responseStatusClz;
    private Boolean success;
    private String errorPage;
    private boolean redirect;

    ResponseStatus(Class<? extends IResponseStatus> responseStatusClz, Boolean success, Integer statusCode, String message, String errorPage,
                   boolean redirect) {
        this.status = statusCode;
        this.message = message;
        this.responseStatusClz = responseStatusClz;
        this.success = success;
        this.errorPage = errorPage;
        this.redirect = redirect;
        regist();
    }

    @Override
    public Integer getStatus() {
        return status;
    }

    @Override
    public String getMessage() {
        return message;
    }

    /***不让fastjson序列化*/
    @Override
    public Class<? extends IResponseStatus> _getResonseStatusClz() {
        return responseStatusClz;
    }

    @Override
    public Boolean getSuccess() {
        return success;
    }

    @Override
    public String getErrorPage() {
        return errorPage;
    }

    @Override
    public boolean isRedirect() {
        return redirect;
    }

}
