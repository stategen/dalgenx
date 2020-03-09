
                    <!-- 生成dart文件模型和${projectName?uncap_first} -->
                    <execution>
                        <id>>>>>>>>>>>>>>>>>${systemName}${projectName?cap_first} auto generate ${webType} frondend files 生成 ${webType} 前端代码 &lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</id>
                        <phase>test</phase>
                        <goals>
                            <goal>java</goal>
                        </goals>
                        <configuration>
                            <mainClass>${webType?cap_first}FacadeProcessor</mainClass>
                            <classpathScope>test</classpathScope>
                            <cleanupDaemonThreads>false</cleanupDaemonThreads>
                        </configuration>
                    </execution>


