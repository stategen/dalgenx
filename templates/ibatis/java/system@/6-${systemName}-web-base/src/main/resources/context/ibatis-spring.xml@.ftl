<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:mvc="http://www.springframework.org/schema/mvc"
    xmlns:context="http://www.springframework.org/schema/context" xmlns:aop="http://www.springframework.org/schema/aop" xmlns:tx="http://www.springframework.org/schema/tx"
    xsi:schemaLocation="  
        http://www.springframework.org/schema/beans   
        http://www.springframework.org/schema/beans/spring-beans-3.0.xsd  
        http://www.springframework.org/schema/mvc   
        http://www.springframework.org/schema/mvc/spring-mvc-3.0.xsd  
        http://www.springframework.org/schema/context   
        http://www.springframework.org/schema/context/spring-context-3.0.xsd  
        http://www.springframework.org/schema/tx  
        http://www.springframework.org/schema/tx/spring-tx-3.0.xsd  
        http://www.springframework.org/schema/aop  
        http://www.springframework.org/schema/aop/spring-aop-3.0.xsd"
    default-autowire="byName"
>

    <bean id="lobHandler" class="org.springframework.jdbc.support.lob.DefaultLobHandler" />

    <!-- iBatis SQL map定义 ,使用spring3 ,spring3模板 -->
    <bean id="SqlMapClientDAO-${systemName}" abstract="true">
        <property name="dataSource" ref="dataSource" />
    </bean>

    <bean id="sqlMapClient" class="org.springframework.orm.ibatis.SqlMapClientFactoryBean">
        <property name="configLocations">
            <list>
                <!-- 加载sqlmap -->
                <value>classpath*:sqlmap/sqlmap-config-*.xml</value>
            </list>
        </property>
        <property name="dataSource" ref="dataSource" />
        <property name="lobHandler" ref="lobHandler" />
    </bean>

    <bean id="sqlMapClientTemplate" class="org.springframework.orm.ibatis.SqlMapClientTemplate">
        <property name="sqlMapClient" ref="sqlMapClient"></property>
    </bean>

</beans>