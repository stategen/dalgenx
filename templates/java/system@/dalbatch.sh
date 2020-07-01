#!/bin/bash
currentPath=$(
  cd $(dirname $0)
  pwd
)
echo "current path is:" $currentPath
tablePath=${r'${'}currentPath}"/tables"
echo "tables path is" $tablePath
files=$(ls $tablePath)
length=$(ls -l $tablePath | grep "^-" | wc -l)
length=$(expr $length / 2)
count=0
for filename in $files; do
  if [ "${r'${'}filename##*.}"x = "xml"x ]; then
    tableName="${r'${'}filename%.*}"
    count=$(expr 1 + $count)
    echo "gen.sh dal $tableName -e $count/$length"
    cd $currentPath
    currentCmd="gen.sh dal $tableName -e"
    $currentCmd
    rc=$?
    if [ $rc -gt 0 ]; then
      echo -e "\033[31m dalbatch.sh $* <<<failed \033[0m"
      exit $rc
    fi
  fi
done

wait

echo "$count done, press any key to exit;..."
read -n 1
