#!/bin/bash
currentPath=$(cd `dirname $0`; pwd)
echo 'current project git init...'
git init
git add ./.gitignore
git -c diff.mnemonicprefix=false -c core.quotepath=false commit -q -m init

echo $currentPath
ls $currentPath
echo 'to system project root'
cd ../
git init
git add ./.gitignore

rootPath=$(cd `dirname $0`; pwd)
echo $rootPath
relativePath=`realpath --relative-to=$rootPath $currentPath`
echo $relativePath

git -c diff.mnemonicprefix=false -c core.quotepath=false submodule add -f ./$relativePath/.git $relativePath
git -c diff.mnemonicprefix=false -c core.quotepath=false submodule update --init $relativePath

git -c diff.mnemonicprefix=false -c core.quotepath=false commit -q -m init
cd $currentPath
echo 'press any key to exit...'
read -n 1