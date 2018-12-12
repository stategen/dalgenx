<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>${packageName}</groupId>
        <artifactId>${systemName}-parent</artifactId>
        <version>1.0.0</version>
        <relativePath>../</relativePath>
    </parent>

    <artifactId>${systemName}-facade</artifactId>
    <version>${'$'}{${systemName}-facade-version}</version>
    <packaging>jar</packaging>
    <name>2-${systemName}-facade</name>
    <description />

    <dependencies>
        <dependency>
            <groupId>${packageName}</groupId>
            <artifactId>${systemName}-pojo</artifactId>
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

        </plugins>
    </build>
</project>