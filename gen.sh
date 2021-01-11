#!/bin/bash
echo ----------------------------------------------------------------------------
if [ "$1" == "-h" -o "$1" == "-help" ]; then
echo  "$1" 
echo "命令行使用:"
echo "gen.sh table [table_sql_name] [-e]
      开发命令 根据表的生成基本常用sql配置文件 e.g.,
      gen.sh table user -e"
echo "gen.sh dal [table_sql_name] [-e]
      开发命令 根据表的配置文件生成代码 e.g.,
      gen.sh dal user -e"
echo "--------------以上是 开发命令-----------"
echo "--------------以下是 脚手架命令-----------"
echo "gen.sh system [packageName] [systemName] [-e]
      脚手架命令 生成系统(工程组),即该工程组属于哪个系统,如支付系统，好友系统 e.g.,
      gen.sh system com.mycompany.biz trade -e"
echo "gen.sh project [projectName] [h5|flutter|web] [-e]
      脚手架命令 生成工程 [h5|flutter|web]指的是类型 e.g.,
      gen.sh project cms web -e"
echo "gen.sh api [table_sql_name] [-e]
      脚手架命令 在当前工程（7-*) 下生成一个带基本crud功能的spring controller e.g.,
      gen.sh api user -e"
echo "gen.sh client [h5|flutter|web] [-e]
      脚手架命令 在当前工程（7-*）下生成一个[h5|flutter|web]的前端 e.g.,
      gen.sh client flutter -e"
exit
fi

echo $currentCmd

cmdPath=$(pwd)
projectsPath=$cmdPath;

if [ "$1" == "api"  -o "$1" == "client" ]; then
  projectsPath=$(dirname $(pwd))
  project_name="${cmdPath##*/}"
fi

genConfigPath="$projectsPath/"
genConfigXml="${genConfigPath}gen_config.xml"

genConfigPath=$(cd `dirname $0`; pwd)
cd $genConfigPath



if [ "$1" == "project" ]; then
    if [ ! -n "$2" ]; then
       echo "项目名称不能为空 ! 如 $1 cms [web|app] -e ,cms 指的是项目，web|app可选，指的是该项目类型"
       exit
    fi
    mvnCmd="mvn compile groovy:execute -DgenConfigXml=$genConfigXml  -DexecuteTarget=$1 -DprojectName=$2"
    if [ -n "$3" ]; then
      mvnCmd="$mvnCmd -DwebType=$3"
    fi
    
    if [ "$4" == "-e" -o "$3" == "-e" ]; then
      mvnCmd="$mvnCmd -e"
    fi

elif [ "$1" == "api" ]; then
    echo $2
    if [ ! -n "$2" ]; then
       echo "项目名称不能为空 ! 如 $1 user cms -e cms指的是如 7-trade-web-cms"
       exit
    fi

    mvnCmd="mvn compile groovy:execute -DgenConfigXml=$genConfigXml  -DexecuteTarget=$1 -DtableName=$2"

    if [ "$3" == "-e" ]; then
      mvnCmd="$mvnCmd -e"
    fi

elif [ "$1" == "client" ]; then
    if [ ! -n "$2" ]; then
       echo "类型不能为空 ! 如 $1 flutter -e"
       exit
    fi
    mvnCmd="mvn compile groovy:execute -DgenConfigXml=$genConfigXml  -DexecuteTarget=$1 -DwebType=$2"
    if [ "$3" == "-e" ]; then
      mvnCmd="$mvnCmd -e"
    fi

elif [ "$1" == "boot" ]; then
    mvnCmd="mvn compile groovy:execute -DgenConfigXml=$genConfigXml  -DexecuteTarget=$1"
    if [ "$2" == "-e" ]; then
      mvnCmd="$mvnCmd -e"
    fi

elif [ "$1" == "system" ]; then
    if [ ! -n "$2" ]; then
      echo "包名(package)不能为空 如 $1 com.mycompany.biz trade -e"
      exit
    fi 
    
    if [ ! -n "$3" ]; then
      echo "系统名(systemName)不能为空 如 $1 com.mycompany.biz trade -e"
      exit
    fi 
    
    mvnCmd="mvn compile groovy:execute -DexecuteTarget=$1 -DpackageName=$2 -DsystemName=$3"
    if [ "$4" == "-e" ]; then
        mvnCmd="$mvnCmd -e"
    fi

elif [ "$1" == "table" -o "$1" == "dal" ]; then
    if [ ! -n "$2" ]; then
       echo 表名不能为空! 如 "$1" user -e
       exit
    fi
    mvnCmd="mvn compile groovy:execute -DgenConfigXml=$genConfigXml -DexecuteTarget=$1 -DtableName=$2"
    if [ "$3" == "-e" ]; then
        mvnCmd="$mvnCmd -e"
    fi

else 
   echo --------------命令不存在 ,请使用 gen.sh -h  查看 -----------------
   exit
fi

if [ "$1" != "system" ]; then
  if [ ! -f "$genConfigXml" ]; then
    echo "--------------没有找到文件,请在 genConfig的同一级目录执行!-----------------"
    exit
  fi
fi


mvnCmd="$mvnCmd -DcmdPath=$cmdPath  -DdalgenPath=$genConfigPath -DprojectsPath=$projectsPath"
echo "gen.sh $* >>>=================================================="
echo 执行命令 $mvnCmd
$mvnCmd

rc=$?
if [ $rc -gt 0 ]; then
  cd $cmdPath
  echo -e "\033[31m gen.sh $* <<<failed \033[0m"
  echo -e "\033[31m pls try gen.sh table $2 $3\033[0m"

  exit $rc
fi
cd $cmdPath