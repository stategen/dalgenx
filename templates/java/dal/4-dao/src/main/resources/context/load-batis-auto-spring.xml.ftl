<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans.xsd"
    default-autowire="byName"
>
    <!-- ============================================================ -->
    <!-- 本文件由dalgen生成，任何在本文件上的手工修改将会在下次生成时被覆盖=====  -->
    <!-- ============================================================ -->
    
    <!-- 根据gen_config.xml 中的dao_type配置动态引用持久层 -->
    <import resource="classpath*:context/sql-spring-${dao_type}.xml"/>
</beans>