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


    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource" init-method="init" destroy-method="close">
        <property name="driverClassName" value="com.mysql.jdbc.Driver" />
        <!-- 基本属性 url、user、password -->
        <!-- <property name="url" value="jdbc:mysql://localhost:3306/ibatis?useUnicode=true&amp;characterEncoding=utf8" />
            <property name="username" value="root" />
            <property name="password" value="" /> -->
        
        <property name="url" value="${'$'}{${systemName}.jdbc.url}" />
        <property name="username" value="${'$'}{${systemName}.jdbc.username}" />
        <property name="password" value="${'$'}{${systemName}.jdbc.password}" />
        <!-- 配置初始化大小、最小、最大 最大执行时间-->
        <property name="initialSize" value="${'$'}{jdbc.initialSize}" />
        <property name="minIdle" value="${'$'}{jdbc.minIdle}"  />
        <property name="maxActive" value="${'$'}{jdbc.maxActive}"  />
        <property name="maxWait" value="${'$'}{jdbc.maxWait}"  />

        <!-- 配置间隔多久才进行一次检测，检测需要关闭的空闲连接，单位是毫秒 -->
        <property name="timeBetweenEvictionRunsMillis" value="60000" />

        <!-- 配置一个连接在池中最小生存的时间，单位是毫秒 -->
        <property name="minEvictableIdleTimeMillis" value="300000" />

        <property name="validationQuery" value="SELECT 'x'" />
        <property name="testWhileIdle" value="true" />
        <property name="testOnBorrow" value="false" />
        <property name="testOnReturn" value="false" />

        <!-- 打开PSCache，并且指定每个连接上PSCache的大小 -->
        <property name="poolPreparedStatements" value="true" />
        <property name="maxPoolPreparedStatementPerConnectionSize" value="20" />

        <!-- 配置监控统计拦截的filters，去掉后监控界面sql无法统计 -->
        <property name="filters" value="stat" />
    </bean>

    <tx:annotation-driven transaction-manager="transactionManager" />

    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource" />
    </bean>

</beans>