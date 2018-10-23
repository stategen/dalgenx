<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.stategen.framework</groupId>
        <artifactId>stategen-parent</artifactId>
        <version>2.0.0.stategen.RELEASE</version>
    </parent>

    <groupId>${packageName}</groupId>
    <artifactId>${systemName}-parent</artifactId>
    <version>1.0.0</version>
    <packaging>pom</packaging>
    <name>0-${systemName}-parent</name>

    <modules>
        <module>1-${systemName}-pojo</module>
        <module>2-${systemName}-facade</module>
        <module>3-${systemName}-intergrade</module>
        <module>4-${systemName}-dao</module>
        <module>5-${systemName}-service</module>
        <module>6-${systemName}-web-base</module>
    </modules>

    <properties>
        <!-- 发到公司私有maven仓库中，即pojo和facade(dubbo服务的版本) -->
        <${systemName}-facade-version>1.0.0-release</${systemName}-facade-version>
        <!-- 本系统的版本，不会被发布到maven仓库中，故以snapshort结尾,后续pom.xml已控制,避免误发 -->
        <systemVersion>${systemName}-1.0.0-snapshot</systemVersion>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>

        <distribution-id>thirdparty</distribution-id>
        <distribution-url>http://nexus:8081/content/repositories/thirdparty/</distribution-url>

    </properties>

    <distributionManagement>
        <repository>
            <id>${'$'}{distribution-id}</id>
            <url>${'$'}{distribution-url}</url>
        </repository>
    </distributionManagement>
    <dependencies>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.16.10</version>
        </dependency>
    </dependencies>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.stategen.framework</groupId>
                <artifactId>aa-stategen-ibatis-util</artifactId>
                <version>${'$'}{stategen-version}</version>
            </dependency>

            <dependency>
                <groupId>org.stategen.framework</groupId>
                <artifactId>stategen-dto-lite</artifactId>
                <version>${'$'}{stategen-version}</version>
            </dependency>

            <dependency>
                <groupId>org.stategen.framework</groupId>
                <artifactId>stategen-cache</artifactId>
                <version>${'$'}{stategen-version}</version>
            </dependency>

            <dependency>
                <groupId>org.stategen.framework</groupId>
                <artifactId>aa-stategen-logback</artifactId>
                <version>${'$'}{stategen-version}</version>
                <scope>runtime</scope>
            </dependency>

            <dependency>
                <groupId>org.stategen.framework</groupId>
                <artifactId>stategen-mvc</artifactId>
                <version>${'$'}{stategen-version}</version>
            </dependency>

            <dependency>
                <groupId>org.stategen.framework</groupId>
                <artifactId>stategen-util</artifactId>
                <version>${'$'}{stategen-version}</version>
            </dependency>

            <dependency>
                <groupId>com.alibaba</groupId>
                <artifactId>dubbo</artifactId>
                <version>${'$'}{dubbo-version}</version>
                <exclusions>
                    <exclusion>
                        <artifactId>log4j</artifactId>
                        <groupId>log4j</groupId>
                    </exclusion>
                    <exclusion>
                        <groupId>commons-logging</groupId>
                        <artifactId>commons-logging</artifactId>
                    </exclusion>
                </exclusions>
            </dependency>

            <dependency>
                <groupId>org.stategen.framework</groupId>
                <artifactId>aa-stategen-dubbox</artifactId>
                <version>${'$'}{stategen-version}</version>
            </dependency>

            <dependency>
                <groupId>org.stategen.framework</groupId>
                <artifactId>progen</artifactId>
                <version>${'$'}{stategen-version}</version>
            </dependency>

            <dependency>
                <groupId>org.stategen.framework</groupId>
                <artifactId>swagger2-ui</artifactId>
                <version>${'$'}{stategen-version}</version>
            </dependency>

            <dependency>
                <groupId>${packageName}</groupId>
                <artifactId>${systemName}-pojo</artifactId>
                <version>${'$'}{${systemName}-facade-version}</version>
            </dependency>

            <dependency>
                <groupId>${packageName}</groupId>
                <artifactId>${systemName}-facade</artifactId>
                <version>${'$'}{${systemName}-facade-version}</version>
            </dependency>

            <dependency>
                <groupId>${packageName}</groupId>
                <artifactId>${systemName}-intergrade</artifactId>
                <version>${'$'}{systemVersion}</version>
            </dependency>

            <dependency>
                <groupId>${packageName}</groupId>
                <artifactId>${systemName}-dao</artifactId>
                <version>${'$'}{systemVersion}</version>
            </dependency>

            <dependency>
                <groupId>${packageName}</groupId>
                <artifactId>${systemName}-service</artifactId>
                <version>${'$'}{systemVersion}</version>
            </dependency>

            <dependency>
                <groupId>${packageName}</groupId>
                <artifactId>${systemName}-web-base</artifactId>
                <version>${'$'}{systemVersion}</version>
            </dependency>

            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-jdbc</artifactId>
                <version>${'$'}{spring.version}</version>
            </dependency>

            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-webmvc</artifactId>
                <version>${'$'}{spring.version}</version>
            </dependency>

            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-core</artifactId>
                <version>${'$'}{spring.version}</version>
                <exclusions>
                    <exclusion>
                        <groupId>commons-logging</groupId>
                        <artifactId>commons-logging</artifactId>
                    </exclusion>
                </exclusions>
            </dependency>

            <dependency>
                <groupId>com.alibaba</groupId>
                <artifactId>druid</artifactId>
                <scope>runtime</scope>
                <version>1.0.16</version>
            </dependency>

            <dependency>
                <groupId>org.thymeleaf</groupId>
                <artifactId>thymeleaf</artifactId>
                <version>3.0.1.RELEASE</version>
            </dependency>

            <dependency>
                <groupId>org.thymeleaf</groupId>
                <artifactId>thymeleaf-spring4</artifactId>
                <version>3.0.1.RELEASE</version>
            </dependency>

            <dependency>
                <groupId>ch.qos.logback</groupId>
                <artifactId>logback-classic</artifactId>
                <version>${'$'}{logback-version}</version>
            </dependency>

            <dependency>
                <groupId>org.slf4j</groupId>
                <artifactId>log4j-over-slf4j</artifactId>
                <version>1.7.20</version>
            </dependency>

            <dependency>
                <groupId>org.slf4j</groupId>
                <artifactId>slf4j-api</artifactId>
                <version>1.7.21</version>
                <scope>compile</scope>
            </dependency>

            <dependency>
                <groupId>org.logback-extensions</groupId>
                <artifactId>logback-ext-spring</artifactId>
                <version>0.1.5</version>
                <exclusions>
                    <exclusion>
                        <groupId>ch.qos.logback</groupId>
                        <artifactId>logback-classic</artifactId>
                    </exclusion>
                </exclusions>
            </dependency>

            <dependency>
                <groupId>org.slf4j</groupId>
                <artifactId>jcl-over-slf4j</artifactId>
                <version>1.7.12</version>
            </dependency>

