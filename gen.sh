#!/bin/bash
echo ----------------------------------------------------------------------------
if [ "$1" == "-h" -o "$1" == "-help" ]; then
echo  "$1" 
echo "������ʹ��:"
echo "gen.sh table [table_sql_name] [-e]
      �������� ���ݱ�����ɻ�������sql�����ļ� e.g.,
      gen.sh table user -e"
echo "gen.sh dal [table_sql_name] [-e]
      �������� ���ݱ�������ļ����ɴ��� e.g.,
      gen.sh dal user -e"
echo "--------------������ ��������-----------"
echo "--------------������ ���ּ�����-----------"
echo "gen.sh system [packageName] [systemName] [-e]
      ���ּ����� ����ϵͳ(������),���ù����������ĸ�ϵͳ,��֧��ϵͳ������ϵͳ e.g.,
      gen.sh system com.mycompany.biz trade -e"
echo "gen.sh project [projectName] [h5|flutter|web] [-e]
      ���ּ����� ���ɹ��� [h5|flutter|web]ָ�������� e.g.,
      gen.sh project cms web -e"
echo "gen.sh api [table_sql_name] [-e]
      ���ּ����� �ڵ�ǰ���̣�7-*) ������һ��������crud���ܵ�spring controller e.g.,
      gen.sh api user -e"
echo "gen.sh client [h5|flutter|web] [-e]
      ���ּ����� �ڵ�ǰ���̣�7-*��������һ��[h5|flutter|web]��ǰ�� e.g.,
      gen.sh client flutter -e"
echo "gen.sh root [-e]
      ���ּ����� �ڵ�ǰ���̣�7-*������Ŀ��Ϊspring-boot��Ŀ e.g.,
      gen.sh root -e"
exit
fi


cmdPath=$(pwd)
projectsPath=$cmdPath;

if [ "$1" == "api"  -o "$1" == "client" -o "$1" == "root" ]; then
  projectsPath=$(dirname $(pwd))
  project_name="${cmdPath##*/}"
  if [[ $project_name != 7-* ]]; then
    echo "--------------api��Ҫ�� 7- �������� -----------------"
    exit
  fi
fi

genConfigPath="$projectsPath/"
genConfigXml="${genConfigPath}gen_config.xml"
echo $genConfigXml


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
      mvnCmd="$mvnCmd -DwebType=$3"
    fi
    
    if [ "$4" == "-e" -o "$3" == "-e" ]; then
      mvnCmd="$mvnCmd -e"
    fi

elif [ "$1" == "api" ]; then
    if [ ! -n "$2" ]; then
       echo "��Ŀ���Ʋ���Ϊ�� ! �� $1 user cms -e cmsָ������ 7-trade-web-cms"
       exit
    fi

    mvnCmd="mvn compile groovy:execute -DgeneratorConfigFile=$genConfigXml  -DexecuteTarget=$1 -DgenInputCmd=$2"

    if [ "$3" == "-e" ]; then
      mvnCmd="$mvnCmd -e"
    fi

elif [ "$1" == "client" ]; then
    if [ ! -n "$2" ]; then
       echo "���Ͳ���Ϊ�� ! �� $1 flutter -e"
       exit
    fi
    mvnCmd="mvn compile groovy:execute -DgeneratorConfigFile=$genConfigXml  -DexecuteTarget=$1 -DwebType=$2"
    if [ "$3" == "-e" ]; then
      mvnCmd="$mvnCmd -e"
    fi

elif [ "$1" == "root" ]; then
    mvnCmd="mvn compile groovy:execute -DgeneratorConfigFile=$genConfigXml  -DexecuteTarget=$1"
    if [ "$2" == "-e" ]; then
      mvnCmd="$mvnCmd -e"
    fi

elif [ "$1" == "system" ]; then
    if [ ! -n "$2" ]; then
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

mvnCmd="$mvnCmd -DcmdPath=$cmdPath  -DdalgenPath=$genConfigPath -DprojectsPath=$projectsPath"
echo ִ������ $mvnCmd
$mvnCmd

cd $cmdPath