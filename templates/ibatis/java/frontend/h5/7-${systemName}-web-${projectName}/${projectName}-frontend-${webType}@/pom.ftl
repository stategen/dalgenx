
                    <!-- 生成ts文件模型和${projectName?uncap_first} -->
                    <execution>
                        <id>>>>>>>>>>>>>>>>>auto generate ${webType} frondend files 生成 ${webType} 前端代码 &lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</id>
                        <phase>test</phase>
                        <goals>
                            <goal>java</goal>
                        </goals>
                        <configuration>
                            <mainClass>${packageName}.facadegen.${webType?cap_first}FacadeProcessor</mainClass>
                            <classpathScope>test</classpathScope>
                        </configuration>
                    </execution>

                    <!-- 安装前端代码需要的插件 -->
                    <execution>
                        <id>>>>>>>>>>>>>>>>>yarn 下载 ${webType} 前端 ${webType} 依赖 &lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</id>
                        <phase>test</phase>
                        <goals>
                            <goal>exec</goal>
                        </goals>
                        <configuration>
                            <workingDirectory>./${projectName?uncap_first}-frontend-${webType}/</workingDirectory>
                            <executable>yarn</executable>
                            <arguments>
                                <!-- <argument>install</argument> -->
                            </arguments>
                        </configuration>

                    </execution>

                    <!-- 编译前端代码 -->
                    <execution>
                        <id>>>>>>>>>>>>>>>>>yarn run build  ${webType}  编译 ${webType} 前端代码 &lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</id>
                        <phase>test</phase>
                        <goals>
                            <goal>exec</goal>
                        </goals>

                        <configuration>
                            <workingDirectory>./${projectName?uncap_first}-frontend-${webType}/</workingDirectory>
                            <executable>yarn</executable>
                            <arguments>
                                <argument>run</argument>
                                <argument>build</argument>
                            </arguments>
                        </configuration>
                    </execution>
