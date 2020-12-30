echo 快速打包，不包括前端生成和编译
call mvn clean package -P!front -e
pause