#!/bin/bash
currentPath=$(cd `dirname $0`; pwd)
echo "current path is:" $currentPath
tablePath=${'${'}currentPath}"/tables"
echo "tables path is" $tablePath
files=$(ls $tablePath)
length=$(ls -l $tablePath |grep "^-"|wc -l)
length=`expr  $length / 2`
count=0
for filename in $files
do
if [ "${'${'}filename##*.}"x = "xml"x ];then
   tableName="${'${'}filename%.*}";
   count=`expr 1 + $count`
   echo "gen.sh dal $tableName -e $count/$length"
   cd $currentPath
   gen.sh dal $tableName -e
fi
done

wait

echo "$count done, press any key to exit;..."
read -n 1