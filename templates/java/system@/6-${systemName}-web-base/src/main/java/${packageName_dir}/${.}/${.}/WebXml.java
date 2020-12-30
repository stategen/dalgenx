package ${packageName};

import javax.servlet.DispatcherType;
import javax.servlet.annotation.WebFilter;
import javax.servlet.annotation.WebInitParam;
import javax.servlet.annotation.WebListener;
import javax.servlet.annotation.WebServlet;

import org.springframework.boot.autoconfigure.web.servlet.WebMvcRegistrations;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;
import org.stategen.framework.spring.mvc.AuthCheckerHandlerInterceptor;
import org.stategen.framework.spring.mvc.RequestMappingMethodHandlerMapping;

import ${packageName}.enums.ResponseStatus;

public class WebXml {
    
    @WebFilter(filterName = "CharacterEncodingFilter", urlPatterns = "/*",
            /*--*/
            dispatcherTypes = { DispatcherType.REQUEST, DispatcherType.FORWARD },
            /*--*/
            initParams = {
                    /*--*/
                    @WebInitParam(name = "encoding", value = "UTF-8"),
                    /*--*/
                    @WebInitParam(name = "forceEncoding", value = "true") })
    
    public static class CharacterEncodingFilter extends org.springframework.web.filter.CharacterEncodingFilter {
        
    }
    
    @WebFilter(filterName = "CORSFilter", urlPatterns = "/*")
    @WebInitParam(name = "encoding", value = "UTF-8")
    public static class CORSFilter extends org.stategen.framework.spring.mvc.CORSFilter {
        
    }
    
    @WebFilter(filterName = "WebStatFilter", urlPatterns = "/*")
    @WebInitParam(name = "exclusions", value = "*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid*")
    public static class WebStatFilter extends com.alibaba.druid.support.http.WebStatFilter {
        
    }
    
    @WebFilter(filterName = "CustomMultiFilter", urlPatterns = "/*")
    public static class CustomMultiFilter extends org.stategen.framework.spring.mvc.MultiFilter {
    }
    
    @WebListener
    //因为springboot已经有了上下文监听,此处不要@Configuration
    public static class RequestContextListener extends org.springframework.web.context.request.RequestContextListener {
        
    }
    
    @WebListener
    @Configuration
    public static class DriversShutdownListener extends org.stategen.framework.spring.util.DriversShutdownListener {
        
    }
    
    /*** {serverName}/druid/index.html*/
    @WebServlet(name = "StatViewServlet", urlPatterns = "/druid/*",
            /*--*/
            initParams = {
                    /** 允许清空统计数据 */
                    @WebInitParam(name = "resetEnable", value = "true"),
            /* <!-- 用户名 DruidConfig通过spring读取外部stategen.xml--> */
            /* @WebInitParam(name = "loginUsername", value = "${druid.username}"), */
            /* <!-- 密码 -- DruidConfig通过spring读取外部stategen.xml> */
            /* @WebInitParam(name = "loginPassword", value = "${druid.password}") */
            
            })
    @Configuration
    public static class DruidServlet extends org.stategen.framework.spring.mvc.DruidServlet {
        
        private static final long serialVersionUID = 1L;
    }
    
    /***这个类必须在springServlet中加载，否则后面的解析不成成*/
    @Configuration
    //这个注解很重要啊，不写不生效
    @Order(Ordered.HIGHEST_PRECEDENCE)
    public static class RequestMappingHandlerMappingConfiguration implements WebMvcRegistrations {
        
        
        @Override
        public RequestMappingHandlerMapping getRequestMappingHandlerMapping() {
            RequestMappingMethodHandlerMapping requestMappingMethodHandlerMapping = new org.stategen.framework.spring.mvc.RequestMappingMethodHandlerMapping();
            //
            AuthCheckerHandlerInterceptor authCheckerHandlerInterceptor =new AuthCheckerHandlerInterceptor(); 
            authCheckerHandlerInterceptor.setResponseStatusOfCheckFailDefault(ResponseStatus.NOT_LOGIN);
            
            requestMappingMethodHandlerMapping.setInterceptors(authCheckerHandlerInterceptor);
            return requestMappingMethodHandlerMapping;
        }
    }

    
    @ImportResource("classpath*:applicationContext.xml")
    @Order(Ordered.HIGHEST_PRECEDENCE + 1)
    @Configuration
    public static class ApplicationContextXml {
        
    }
    
    @ImportResource("classpath*:servletContext.xml")
    @Order(Ordered.LOWEST_PRECEDENCE)
    @Configuration
    public static class ServletContextXml {
        
    }
    
  
}
