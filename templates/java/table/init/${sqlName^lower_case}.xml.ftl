<#--
    Copyright (C) 2018  niaoge<78493244@qq.com>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
-->
<#include './table.include.ftl'>
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE
    table SYSTEM "https://github.com/stategen/dalgenx/blob/master/gen.schemas-1.0.dtd"
    [<!ENTITY ${table.className?upper_case} SYSTEM "${table.sqlName?lower_case}.xml.xhtml">
]>
<table sqlName="${table.sqlName}" className="<#if add_illegal_prefix=='true'>?</#if>${table.className}" remarks="${table.remarks!?j_string}">
   <#if add_illegal_prefix=='true'>
↑请检查上面className是否正确,将非法字符"?"去掉,并删除本行(或者在gen_config.xml中设置add_illegal_prefix=false,不生成检查)↑
   </#if>
   <#assign pk=table.pkColumn>
   <!-- table描述中有'-tree'或者 -level(tableName)将生成相应的辅助sql-->
   <#assign levelName=StringUtil.findByRex(table.remarks!,'(?<=(-level)\\()[^\\)]+')>
   <#if StringUtil.isNotEmpty(levelName)>
      ${levelName}
       <#-- table命令中的tableConfigSet延时被动解析,调用时生效 -->
      <#assign levelTable=tableConfigSet.getBySqlName(levelName)>
      <#assign lpk=levelTable.pkColumn>
   <!-- 辅助cut到 mysql中执行
        /* 生成水平权限表 */
        DROP TABLE IF EXISTS ${table.sqlName}_level_h;
        CREATE TABLE ${table.sqlName}_level_h (
            ${pk.sqlName} ${pk.JDBCType}(${pk.size}) NOT NULL,
            ${lpk.sqlName} ${lpk.JDBCType}(${lpk.size}) NOT NULL COMMENT '水平权限   该id必须是树的主键',
            update_time TIMESTAMP (6) NULL DEFAULT NULL COMMENT '更新时间',
            create_time TIMESTAMP (6) NULL DEFAULT NULL COMMENT '创建时间',
            delete_flag TINYINT (1) DEFAULT '0' COMMENT '是否删除 (0:正常，1删除)',
            PRIMARY KEY (${pk.sqlName}),
            KEY ${lpk.sqlName} (${lpk.sqlName}) USING BTREE
        ) ENGINE = MyISAM DEFAULT CHARSET = utf8mb4 COMMENT = '数据水平权限，只有直系上级有权限';
   -->
   </#if>
   <#if StringUtil.containsIgnoreCase(table.remarks!,'-tree')>
   <!-- cut到 mysql中执行
       /* 创建树型表对应的平面表 */
       DROP TABLE IF EXISTS ${table.sqlName}_flat_h;
       CREATE TABLE ${table.sqlName}_flat_h (
         id bigint(20) NOT NULL,
         ${pk.sqlName} ${pk.JDBCType}(${pk.size}) NOT NULL,
         parent_id ${pk.JDBCType}(${pk.size}) NOT NULL,
         update_time timestamp(6) NULL DEFAULT NULL  COMMENT '更新时间',
         create_time timestamp(6) NULL DEFAULT NULL COMMENT '创建时间',
         delete_flag tinyint(1) DEFAULT '0' COMMENT '是否删除 (0:正常，1删除)',
         PRIMARY KEY (id),
         KEY ${pk.sqlName} (${pk.sqlName}) USING BTREE,
         KEY parent_id (parent_id) USING BTREE
       ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COMMENT='树型结构转换成平面数据，便于查询';

       /* 创建用于跟据树型表对应的数据生成平面表数据的存储过程 */
       DROP PROCEDURE if EXISTS ${table.sqlName}_flat_pr;
       CREATE PROCEDURE ${table.sqlName}_flat_pr()
       BEGIN
         declare flatId BIGINT(20) default 0;
         declare nodeId ${pk.JDBCType}(${pk.size}) default -1;
         declare parentId ${pk.JDBCType}(${pk.size}) default -1;
         declare done BOOLEAN DEFAULT 0;

         declare cur1 CURSOR FOR select ${pk.sqlName} ,parent_id from ${table.sqlName} ;
         declare CONTINUE HANDLER FOR SQLSTATE '02000' SET done = 1;
         set @current =CURRENT_TIMESTAMP();

         OPEN cur1;
         FETCH cur1 INTO nodeId, parentId;

         DELETE from ${table.sqlName}_flat_h;
         WHILE ( done =0 ) DO
           WHILE (parentId is not null) do
             set flatId=flatId+1;
             insert into ${table.sqlName}_flat_h(id,${pk.sqlName},parent_id,update_time,create_time,delete_flag) values(flatId,nodeId,parentId,@current,@current,0);
             set parentId =(select parent_id from ${table.sqlName} where ${pk.sqlName}=parentId);
           END WHILE;
           FETCH cur1 INTO nodeId, parentId;
         END WHILE;
       /* call ${table.sqlName}_flat_pr(); */

         CLOSE cur1;
       END;

       /* 创建插入触发器 */
       DROP TRIGGER if EXISTS ${table.sqlName}_flat_insert_tr;
       CREATE TRIGGER ${table.sqlName}_flat_insert_tr AFTER INSERT on ${table.sqlName} for EACH ROW
       BEGIN
         CALL ${table.sqlName}_flat_pr();
       end;

       /* 创建更新触发器 */
       DROP TRIGGER if EXISTS ${table.sqlName}_flat_update_tr;
       CREATE TRIGGER ${table.sqlName}_flat_update_tr AFTER UPDATE on ${table.sqlName} for EACH ROW
       BEGIN
         CALL ${table.sqlName}_flat_pr();
       end;

       /* 创建删除触发器 */
       DROP TRIGGER if EXISTS ${table.sqlName}_flat_delete_tr;
       CREATE TRIGGER ${table.sqlName}_flat_delete_tr AFTER DELETE on ${table.sqlName} for EACH ROW
       BEGIN
         CALL ${table.sqlName}_flat_pr();
       end;
   -->    
   </#if>
    <!-- 特殊类型字段，如枚举 -->
    <!-- <column name="status" javaType="${packageName}.enums.StatusEnum"/> -->

    <#function getCommonOrderByFields>
        <#assign text="">
        <#if upt_dt_clmn!="">
            <#assign text><#compress>${StringUtil.concat(', ',text,'a.${upt_dt_clmn} desc')}</#compress></#assign>
        </#if>
        <#if crt_dt_clmn!="">
            <#assign text><#compress>${StringUtil.concat(', ',text,'a.${crt_dt_clmn} desc')}</#compress></#assign>
        </#if>
        <#if text=="">
            <#assign text>a.${pk.sqlName}</#assign>
        </#if>
        <#return text>
    </#function>
    <#assign commonOrderByFields=getCommonOrderByFields()>
    <#list table.columns as column>
        <#if column.isDateButLong>
    <column name="${column.sqlName}" javaType="java.util.Date" />
        </#if>
    </#list>
    <sql id="get${table.className}PageListOrderBy">
        ${commonOrderByFields}
    </sql>
    <#list table.columns as column>
        <#if column.unique || column.pk || StringUtil.containsIgnoreCase(column.columnAlias!,"fk") || StringUtil.containsIgnoreCase(column.columnAlias!,"-select")>
    <sql id="get${table.className}sBy${column.columnName?cap_first}sOrderBy">
        ${commonOrderByFields}
    </sql>
        </#if>
    </#list>

    <!-- 引用 ${table.sqlName?lower_case}.xml.xhtml ,表修改后，需重新执行 gen.sh table ${table.sqlName} -e -->
    &${table.className?upper_case};
    <!-- 引用 ${table.sqlName?lower_case}.xml.xhtml 结束 -->

    <!-- 自定义方法请写在下面 需要自动提示，请将dalgenX目录下的 gen.schemas-1.0.dtd 配到 eclipse 或 idea中
      file:gen.schemas-1.0.dtd
      System Id
      https://github.com/stategen/dalgenx/blob/master/gen.schemas-1.0.dtd
    -->
    <!--
    <operation name="..." remarks="">
        <sql>
            ...
        </sql>
    </operation>
    -->

</table>
