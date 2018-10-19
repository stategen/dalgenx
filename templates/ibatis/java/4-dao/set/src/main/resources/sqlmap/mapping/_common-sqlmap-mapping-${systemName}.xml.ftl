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
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE sqlMap PUBLIC "-//ibatis.apache.org//DTD SQL Map 2.0//EN" 
    "http://ibatis.apache.org/dtd/sql-map-2.dtd">

<!-- ============================================================ -->
<!-- Configuration for ibatis sqlmap mapping.==================== -->
<!-- 本文件由dalgen生成，任何在本文件上的手工修改将会在下次生成时被覆盖 -->
<!-- ============================================================ -->

<sqlMap namespace="${dao_module_name}">

    <!-- result map for Money class -->
    <!--
        <resultMap id="RM.${dao_module_name}.Money" class="com.iwallet.biz.common.util.money.Money">
        <result property="cent" columnIndex="1" jdbcType="NUMBER" nullValue="0"/>
        </resultMap>
    -->

    <!-- result map for Money class -->
    <!--
        <resultMap id="paygw.RM-MONEY" class="com.iwallet.biz.common.util.money.Money">
        <result property="cent" columnIndex="1" jdbcType="NUMBER" nullValue="0"/>
        </resultMap>
    -->

    <!-- ============================================= -->
    <!-- mapped statements for SEQUENCE ============== -->
    <!-- ============================================= -->
<#list tableConfigSet.sequences as seq>

    <select id="SEQ.${seq}" resultClass="long">
    <![CDATA[
        select ${seq}.nextval from dual
    ]]>
    </select>
</#list>

<#list sequencesList?word_list as seq>

    <select id="SEQ.${seq}" resultClass="long">
    <![CDATA[
        select ${seq}.nextval from dual
    ]]>
    </select>
</#list>
</sqlMap>