#!/bin/bash
currentPath=$(cd `dirname $0`; pwd)
echo 'current project git init...'
git init
git add ./.gitignore
git -c diff.mnemonicprefix=false -c core.quotepath=false commit -q -m init

echo 'press any key to exit;...'
read -n 1