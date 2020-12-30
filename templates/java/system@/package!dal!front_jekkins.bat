echo "不执行一次dal, 不编译前端"
call mvn clean package -P!front -P!dal -e
pause