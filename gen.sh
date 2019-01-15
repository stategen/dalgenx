#!/bin/bash


echo ----------------------------------------------------------------------------
echo "������ʹ��:"
echo "gen dal [table_sql_name] [-e] �������ݿ��������ļ����ɴ���,(��Ҫ��xml�����ļ�)"
echo "gen table [table_sql_name] [-e] �������ݿ������ɴ���,��������dalgen�������ļ�(����Ҫxml�����ļ�)"
echo "gen system [packageName] [systemName] [-e] ����ϵͳ(������),���ù����������ĸ�ϵͳ,��֧��ϵͳ������ϵͳ"
echo "gen project [projectName] [web|app] [-e] ���ɹ��� [web|app]ָ�������ͣ�web����ҳ��ʽ��app���ֻ���"


cmdPath=$(pwd)

genConfigPath="$cmdPath/"

genConfigXml="${genConfigPath}gen_config.xml"

agr1=$1
agr2=$2
agr3=$3
agr4=$4


if [ "$agr1" != "system" ]; then
  if [ ! -f "$genConfigXml" ]; then
   echo --------------û���ҵ��ļ�,���� genConfig��ͬһ��Ŀ¼ִ��!-----------------
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