<!--             <dependency>
                <groupId>org.jboss.slf4j</groupId>
                <artifactId>slf4j-jboss-logging</artifactId>
                <version>1.0.2.GA</version>
            </dependency> -->

            <dependency>
                <groupId>mysql</groupId>
                <artifactId>mysql-connector-java</artifactId>
                <version>5.1.37</version>
            </dependency>

            <dependency>
                <groupId>org.apache.commons</groupId>
                <artifactId>commons-pool2</artifactId>
                <version>2.4.2</version>
            </dependency>

            <dependency>
                <groupId>redis.clients</groupId>
                <artifactId>jedis</artifactId>
                <version>2.7.3</version>
            </dependency>

            <dependency>
                <groupId>org.glassfish</groupId>
                <artifactId>javax.servlet.jsp.jstl</artifactId>
                <version>3.0.1</version>
            </dependency>

            <dependency>
                <groupId>com.alibaba</groupId>
                <artifactId>fastjson</artifactId>
                <version>${'$'}{fastjson-version}</version>
            </dependency>

            <dependency>
                <groupId>com.google.code.gson</groupId>
                <artifactId>gson</artifactId>
                <version>2.3.1</version>
            </dependency>

            <dependency>
                <groupId>javax</groupId>
                <artifactId>javaee-api</artifactId>
                <version>7.0</version>
                <scope>provided</scope>
            </dependency>

            <dependency>
                <groupId>junit</groupId>
                <artifactId>junit</artifactId>
                <version>4.12</version>
                <scope>test</scope>
            </dependency>

            <dependency>
                <groupId>commons-beanutils</groupId>
                <artifactId>commons-beanutils</artifactId>
                <version>1.9.2</version>
                <exclusions>
                    <exclusion>
                        <groupId>commons-logging</groupId>
                        <artifactId>commons-logging</artifactId>
                    </exclusion>
                </exclusions>
            </dependency>

            <dependency>
                <groupId>javax.servlet</groupId>
                <artifactId>javax.servlet-api</artifactId>
                <version>3.1.0</version>
                <scope>provided</scope>
            </dependency>

            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-test</artifactId>
                <version>${'$'}{spring.version}</version>
                <scope>test</scope>
            </dependency>

            <dependency>
                <groupId>org.aspectj</groupId>
                <artifactId>aspectjweaver</artifactId>
                <version>1.7.4</version>
            </dependency>

            <dependency>
                <groupId>org.hibernate</groupId>
                <artifactId>hibernate-validator</artifactId>
                <version>5.2.4.Final</version>
                <exclusions>
