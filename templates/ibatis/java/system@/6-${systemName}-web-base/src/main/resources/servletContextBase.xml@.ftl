<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans" xmlns:context="http://www.springframework.org/schema/context" xmlns:p="http://www.springframework.org/schema/p"
    xmlns:mvc="http://www.springframework.org/schema/mvc" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:tx="http://www.springframework.org/schema/tx"
    xmlns:task="http://www.springframework.org/schema/task" xmlns:aop="http://www.springframework.org/schema/aop"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans-3.0.xsd  
    http://www.springframework.org/schema/context  
    http://www.springframework.org/schema/context/spring-context.xsd  
    http://www.springframework.org/schema/mvc  
    http://www.springframework.org/schema/mvc/spring-mvc-3.2.xsd
    http://www.springframework.org/schema/tx 
    http://www.springframework.org/schema/tx/spring-tx-3.0.xsd 
    http://www.springframework.org/schema/task  
    http://www.springframework.org/schema/task/spring-task-3.2.xsd
    http://www.springframework.org/schema/aop 
    http://www.springframework.org/schema/aop/spring-aop-3.0.xsd "
    default-autowire="byName"
>
    <aop:aspectj-autoproxy />

    <bean id="viewResolver" class="org.stategen.framework.spring.mvc.MultiViewResolver">
        <property name="defaultViewResolver" ref="thymeleafResolver" />
        <property name="viewResolverMap">
            <map>
                <entry>
                    <key>
                        <set>
                            <value>.jsp</value>
                        </set>
                    </key>
                    <ref bean="jspViewResolver" />
                </entry>

                <entry>
                    <key>
                        <set>
                            <value>.th</value>
                            <value>.htm</value>
                            <value>.html</value>
                        </set>
                    </key>
                    <ref bean="thymeleafResolver" />
                </entry>

                <entry>
                    <key>
                        <set>
                            <value>.js</value>
                        </set>
                    </key>
                    <ref bean="freeMarkerViewResolver" />
                </entry>
            </map>
        </property>
    </bean>

    <bean id="beanNameViewResolver" class="org.springframework.web.servlet.view.BeanNameViewResolver" />
    <!--<bean id="multiRequestMappingInterceptor" class="org.stategen.framework.spring.mvc.MultiRequestMappingInterceptor" /> -->

<!--     <context:component-scan base-package="com.mycompany.biz.controller">
        <context:include-filter type="regex" expression=".controller.*Controller" />
    </context:component-scan> -->
    
    <!-- 使用Annotation自动注册Bean,只扫描@Controller -->
    <!-- base-package 如果多个，用“,”分隔 -->
    <context:component-scan base-package="${packageName}.controller" use-default-filters="false">
        <context:include-filter type="annotation" expression="org.springframework.stereotype.Controller" />
    </context:component-scan>

    <bean class="org.springframework.validation.beanvalidation.MethodValidationPostProcessor">
        <property name="validator" ref="validator" />
    </bean>

    <bean id="validator" class="org.springframework.validation.beanvalidation.LocalValidatorFactoryBean">
        <property name="providerClass" value="org.hibernate.validator.HibernateValidator" />
        <!-- 如果不加默认到 使用classpath下的 ValidationMessages.properties -->
        <property name="validationMessageSource" ref="messageSource" />
    </bean>

    <bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
        <property name="defaultEncoding" value="utf-8" />
        <property name="maxUploadSize" value="10485760000" />
        <property name="maxInMemorySize" value="40960" />
    </bean>

    <!-- token生成码 -->
    <bean id="defaultCookieTokenGenerator" class="org.stategen.framework.web.cookie.CookieTokenGeneratorDefault" />

    <!-- 权限拦截,由各自的annotain check 处理 -->
    <bean id="authCheckerHandlerInterceptor" class="org.stategen.framework.spring.mvc.AuthCheckerHandlerInterceptor">
        <property name="responseStatusClzOfCheckFailDefault" value="${packageName}.enums.ResponseStatus.NO_TOKEN" />
    </bean>
    
    <!-- 
    <bean id="testGetUsersHandlerInterceptor" class="${packageName}.utils.TestGetUsersHandlerInterceptor">
    </bean>
	  -->

    <!-- 以下配置代替 mvc:annotation-driven ,采用自定义swagger @apiMethodResourceMapping时，不需要写 path，自动映射方法名 避免硬编码，减少调试麻烦,-->
    <!-- 处理在类级别上的@RequestMapping注解 -->
    <bean class="org.stategen.framework.spring.mvc.RequestMappingMethodHandlerMapping">
        <property name="interceptors">
            <list>
                <ref bean="authCheckerHandlerInterceptor" />
                <!-- <ref bean="testGetUsersHandlerInterceptor" /> -->
            </list>
        </property>
    </bean>

    <!-- 所有异常处理 -->
    <bean class="org.stategen.framework.spring.mvc.CollectExceptionJsonHandler">
        <property name="responseStatusClzOfException" value="${packageName}.enums.ResponseStatus.ERROR" />
    </bean>

    <!-- 处理结果拦截，转换为包装类 -->
    <bean class="org.stategen.framework.spring.mvc.ResponseBodyAdviceWrapper">
        <property name="packages">
            <list>
                <value>${packageName}.controller</value>
            </list>
        </property>
        <property name="responseStatusClzOfResult" value="${packageName}.enums.ResponseStatus.OK" />
    </bean>

    <!-- 验证cookie分组 ,该类可以多个，配置不同的分组 -->
    <bean id="baseCookieGroup" class="org.stategen.framework.web.cookie.CookieGroup">
        <property name="cookieTypeClz" value="${packageName}.enums.CookieType.BASE" />
        <property name="responseStatusClzOfTokenError" value="${packageName}.enums.ResponseStatus.NO_TOKEN" />
    </bean>

    <!-- 处理方法级别上的@RequestMapping注解 -->
    <bean class="org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter">
        <property name="messageConverters">
            <list>
                <ref bean="fastJsonHttpMessageConverter" />
            </list>
        </property>

        <property name="webBindingInitializer">
            <bean class="org.springframework.web.bind.support.ConfigurableWebBindingInitializer">
                <property name="conversionService" ref="conversionService"></property>
            </bean>
        </property>
    </bean>

    <bean class="org.stategen.framework.checker.DefaultCookieCheckChecker" />
    <bean class="${packageName}.checker.VisitChecker" />
    <bean class="${packageName}.checker.LoginChecker" />
    <bean class="org.stategen.framework.spring.mvc.SwaggerConfig" />

    <!-- 文档转文档 -->
    <mvc:resources mapping="/doc/**" location="classpath:/doc/" />

    <!-- 前端静态页面转前端页面 -->
    <mvc:resources mapping="/pages/static/**" location="pages/static/" />
    <mvc:resources mapping="/static/**" location="pages/static/" />
    <mvc:resources mapping="/pages/service-worker.js" location="pages/" />


    <import resource="classpath*:servlet/*-spring.xml" />
</beans>