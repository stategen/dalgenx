package ${packageName};

import java.net.InetAddress;
import java.net.UnknownHostException;

import javax.servlet.DispatcherType;
import javax.servlet.annotation.WebFilter;
import javax.servlet.annotation.WebInitParam;
import javax.servlet.annotation.WebListener;
import javax.servlet.annotation.WebServlet;

import org.springframework.boot.autoconfigure.web.servlet.WebMvcRegistrations;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.boot.web.servlet.server.AbstractServletWebServerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.web.context.support.StaticWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;
import org.stategen.framework.spring.mvc.AuthCheckerHandlerInterceptor;
import org.stategen.framework.spring.mvc.RequestMappingMethodHandlerMapping;
import org.stategen.framework.util.StringUtil;

import ${packageName}.enums.ResponseStatus;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class WebXml {
    
    /***这个类必须在springServlet中加载，否则后面的解析不成成*/
    @Configuration
    //这个注解很重要啊，不写不生效
    @Order(Ordered.HIGHEST_PRECEDENCE)
    public static class RequestMappingHandlerMappingConfiguration implements WebMvcRegistrations {
        
        @Override
        public RequestMappingHandlerMapping getRequestMappingHandlerMapping() {
            //这个类直接把方法名映射为请求路径
            RequestMappingMethodHandlerMapping requestMappingMethodHandlerMapping = new org.stategen.framework.spring.mvc.RequestMappingMethodHandlerMapping();
            //
            AuthCheckerHandlerInterceptor authCheckerHandlerInterceptor = new AuthCheckerHandlerInterceptor();
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
    //    @Order(Ordered.LOWEST_PRECEDENCE)
    @Order(Ordered.HIGHEST_PRECEDENCE + 2)
    @Configuration
    public static class ServletContextXml {
        
    }
    
    /***用自定义配置的tomcat*/
    @ImportResource("classpath:/servlet/servlet-factory.xml")
    @Configuration
    public static class ServletFactoryConfig {
        
    }
    
    @Configuration
    public static class BootServletConfig {
        
        /***springboot 启动一个自定义servlet,*/
        @Bean
        public ServletRegistrationBean<?> createServletConfig() {
            DispatcherServlet           dispatcherServlet  = new DispatcherServlet();
            StaticWebApplicationContext applicationContext = new StaticWebApplicationContext();
            dispatcherServlet.setApplicationContext(applicationContext);
            
            ServletRegistrationBean<?> servletRegistrationBean = new ServletRegistrationBean<>(dispatcherServlet, "/*");
            
            servletRegistrationBean.setName("BootServletConfig");
            return servletRegistrationBean;
        }
    }
    
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
            /* <!-- 用户名密码 DruidConfig通过spring读取外部stategen.xml--> */
            /* @WebInitParam(name = "loginUsername", value = "${'${'}druid.username}"), */
            /* @WebInitParam(name = "loginPassword", value = "${'${'}druid.password}") */
            
            })
    @Configuration
    public static class DruidServlet extends org.stategen.framework.spring.mvc.DruidServlet {
        
        private static final long serialVersionUID = 1L;
    }
    
    public static void printEnv(ApplicationContext application) {
        //https://blog.csdn.net/rongbo91/article/details/109645729
        System.out.println("项目启动成功 *^_^* \n"
                +
                "□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□\r\n" + 
                "□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□\r\n" + 
                "□□□□■■■■■■■□□□□□□□■■■■■■■■■□□□□□□□■■■■■■□□□□□\r\n" + 
                "□□□□■■□□□■■□□□□□□□■■□□■□□■■□□□□□□■■■□□■■□□□□□\r\n" + 
                "□□□□■■□□□□■□□□□□□□■■□□■□□■■□□□□□□■■□□□□■□□□□□\r\n" + 
                "□□□□■■■■□□□□□□□□□□□□□□■□□□□□□□□□□■■□□□□□□□□□□\r\n" + 
                "□□□□□■■■■■■□□□□□□□□□□□■□□□□□□□□□□■□□□■■■■■□□□\r\n" + 
                "□□□□□□□□■■■□□□□□□□□□□□■□□□□□□□□□□■■□□□■■■□□□□\r\n" + 
                "□□□□■□□□□■■□□□□□□□□□□□■□□□□□□□□□□■■□□□□■□□□□□\r\n" + 
                "□□□□■■□□□■■□□□□□□□□□□□■□□□□□□□□□□■■■□□■■□□□□□\r\n" + 
                "□□□□■■■■■■■□□□□□□□□□■■■■■□□□□□□□□□■■■■■■□□□□□\r\n" + 
                "□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□■■□□□□□□□\r\n" + 
                "□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□\r\n" + 
                "□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□"
                )
        ;
        String ip;
        try {
            ip = InetAddress.getLocalHost().getHostAddress();
        } catch (UnknownHostException e) {
            log.error("没有获取ip", e);
            ip = "ip";
        }
        AbstractServletWebServerFactory servletWebServerFactory = application.getBean(AbstractServletWebServerFactory.class);
        
        int    port = servletWebServerFactory.getPort();
        String path = servletWebServerFactory.getContextPath();//env.getProperty("server.servlet.context-path");
        if (StringUtil.isEmpty(path)) {
            path = "";
        }
        
        log.info("\n----------------------------------------------------------\n\t" +
                "Application  is running! Access URLs:\n\t" +
                "servletWebServerFactory  类型\t：" + servletWebServerFactory.getClass().getSimpleName() + ":\n\t" +
                "Local访问网址: \t\thttp://localhost:" + port + path + "\n\t" +
                
                "External访问网址: \thttp://" + ip + ":" + port + path + "\n\t" +
                "Swagger访问网址: \thttp://" + ip + ":" + port + path + "/doc/index.html\n\t" +
                "----------------------------------------------------------");
    }
  
}
