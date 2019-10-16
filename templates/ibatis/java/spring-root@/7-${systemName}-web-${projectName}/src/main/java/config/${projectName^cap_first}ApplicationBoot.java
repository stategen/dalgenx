package config;

import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.ServletComponentScan;

@SpringBootConfiguration
@ServletComponentScan
public class ${projectName?cap_first}ApplicationBoot {
    final static org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(${projectName?cap_first}ApplicationBoot.class);

    public static void main(String[] args) {
        //先生成关于servlet-spring相关的 ApplicationContext ,后面用这个启动
        SpringApplicationBuilder servletBuilder = new SpringApplicationBuilder(${projectName?cap_first}ApplicationBoot.class,
            CodeConfigSpringBoot.BootServletConfig.class, CodeConfigAsWebXml.ServletContextConfig.class,
            CodeConfigSpringBoot.ServletFactoryConfig.class);
        servletBuilder.web(WebApplicationType.SERVLET);

        //经上面的  applicatonContext设置parent
        SpringApplicationBuilder applicationBuilder = servletBuilder.parent(CodeConfigAsWebXml.RootContextConfig.class);
        applicationBuilder.web(WebApplicationType.NONE);

        //启动
        servletBuilder.run(args);

        logger.info("${projectName?cap_first}ApplicationBoot 启动了");
    }

}
