#!/bin/bash
echo ----------------------------------------------------------------------------
if [ "$1" != "-h" -o "$1" != "-help" ]; then
echo "������ʹ��:"
echo "gen table [table_sql_name] [-e] �������ݿ������ɴ���,��������dalgen�������ļ�(����Ҫxml�����ļ�)"
echo "gen dal [table_sql_name] [-e] �������ݿ��������ļ����ɴ���,(��Ҫ��xml�����ļ�)"
echo "gen system [packageName] [systemName] [-e] ����ϵͳ(������),���ù����������ĸ�ϵͳ,��֧��ϵͳ������ϵͳ"
echo "gen project [projectName] [web|app] [-e] ���ɹ��� [web|app]ָ�������ͣ�web����ҳ��ʽ��app���ֻ���"
echo "gen api [table_sql_name] [web|app] [-e] �ڵ�ǰ���̣�7��������һ��controller"
fi


cmdPath=$(pwd)

genConfigPath="$cmdPath/"

genConfigXml="${genConfigPath}gen_config.xml"




if [ "$1" != "system" ]; then
  if [ ! -f "$genConfigXml" ]; then
    echo "--------------û���ҵ��ļ�,���� genConfig��ͬһ��Ŀ¼ִ��!-----------------"
    exit
  fi
fi

genConfigPath=$(cd `dirname $0`; pwd)
cd $genConfigPath



if [ "$1" == "project" ]; then
    if [ ! -n "$2" ]; then
       echo "��Ŀ���Ʋ���Ϊ�� ! �� $1 cms [web|app] -e ,cms ָ������Ŀ��web|app��ѡ��ָ���Ǹ���Ŀ����"
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
       echo "��Ŀ���Ʋ���Ϊ�� ! �� $1 user cms -e cmsָ������ 7-trade-web-cms"
       exit
    fi
    
    if [ ! -n "$3" ]; then
       echo "��Ŀ���Ʋ���Ϊ��! �� $1 user cms -e cmsָ������ 7-trade-web-cms"
       exit
    fi

    mvnCmd="mvn compile groovy:execute -DgeneratorConfigFile=$genConfigXml  -DexecuteTarget=$1 -DgenInputCmd=$2 -DprojectName=$3"
    
    if [ "$4" == "-e" ]; then
      mvnCmd="$mvnCmd -e"
    fi
     
elif [ "$1" == "system" ]; then
    if [! -n "$2"]; then
      echo "����(package)����Ϊ�� �� $1 com.mycompany.biz trade -e"
      exit
    fi 
    
    if [ ! -n "$3" ]; then
      echo "ϵͳ��(systemName)����Ϊ�� �� $1 com.mycompany.biz trade -e"
      exit
    fi 
    
    mvnCmd="mvn compile groovy:execute -DexecuteTarget=$1 -DpackageName=$2 -DsystemName=$3"
    if [ "$4"=="-e" ]; then
        mvnCmd="$mvnCmd -e"
    fi
elif [ "$1" == "table" -o "$1" == "dal" ]; then
    if [ ! -n "$2" ]; then
       echo ��������Ϊ��! �� "$1" user -e
       exit
    fi
    mvnCmd="mvn compile groovy:execute -DgeneratorConfigFile=$genConfigXml -DexecuteTarget=$1 -DgenInputCmd=$2"
    if [ "$3" == "-e" ]; then
        mvnCmd="$mvnCmd -e"
    fi
else 
   echo --------------��������� system project table dal controller -----------------
   exit
fi

mvnCmd="$mvnCmd -DcmdPath=$cmdPath  -DdalgenPath=$genConfigPath"
echo ִ������ $mvnCmd
$mvnCmd

cd $cmdPath