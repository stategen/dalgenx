#!/bin/bash
currentPath=$(cd `dirname $0`; pwd)
echo "current path is:" $currentPath
tablePath=${currentPath}"/tables"
echo "tables path is" $tablePath
files=$(ls $tablePath)
for filename in $files
do
if [ "${filename##*.}"x = "xml"x ];then
   tableName="${filename%.*}";
   echo "gen.sh dal $tableName -e "
   cd $currentPath
   gen.sh dal $tableName -e
fi
done

wait

echo 'press any key to exit;...'
read -n 1