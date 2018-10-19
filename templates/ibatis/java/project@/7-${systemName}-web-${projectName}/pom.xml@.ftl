<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>${packageName}</groupId>
        <artifactId>${systemName}-parent</artifactId>
        <version>1.0.0</version>
        <relativePath>../</relativePath>
    </parent>

    <properties>
        <frontend>${projectName}-frontend</frontend>
        <warName>${systemName}${projectName?cap_first}</warName>
    </properties>

    <artifactId>${systemName}-web-${projectName}</artifactId>
    <version>${'$'}{systemVersion}</version>
    <packaging>war</packaging>
    <name>7-${systemName}-web-${projectName}</name>

    <dependencies>
        <dependency>
            <groupId>${packageName}</groupId>
            <artifactId>${systemName}-web-base</artifactId>
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
    </dependencies>



    <build>
        <plugins>
            <plugin>
                <artifactId>maven-compiler-plugin</artifactId>
                <configuration>
                    <source>1.8</source>
                    <target>1.8</target>
                </configuration>
            </plugin>

            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-clean-plugin</artifactId>
                <configuration>
                    <failOnError>true</failOnError>
                    <filesets>
<!--                         <fileset>
                            <directory>./${'$'}{frontend}/dist/</directory>
                            <includes>
                                <include>**/*</include>
                            </includes>
                            <followSymlinks>false</followSymlinks>
                        </fileset>
                        <fileset>
                            <directory>./WebRoot/pages/</directory>
                            <includes>
                                <include>**/*</include>
                            </includes>
                            <followSymlinks>false</followSymlinks>
                        </fileset> -->
                    </filesets>
                </configuration>
            </plugin>

            <plugin>
                <groupId>org.codehaus.mojo</groupId>
                <artifactId>exec-maven-plugin</artifactId>
                <executions>
                    <!-- 生成ts文件模型和cms -->
                    <execution>
                        <id>>>>>>>>>>>>>>>>>auto generate frondend files 生成前端代码 &lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</id>
                        <phase>test</phase>
                        <goals>
                            <goal>java</goal>
                        </goals>
                        <configuration>
                            <mainClass>${packageName}.facadegen.UmiFacadeProcessor</mainClass>
                            <classpathScope>test</classpathScope>
                        </configuration>
                    </execution>
                    
                    <!-- 安装前端代码需要的插件 -->
                    <execution>
                        <id>>>>>>>>>>>>>>>>>yarn 安装前端组件 &lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</id>
                        <phase>test</phase>
                        <goals>
                            <goal>exec</goal>
                        </goals>
                        <configuration>
                            <workingDirectory>./${'$'}{frontend}/</workingDirectory>
                            <executable>yarn</executable>
                            <arguments>
                                <!-- <argument>install</argument> -->
                            </arguments>
                        </configuration>

                    </execution>
                    
                    <!-- 编译前端代码 -->
                    <execution>
                        <id>>>>>>>>>>>>>>>>>yarn run build 编译前端代码 &lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</id>
                        <phase>test</phase>
                        <goals>
                            <goal>exec</goal>
                        </goals>

                        <configuration>
                            <workingDirectory>./${'$'}{frontend}/</workingDirectory>
                            <executable>yarn</executable>
                            <arguments>
                                <argument>run</argument>
                                <argument>build</argument>
                            </arguments>
                        </configuration>
                    </execution>
                </executions>
            </plugin>

<!--             <plugin>
                <artifactId>maven-resources-plugin</artifactId>
                <executions>
                    <execution>
                        <id>>>>>>>>>>>>>>>>>copy-frontend 复到前端编译后的代码到WebRoot下 &lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</id>
                        <phase>test</phase>
                        <goals>
                            <goal>copy-resources</goal>
                        </goals>

                        <configuration>
                            <outputDirectory>${'$'}{basedir}/WebRoot/pages</outputDirectory>
                            <resources>
                                <resource>
                                    <directory>./${'$'}{frontend}/dist</directory>
                                    <includes>
                                        <include>**/*</include>
                                    </includes>
                                </resource>
                            </resources>
                        </configuration>
                    </execution>
                </executions>
            </plugin> -->

            <plugin>
                <artifactId>maven-war-plugin</artifactId>
                <configuration>
                    <warSourceDirectory>${'$'}{basedir}/WebRoot</warSourceDirectory>
                    <warName>${'$'}{warName}</warName>
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