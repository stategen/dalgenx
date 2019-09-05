<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
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
    <version>${'${'}systemVersion}</version>
    <packaging>war</packaging>
    <name>7-${systemName?uncap_first}-web-${projectName?uncap_first}</name>

    <dependencies>
        <dependency>
            <groupId>${packageName}</groupId>
            <artifactId>${systemName?uncap_first}-web-base</artifactId>
        </dependency>

        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
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
            <groupId>com.squareup.okhttp3</groupId>
            <artifactId>okhttp</artifactId>
            <version>3.4.1</version>
        </dependency>

        <dependency>
            <groupId>dom4j</groupId>
            <artifactId>dom4j</artifactId>
            <version>1.6.1</version>
        </dependency>

        <dependency>
            <groupId>com.github.binarywang</groupId>
            <artifactId>weixin-java-mp</artifactId>
            <version>2.7.0</version>
        </dependency>

        <dependency>
            <groupId>com.github.binarywang</groupId>
            <artifactId>weixin-java-common</artifactId>
            <version>2.7.0</version>
            <exclusions>
                <exclusion>
                    <groupId>org.apache.httpcomponents</groupId>
                    <artifactId>httpmime</artifactId>
                </exclusion>
            </exclusions>
        </dependency>

        <dependency>
            <groupId>org.stategen.framework</groupId>
            <artifactId>progen</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-test</artifactId>
        </dependency>
    </dependencies>



    <build>
        <plugins>
            <plugin>
                <artifactId>maven-compiler-plugin</artifactId>
                <configuration>
                    <source>1.8</source>
                    <target>1.8</target>
                    <encoding>UTF-8</encoding>
                </configuration>
            </plugin>

            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-clean-plugin</artifactId>
                <configuration>
                    <failOnError>true</failOnError>
                    <filesets>
                    </filesets>
                </configuration>
            </plugin>

            <plugin>
                <groupId>org.codehaus.mojo</groupId>
                <artifactId>exec-maven-plugin</artifactId>
                <executions>
                <!--APPEND_TAG_DO_NOT_CHANGE-->
                </executions>
            </plugin>

            <plugin>
                <artifactId>maven-war-plugin</artifactId>
                <configuration>
                    <warSourceDirectory>${'${'}basedir}/WebRoot</warSourceDirectory>
                    <warName>${'${'}warName}</warName>
                    <packagingExcludes>
                        node_modules/**
                    </packagingExcludes>
                </configuration>
            </plugin>

            <plugin>
                <artifactId>maven-deploy-plugin</artifactId>
                <executions>
                    <execution>
                        <id>default-deploy</id>
                        <phase>deploy</phase>
                        <goals>
                            <goal>deploy</goal>
                        </goals>
                        <configuration>
                            <!-- 不发布到maven仓库 -->
                            <skip>true</skip>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
        </plugins>
        <pluginManagement>
            <plugins>
                <!--This plugin's configuration is used to store Eclipse m2e settings only. It has no influence on the Maven build itself.-->
                <plugin>
                    <groupId>org.eclipse.m2e</groupId>
                    <artifactId>lifecycle-mapping</artifactId>
                    <version>1.0.0</version>
                    <configuration>
                        <lifecycleMappingMetadata>
                            <pluginExecutions>
                                <pluginExecution>
                                    <pluginExecutionFilter>
                                        <groupId>org.codehaus.mojo</groupId>
                                        <artifactId>exec-maven-plugin</artifactId>
                                        <versionRange>[1.6.0,)</versionRange>
                                        <goals>
                                            <goal>java</goal>
                                            <goal>exec</goal>
                                        </goals>
                                    </pluginExecutionFilter>
                                    <action>
                                        <ignore></ignore>
                                    </action>
                                </pluginExecution>
                            </pluginExecutions>
                        </lifecycleMappingMetadata>
                    </configuration>
                </plugin>
            </plugins>
        </pluginManagement>
    </build>
</project>