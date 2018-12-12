<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:dubbo="http://code.alibabatech.com/schema/dubbo"
    xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-2.5.xsd
       http://code.alibabatech.com/schema/dubbo http://code.alibabatech.com/schema/dubbo/dubbo.xsd"
>

    <!-- 应用配置 各业务平台根据name区分,各变量从dalgenX.xml中读取 -->
    <dubbo:protocol id="${systemName}-dubbo-protocol" name="dubbo" port="${'$'}{${systemName}.dubbo.protocol.port}" serialization="fastjson" charset="UTF-8" />
    <dubbo:registry id="${systemName}-reg-addr" address="${'$'}{${systemName}.dubbo.registry.address}" protocol="${systemName}-dubbo-protocol" />

</beans>