#!/bin/bash
echo ----------------------------------------------------------------------------
if [ "$1" != "-h" -o "$1" != "-help" ]; then
echo "命令行使用:"
echo "gen table [table_sql_name] [-e] 根据数据库表的生成代码,可以生成dalgen的配置文件(不需要xml配置文件)"
echo "gen dal [table_sql_name] [-e] 根据数据库表的配置文件生成代码,(需要有xml配置文件)"
echo "gen system [packageName] [systemName] [-e] 生成系统(工程组),即该工程组属于哪个系统,如支付系统，好友系统"
echo "gen project [projectName] [web|app] [-e] 生成工程 [web|app]指的是类型，web是网页形式，app是手机端"
echo "gen api [table_sql_name] [web|app] [-e] 在当前工程（7）下生成一个controller"
fi


cmdPath=$(pwd)

genConfigPath="$cmdPath/"

genConfigXml="${genConfigPath}gen_config.xml"




if [ "$1" != "system" ]; then
  if [ ! -f "$genConfigXml" ]; then
    echo "--------------没有找到文件,请在 genConfig的同一级目录执行!-----------------"
    exit
  fi
fi

genConfigPath=$(cd `dirname $0`; pwd)
cd $genConfigPath



if [ "$1" == "project" ]; then
    if [ ! -n "$2" ]; then
       echo "项目名称不能为空 ! 如 $1 cms [web|app] -e ,cms 指的是项目，web|app可选，指的是该项目类型"
       exit
    fi
    mvnCmd="mvn compile groovy:execute -DgeneratorConfigFile=$genConfigXml  -DexecuteTarget=$1 -DprojectName=$2"
    if [ -n "$3" ]; then
      mvnCmd="$mvnCmd -Dtype=$3"
    fi
    
    if [ "$4" == "-e" -o "$3" == "-e" ]; then
      mvnCmd="$mvnCmd -e"
    fi
elif [ "$1" == "api" ]; then
    if [ ! -n "$2" ]; then
       echo "项目名称不能为空 ! 如 $1 user cms -e cms指的是如 7-trade-web-cms"
       exit
    fi
    
    if [ ! -n "$3" ]; then
       echo "项目名称不能为空! 如 $1 user cms -e cms指的是如 7-trade-web-cms"
       exit
    fi

    mvnCmd="mvn compile groovy:execute -DgeneratorConfigFile=$genConfigXml  -DexecuteTarget=$1 -DgenInputCmd=$2 -DprojectName=$3"
    
    if [ "$4" == "-e" ]; then
      mvnCmd="$mvnCmd -e"
    fi
     
elif [ "$1" == "system" ]; then
    if [! -n "$2"]; then
      echo "包名(package)不能为空 如 $1 com.mycompany.biz trade -e"
      exit
    fi 
    
    if [ ! -n "$3" ]; then
      echo "系统名(systemName)不能为空 如 $1 com.mycompany.biz trade -e"
      exit
    fi 
    
    mvnCmd="mvn compile groovy:execute -DexecuteTarget=$1 -DpackageName=$2 -DsystemName=$3"
    if [ "$4"=="-e" ]; then
        mvnCmd="$mvnCmd -e"
    fi
elif [ "$1" == "table" -o "$1" == "dal" ]; then
    if [ ! -n "$2" ]; then
       echo 表名不能为空! 如 "$1" user -e
       exit
    fi
    mvnCmd="mvn compile groovy:execute -DgeneratorConfigFile=$genConfigXml -DexecuteTarget=$1 -DgenInputCmd=$2"
    if [ "$3" == "-e" ]; then
        mvnCmd="$mvnCmd -e"
    fi
else 
   echo --------------命令必须是 system project table dal controller -----------------
   exit
fi

mvnCmd="$mvnCmd -DcmdPath=$cmdPath  -DdalgenPath=$genConfigPath"
echo 执行命令 $mvnCmd
$mvnCmd

cd $cmdPath