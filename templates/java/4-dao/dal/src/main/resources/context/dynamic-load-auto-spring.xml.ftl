<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:osgi="http://www.springframework.org/schema/osgi"
    xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
         http://www.springframework.org/schema/osgi http://www.springframework.org/schema/osgi/spring-osgi.xsd"
    default-autowire="byName"
>
    <!-- ============================================================ -->
    <!-- 本文件由dalgen生成，任何在本文件上的手工修改将会在下次生成时被覆盖    -->
    <!-- ============================================================ -->
    
    <!-- 引用外面的dubbo服务,不引用自己（trade）的服务,trade为动态生成 -->
    <import resource="classpath*:META-INF/facade/dubbo-facade-auto-{:?!.*(${systemName})}*.xml"/>
    <import resource="classpath*:META-INF/facade/dubbo-facade-manual-{:?!.*(${systemName})}*.xml"/>
    
    <!-- 动态决定引用哪个持久层 -->
    <import resource="classpath*:context/sql-spring-${dao_type}.xml"/>
</beans>