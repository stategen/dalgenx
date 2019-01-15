#!/bin/bash


echo ----------------------------------------------------------------------------
echo "命令行使用:"
echo "gen dal [table_sql_name] [-e] 根据数据库表的配置文件生成代码,(需要有xml配置文件)"
echo "gen table [table_sql_name] [-e] 根据数据库表的生成代码,可以生成dalgen的配置文件(不需要xml配置文件)"
echo "gen system [packageName] [systemName] [-e] 生成系统(工程组),即该工程组属于哪个系统,如支付系统，好友系统"
echo "gen project [projectName] [web|app] [-e] 生成工程 [web|app]指的是类型，web是网页形式，app是手机端"


cmdPath=$(pwd)

genConfigPath="$cmdPath/"

genConfigXml="${genConfigPath}gen_config.xml"

agr1=$1
agr2=$2
agr3=$3
agr4=$4


if [ "$agr1" != "system" ]; then
  if [ ! -f "$genConfigXml" ]; then
   echo --------------没有找到文件,请在 genConfig的同一级目录执行!-----------------
   exit
   fi
fi

genConfigPath=$(cd `dirname $0`; pwd)
cd $genConfigPath



if [ "$agr1" == "project" ]; then
    mvnCmd="mvn compile groovy:execute -DgeneratorConfigFile=$genConfigXml  -DexecuteTarget=$agr1 -DprojectName=$agr2 -Dtype=$agr3"
    if [ "$agr4" == "-e" ]; then
      mvnCmd="$mvnCmd $agr4"
    fi
elif [ "$agr1" == "system" ]; then
    mvnCmd="mvn compile groovy:execute -DexecuteTarget=$1 -DpackageName=$agr2 -DsystemName=$agr3"
    if [ "$agr4"=="-e" ]; then
        mvnCmd="$mvnCmd $agr4"
    fi
else
    mvnCmd="mvn compile groovy:execute -DgeneratorConfigFile=$genConfigXml -DexecuteTarget=$agr1 -DgenInputCmd=$agr2"
    if [ "$agr3" == "-e" ]; then
        mvnCmd="$mvnCmd $agr3"
    fi
fi

mvnCmd="$mvnCmd -DcmdPath=$cmdPath  -DdalgenPath=$genConfigPath"

$mvnCmd

cd $cmdPath