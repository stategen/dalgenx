<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans 
    http://www.springframework.org/schema/beans/spring-beans-3.0.xsd "
>

    <bean id="poolConfig" class="redis.clients.jedis.JedisPoolConfig">
        <property name="maxIdle" value="${'$'}{redis.maxIdle}" />
        <property name="maxTotal" value="${'$'}{redis.maxActive}" />
        <property name="maxWaitMillis" value="${'$'}{redis.maxWait}" />
        <property name="testOnBorrow" value="${'$'}{redis.testOnBorrow}" />
    </bean>

    <bean id="jedisConnectionFactory" class="org.springframework.data.redis.connection.jedis.JedisConnectionFactory">
        <property name="hostName" value="${'$'}{${systemName}.redis.host}" />
        <property name="port" value="${'$'}{${systemName}.redis.port}" />
        <property name="poolConfig" ref="poolConfig" />
    </bean>

    <bean id="stringSerializer" class="org.springframework.data.redis.serializer.StringRedisSerializer" />

    <bean id="stringRedisTemplate" class="org.springframework.data.redis.core.StringRedisTemplate">
        <property name="connectionFactory" ref="jedisConnectionFactory" />
    </bean>

    <bean id="redisTemplate" class="org.springframework.data.redis.core.RedisTemplate">
        <property name="connectionFactory" ref="jedisConnectionFactory" />
        <property name="keySerializer">
            <bean class="org.springframework.data.redis.serializer.StringRedisSerializer" />
        </property>
        <property name="valueSerializer">
            <bean class="org.springframework.data.redis.serializer.JdkSerializationRedisSerializer" />
        </property>
        <property name="hashKeySerializer">
            <bean class="org.springframework.data.redis.serializer.StringRedisSerializer" />
        </property>
        <property name="hashValueSerializer">
            <bean class="org.springframework.data.redis.serializer.JdkSerializationRedisSerializer" />
        </property>
    </bean>

    <bean class="org.stategen.framework.util.RedisTemplateUtil">
        <property name="redisTemplate" ref="redisTemplate" />
    </bean>

</beans>











