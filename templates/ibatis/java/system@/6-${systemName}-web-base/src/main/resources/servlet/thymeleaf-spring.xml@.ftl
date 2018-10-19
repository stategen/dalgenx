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
>
    <bean id="thymeleaf.templateResolver" class="org.thymeleaf.spring4.templateresolver.SpringResourceTemplateResolver">
        <!-- <property name="prefix" value="/resources/" /> -->
        <property name="cacheable" value="false" />
        <property name="cacheTTLMs" value="1" />
        <!-- 设置thymeleaf可以解析html的mode -->
        <property name="templateMode" value="LEGACYHTML5" />
        <!--这里要设置编码 -->
        <property name="characterEncoding" value="utf-8" />
    </bean>

    <bean id="thymeleaf.templateEngine" class="org.thymeleaf.spring4.SpringTemplateEngine">
        <property name="templateResolver" ref="thymeleaf.templateResolver" />
    </bean>

    <bean id="thymeleafResolver" class="org.thymeleaf.spring4.view.ThymeleafViewResolver">
        <property name="templateEngine" ref="thymeleaf.templateEngine" />
        <property name="characterEncoding" value="utf-8" />
        <property name="cache" value="false" />
    </bean>

</beans>