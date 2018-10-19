<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:p="http://www.springframework.org/schema/p"
    xmlns:aop="http://www.springframework.org/schema/aop" xmlns:tx="http://www.springframework.org/schema/tx" xmlns:task="http://www.springframework.org/schema/task"
    xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation="http://www.springframework.org/schema/beans 
    http://www.springframework.org/schema/beans/spring-beans-3.0.xsd 
    http://www.springframework.org/schema/context 
    http://www.springframework.org/schema/context/spring-context.xsd
    http://www.springframework.org/schema/aop 
    http://www.springframework.org/schema/aop/spring-aop-3.0.xsd 
    http://www.springframework.org/schema/tx 
    http://www.springframework.org/schema/tx/spring-tx-3.0.xsd 
    http://www.springframework.org/schema/task 
    http://www.springframework.org/schema/task/spring-task-3.0.xsd "
>

    <context:annotation-config />

    <import resource="classpath*:context/applicatonContextProperties.xml" />

    <!-- 返回以对象包装的类 ,id必须是response -->
    <bean id="response" class="${packageName}.domain.ResponseExtend" scope="prototype">
    </bean>

    <bean class="org.stategen.framework.spring.mvc.SpringContextHolder" />

    <!-- 枚举类所在包，该类数据库内值与枚举名称不一致的枚举扫描到缓存 -->
    <bean class="org.stategen.framework.util.ValuedEnumScanner">
        <property name="packages">
            <list>
                <value>${packageName}.enums</value>
            </list>
        </property>
    </bean>

    <bean class="configs.Configration">
        <property name="maxRequestPerIpSecond" value="${'$'}{framework_max_request_per_ip_second}" />
        <property name="wrapperResponse" value="true" />
        <property name="enableSwagger" value="${'$'}{swagger.enable}"/>
    </bean>

    <bean id="localCacheZkConfig" class="org.stategen.framework.cache.LocalCacheZkConfig">
        <property name="connectString" value="${'$'}{localCacheZkConfig.connectString}" />
        <property name="rootPath" value="${'$'}{localCacheZkConfig.rootPath}" />
        <property name="connectionTimeout" value="${'$'}{localCacheZkConfig.connectionTimeout}" />
    </bean>

    <import resource="classpath*:context/dao-beans-auto-*.xml" />
    <import resource="classpath*:context/dao-beans-manual-*.xml" />
    <import resource="classpath*:context/service-beans-auto-*.xml" />
    <import resource="classpath*:context/service-beans-manual-*.xml" />
    <import resource="classpath*:context/*-spring.xml" />
    
</beans>