<!--                     <exclusion>
                        <groupId>org.jboss.logging</groupId>
                        <artifactId>jboss-logging</artifactId>
                    </exclusion> -->
                </exclusions>
            </dependency>

            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-context</artifactId>
                <version>${'$'}{spring.version}</version>
            </dependency>

            <dependency>
                <groupId>commons-fileupload</groupId>
                <artifactId>commons-fileupload</artifactId>
                <version>1.3</version>
            </dependency>

            <dependency>
                <groupId>org.apache.zookeeper</groupId>
                <artifactId>zookeeper</artifactId>
                <version>3.4.6</version>
                <exclusions>
                    <exclusion>
                        <artifactId>log4j</artifactId>
                        <groupId>log4j</groupId>
                    </exclusion>
                    <exclusion>
                        <groupId>org.slf4j</groupId>
                        <artifactId>slf4j-log4j12</artifactId>
                    </exclusion>
                </exclusions>
            </dependency>

            <dependency>
                <groupId>com.taobao.pamirs.schedule</groupId>
                <artifactId>DISchedule</artifactId>
                <version>${'$'}{DI-tbSchedule-version}</version>
            </dependency>

            <dependency>
                <groupId>commons-lang</groupId>
                <artifactId>commons-lang</artifactId>
                <version>2.4</version>
            </dependency>

            <dependency>
                <groupId>org.apache.commons</groupId>
                <artifactId>commons-email</artifactId>
                <version>1.4</version>
            </dependency>

            <dependency>
                <groupId>org.freemarker</groupId>
                <artifactId>freemarker</artifactId>
                <version>2.3.28</version>
            </dependency>

            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-context-support</artifactId>
                <version>${'$'}{spring.version}</version>
            </dependency>

            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-aop</artifactId>
                <version>${'$'}{spring.version}</version>
            </dependency>

            <dependency>
                <groupId>com.101tec</groupId>
                <artifactId>zkclient</artifactId>
                <version>0.10</version>
                <exclusions>
                    <exclusion>
                        <artifactId>log4j</artifactId>
                        <groupId>log4j</groupId>
                    </exclusion>
                    <exclusion>
                        <groupId>org.slf4j</groupId>
                        <artifactId>slf4j-log4j12</artifactId>
                    </exclusion>
                </exclusions>
            </dependency>

            <dependency>
                <groupId>org.springframework.data</groupId>
                <artifactId>spring-data-redis</artifactId>
                <version>${'$'}{spring-data-redis-version}</version>
                <exclusions>
                    <exclusion>
                        <artifactId>spring-context-support</artifactId>
                        <groupId>org.springframework</groupId>
                    </exclusion>
                    <exclusion>
                        <artifactId>spring-context</artifactId>
                        <groupId>org.springframework</groupId>
                    </exclusion>
                    <exclusion>
                        <artifactId>spring-aop</artifactId>
                        <groupId>org.springframework</groupId>
                    </exclusion>
                    <exclusion>
                        <artifactId>spring-tx</artifactId>
                        <groupId>org.springframework</groupId>
                    </exclusion>
                    <exclusion>
                        <artifactId>slf4j-api</artifactId>
                        <groupId>org.slf4j</groupId>
                    </exclusion>
                    <exclusion>
                        <artifactId>spring-oxm</artifactId>
                        <groupId>org.springframework</groupId>
                    </exclusion>
                </exclusions>
            </dependency>


            <dependency>
                <groupId>com.google.zxing</groupId>
                <artifactId>core</artifactId>
                <version>3.0.0</version>
            </dependency>

            <dependency>
                <groupId>org.quartz-scheduler</groupId>
                <artifactId>quartz</artifactId>
                <version>2.2.1</version>
            </dependency>

            <dependency>
                <groupId>joda-time</groupId>
                <artifactId>joda-time</artifactId>
                <version>2.8.2</version>
            </dependency>

            <dependency>
                <groupId>com.google.guava</groupId>
                <artifactId>guava</artifactId>
                <version>21.0</version>
            </dependency>

            <dependency>
                <groupId>org.elasticsearch</groupId>
                <artifactId>elasticsearch</artifactId>
                <version>2.3.4</version>
                <exclusions>
                    <exclusion>
                        <groupId>org.apache.lucene</groupId>
                        <artifactId>lucene-analyzers-common</artifactId>
                    </exclusion>
                </exclusions>
            </dependency>

            <dependency>
                <groupId>org.apache.lucene</groupId>
                <artifactId>lucene-analyzers-common</artifactId>
                <version>5.5.1</version>
            </dependency>

            <dependency>
                <groupId>net.sf.ehcache</groupId>
                <artifactId>ehcache-core</artifactId>
                <version>2.6.2</version>
            </dependency>

            <dependency>
                <groupId>aopalliance</groupId>
                <artifactId>aopalliance</artifactId>
                <version>1.0</version>
            </dependency>

            <dependency>
                <groupId>org.apache.httpcomponents</groupId>
                <artifactId>httpclient</artifactId>
                <version>4.5.1</version>
                <exclusions>
                    <exclusion>
                        <groupId>commons-logging</groupId>
                        <artifactId>commons-logging</artifactId>
                    </exclusion>
                </exclusions>
            </dependency>
            <dependency>
                <groupId>org.apache.httpcomponents</groupId>
                <artifactId>httpmime</artifactId>
                <version>4.5.1</version>
            </dependency>

            <dependency>
                <groupId>org.apache.ibatis</groupId>
                <artifactId>ibatis-sqlmap</artifactId>
                <version>2.3.4.726</version>
            </dependency>

            <!-- swagger-mvc -->
            <dependency>
                <groupId>io.springfox</groupId>
                <artifactId>springfox-swagger2</artifactId>
                <version>2.4.0</version>
                <exclusions>
                    <exclusion>
                        <groupId>org.springframework</groupId>
                        <artifactId>spring-beans</artifactId>
                    </exclusion>
                    <exclusion>
                        <groupId>org.springframework</groupId>
                        <artifactId>spring-content</artifactId>
                    </exclusion>
                </exclusions>
            </dependency>

            <dependency>
                <groupId>io.swagger</groupId>
                <artifactId>swagger-annotations</artifactId>
                <version>1.5.6</version>
            </dependency>
            <!-- end of swagger-mvc -->

            <dependency>
                <groupId>com.fasterxml.jackson.core</groupId>
                <artifactId>jackson-annotations</artifactId>
                <version>2.7.5</version>
            </dependency>

            <dependency>
                <groupId>com.fasterxml.jackson.core</groupId>
                <artifactId>jackson-databind</artifactId>
                <version>2.7.5</version>
            </dependency>

            <dependency>
                <groupId>com.fasterxml.jackson.core</groupId>
                <artifactId>jackson-core</artifactId>
                <version>2.7.5</version>
            </dependency>

            <dependency>
                <groupId>com.fasterxml</groupId>
                <artifactId>classmate</artifactId>
                <version>1.1.0</version>
            </dependency>

            <dependency>
                <groupId>com.esotericsoftware.kryo</groupId>
                <artifactId>kryo</artifactId>
                <version>2.24.0</version>
            </dependency>

            <dependency>
                <groupId>de.javakaffee</groupId>
                <artifactId>kryo-serializers</artifactId>
                <version>0.26</version>
            </dependency>

            <dependency>
                <groupId>javax.persistence</groupId>
                <artifactId>persistence-api</artifactId>
                <version>1.0.2</version>
            </dependency>

            <dependency>
                <groupId>javax.validation</groupId>
                <artifactId>validation-api</artifactId>
                <version>2.0.1.Final</version>
            </dependency>

        </dependencies>
    </dependencyManagement>

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
                <artifactId>maven-source-plugin</artifactId>
                <executions>
                    <execution>
                        <phase>package</phase>
                        <goals>
                            <goal>jar-no-fork</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
            <plugin>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok-maven-plugin</artifactId>
                <version>1.16.8.0</version>
                <executions>
                    <execution>
                        <phase>generate-sources</phase>
                        <goals>
                            <goal>delombok</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
</project>