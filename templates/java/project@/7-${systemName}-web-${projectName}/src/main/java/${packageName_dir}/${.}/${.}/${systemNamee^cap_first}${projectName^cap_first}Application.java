package ${packageName};

import javax.servlet.ServletContext;
import javax.servlet.ServletException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@EnableAutoConfiguration
@EnableDiscoveryClient // 表明是一个Nacos客户端，该注解是 SpringCloud 提供的原生注解。
@ServletComponentScan(basePackageClasses=WebXml.class)
@Import({
        CodeConfigSpringBoot.BootServletConfig.class,
        CodeConfigSpringBoot.ServletFactoryConfig.class })

public class ${systemName?cap_first}${projectName?cap_first}Application extends SpringBootServletInitializer {
    final static org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(TradeAppApplication.class);
    
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.main(TradeAppApplication.class);
    }
    
    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        super.onStartup(servletContext);
    }
    
    
    public static void main(String[] args) {
        logger.info("从main启动");
        for (String arg : args) {
           System.out.println("arg<===========>:" + arg);
        }
        SpringApplication.run(TradeAppApplication.class, args);
        logger.info("AppApplicationBoot 启动了");
    }
    
}
