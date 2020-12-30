<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd"
>
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>${packageName}</groupId>
        <artifactId>${systemName?uncap_first}-parent</artifactId>
        <version>1.0.0</version>
        <relativePath>../</relativePath>
    </parent>

    <properties>
        <warName>${systemName?uncap_first}${projectName?cap_first}</warName>
    </properties>

    <artifactId>${systemName?uncap_first}-web-${projectName?uncap_first}</artifactId>
    <version>${'${'}system.version.SNAPSHOT}</version>
    <packaging>war</packaging>
    <name>7-${systemName?uncap_first}-web-${projectName?uncap_first}</name>
    
    <!-- 不需要springboot请将springboot部分注释 -->
    
    <!--springboot_import-->

    <dependencies>
        <dependency>
            <groupId>${packageName}</groupId>
            <artifactId>${systemName?uncap_first}-web-base</artifactId>
        </dependency>

        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-test</artifactId>
        </dependency>

        <dependency>
            <groupId>org.apache.httpcomponents</groupId>
            <artifactId>httpclient</artifactId>
        </dependency>

        <dependency>
            <groupId>org.apache.httpcomponents</groupId>
            <artifactId>httpmime</artifactId>
        </dependency>

        <dependency>
            <groupId>org.stategen.framework</groupId>
            <artifactId>progen</artifactId>
        </dependency>

        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
        </dependency>

        <!--qiniu begin -->
        <dependency>
            <groupId>org.jsoup</groupId>
            <artifactId>jsoup</artifactId>
            <version>1.12.1</version>
            <scope>test</scope>
        </dependency>

        <dependency>
            <groupId>com.qiniu</groupId>
            <artifactId>happy-dns-java</artifactId>
            <version>0.1.4</version>
            <scope>test</scope>
        </dependency>

        <dependency>
            <groupId>com.squareup.okio</groupId>
            <artifactId>okio</artifactId>
            <version>1.13.0</version>
            <scope>test</scope>
        </dependency>

        <dependency>
            <groupId>com.qiniu</groupId>
            <artifactId>qiniu-java-sdk</artifactId>
            <version>7.1.3</version>
            <scope>test</scope>
        </dependency>
        <!--qiniu end -->


    </dependencies>

    <profiles>
        <!--开发和测试-->
        <profile>
            <id>front</id>
            <activation>
                <activeByDefault>true</activeByDefault>
                <jdk>[1.8,)</jdk>
            </activation>
            <build>
                <plugins>
                    <plugin>
                        <groupId>org.codehaus.mojo</groupId>
                        <artifactId>exec-maven-plugin</artifactId>
                        <executions>            
							<!--APPEND_TAG_DO_NOT_CHANGE-->


                        </executions>
                    </plugin>
                </plugins>
            </build>
        </profile>
    </profiles>

    <build>
        <finalName>tradeApp</finalName>
        <plugins>
            <plugin>
                <artifactId>maven-deploy-plugin</artifactId>
            </plugin>

            <plugin>
                <artifactId>maven-clean-plugin</artifactId>
            </plugin>
            
            <!-- springboot begin -->
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <-- <outputDirectory>tomcat9 path\webapps</outputDirectory> -->
                </configuration>
            </plugin>
            <!-- springboot end -->
        </plugins>

    </build>
</project>