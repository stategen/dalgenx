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
        <failOnMissingWebXml>false</failOnMissingWebXml>
    </properties>

    <artifactId>${systemName?uncap_first}-web-${projectName?uncap_first}</artifactId>
    <version>${'${'}system.version.SNAPSHOT}</version>
    <packaging>war</packaging>
    <name>7-${systemName?uncap_first}-web-${projectName?uncap_first}</name>



    <dependencies>
        <!-- @since stg2.2.3.RELEASE,为减少jar维护难度，架构层jars可统一引用各自层的layer-pom -->
        <dependency>
            <groupId>org.stategen.framework.layers</groupId>
            <artifactId>stategen-layer-web-pom</artifactId>
            <type>pom</type>
        </dependency>

        <dependency>
            <groupId>${packageName}</groupId>
            <artifactId>${systemName?uncap_first}-web-base</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-test</artifactId>
        </dependency>



    </dependencies>

    <profiles>
        <!--开发和测试 -->
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
							
							<!--APPEND_TAG_DO_NOT_CHANGE -->

                        </executions>
                    </plugin>
                    
                </plugins>
            </build>
        </profile>
    </profiles>

    <build>
        <finalName>${appName?uncap_first}</finalName>
        <resources>
            <resource>
                <directory>src/main/resources</directory>
            </resource>

            <resource>
                <directory>WebRoot/pages</directory>
                <targetPath>public/pages</targetPath>
            </resource>
        </resources>

        <plugins>
            <plugin>
			    <!-- 引入即不发布到maven仓库 -->
                <artifactId>maven-deploy-plugin</artifactId>
            </plugin>

            <plugin>
                <artifactId>maven-war-plugin</artifactId>
            </plugin>

            <plugin>
                <artifactId>maven-clean-plugin</artifactId>
            </plugin>

            <!-- springboot begin -->
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <!-- <outputDirectory>D:\java\tomcat\tomcat-9.0.30\webapps</outputDirectory> -->
                    <mainClass>${packageName}.${appName}Application</mainClass>
                    <addResources />

                </configuration>
            </plugin>
            <!-- springboot end -->

        </plugins>

    </build>
</project>