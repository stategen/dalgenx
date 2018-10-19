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
    http://www.springframework.org/schema/task/spring-task-3.0.xsd"
>
    <bean id="propertyPlaceholder" class="org.stategen.framework.spring.mvc.MultiPropertyPlaceholderConfigurer">
        <property name="locations">
            <list>
                <value>classpath*:application.properties</value>
                <value>file://opt/config/stategen/stategenX.xml</value>
            </list>
        </property>
        <!-- spring启动中对每个取值项进行检查 -->
        <!-- <property name="ignoreUnresolvablePlaceholders" value="true" /> -->
    </bean>
    
    <bean id="urls" class="java.util.HashMap"/>

</beans>