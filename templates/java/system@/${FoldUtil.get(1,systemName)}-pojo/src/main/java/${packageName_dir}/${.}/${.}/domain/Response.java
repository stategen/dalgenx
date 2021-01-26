package ${packageName}.domain;

import org.stategen.framework.lite.BaseResponse;

import ${packageName}.enums.ResponseStatus;

/**
 *在 controller或method上配置@Wrap，由该类无侵入式返回给前端.不用写 new Response().由 ResponseBodyAdviceWrapper自行封装
 * 返回给前端的包装类，配置在spring的xml中，各家包装大同小异又不太一样，所以不能统一在framework中强制
 * 实现，而是默认初始化后，再采用依赖倒置设计原则，根据自己公司的特别修改或实现,依照fastjson规则，
 * 只有public getter才会被序列化到前端
 * @author niaoge
 * @version $Id: Response.java, v 0.1 2021年1月18日 下午11:28:49 XiaZhengsheng Exp $
 */
public class Response<T> extends BaseResponse<T> {
    
   // private String test1="test1";
//    /**不会生成前端代码*/
    //private transient String test2="test2";
//    /**不会生成前端代码*/
//    @JSONField(serialize=false)
//    private String test3="test3";
//    public String getTest2() {
//        return test2;
//    }
//  public String getTest1() {
//  return test1;
//}  
//    public String getTest3() {
//        return test3;
//    }
//    /**不会生成前端代码*/
//    @JSONField(serialize=false)
//    public String getTest4() {
//        return "test4";
//    }


    /***给一个默认的不带参数的方法，是因为spring创建时不需要参数*/
    public Response(){
        super();
    }
    
    public Response(T data) {
        this();
        setData(data);
        setStatus(ResponseStatus.OK);
    }

    public Integer getCode() {
        return super._getCode();
    }

    public T getData() {
        return super._getData();
    }

    public ResponseStatus getStatus() {
        return (ResponseStatus)super._getStatus();
    }


    public String getExeptionClass() {
        return super._getExeptionClass();
    }
    
    @SuppressWarnings("rawtypes")
    public static Response error(ResponseStatus responseStatus){
        Response response=new Response(); 
        response.setStatus(responseStatus);
        return response;
    }
    

}
