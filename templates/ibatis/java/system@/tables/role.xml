<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE table SYSTEM "http://sources.alipay.net/svn/dtd/table-config-1.0.dtd">
<table sqlName="role" className="Role">

    <!-- 不需要配置的列请删除 -->
    <!-- <column name="currency_Unit" javaType="java.util.Currency"/> -->
    <!-- <column name="status" javaType="aa.bb.cc.StatusEnum"/> -->
    <!-- <column name="sex" javaType="aa.bb.cc.SexEnum"/> -->
    <column name="role_type" javaType="${packageName}.enums.RoleType"/>

    <operation name="insert" paramType="object" remarks="">
      <!-- 临时方案，请在 field或 value 两边加上空格,以方便dalgen解析 -->
        <sql>
            insert into role (
            create_time
            , update_time
            , delete_flag
            <isNotNull prepend="," property="roleId"> role_id </isNotNull>
            <isNotNull prepend="," property="roleName"> role_name </isNotNull>
            <isNotNull prepend="," property="description"> description </isNotNull>
            <isNotNull prepend="," property="roleType"> role_type </isNotNull>
            ) VALUES (
            CURRENT_TIMESTAMP(6)
            , CURRENT_TIMESTAMP(6)
            , 0
            <isNotNull prepend="," property="roleId"> ?  </isNotNull>
            <isNotNull prepend="," property="roleName"> ?  </isNotNull>
            <isNotNull prepend="," property="description"> ?  </isNotNull>
            <isNotNull prepend="," property="roleType"> ?  </isNotNull>
            )
            <selectKey keyProperty="roleId" resultClass="String" type="pre">
                select if((#roleId#  is null) ,CONCAT(DATE_FORMAT(CURRENT_TIMESTAMP(6),'%Y%m%d%H%i%s%f'),LPAD(ROUND(RAND()*100000000),8,'0')) ,#roleId# ) as roleId
            </selectKey>
        </sql>
    </operation>

    <operation name="delete" remarks="">
        <sql>
            UPDATE role SET
            delete_flag = 1
            , update_time = CURRENT_TIMESTAMP(6)
            where
            delete_flag = 0
            and role_id = ?
        </sql>
    </operation>

    <operation name="update" paramType="object" remarks="">
        <sql>
            UPDATE role
            SET update_time= CURRENT_TIMESTAMP(6)
            <dynamic>
                <isNotNull property="roleName" prepend=",">
                    role_name =  ?
                </isNotNull>
                <isNotNull property="description" prepend=",">
                    description =  ?
                </isNotNull>
                <isNotNull property="roleType" prepend=",">
                    role_type =  ?
                </isNotNull>
            </dynamic>
            where
            delete_flag = 0
            and role_id = ?
        </sql>
    </operation>

    <operation name="getRoleByRoleId" multiplicity="one" remarks="">
        <sql>
            select
            a.role_id,
            a.role_name,
            a.description,
            a.create_time,
            a.update_time,
            a.delete_flag,
            a.role_type
            from role a
            where
            a.delete_flag = 0
            and a.role_id = ?
        </sql>
    </operation>

    <operation name="getRolePageListByDefaultQuery" paramType="object" multiplicity="paging" remarks="">
        <sql>
            select
            a.role_id,
            a.role_name,
            a.description,
            a.create_time,
            a.update_time,
            a.delete_flag,
            a.role_type
            from role a
            where
            a.delete_flag = 0
            <isNotEmpty property="roleIds" open="and">
                a.role_id in
                <iterate property="roleIds" conjunction="," open="(" close=")">
                    #roleIds[]#
                </iterate>
            </isNotEmpty>
            <isNotEmpty property="roleNameLike" open="and">
                a.role_name like CONCAT('%',#roleNameLike#,'%')
            </isNotEmpty>
            <isNotEmpty property="descriptionLike" open="and">
                a.description like CONCAT('%',#descriptionLike#,'%')
            </isNotEmpty>
            <isNotNull property="createTimeMin" open="and">
                a.create_time >=#createTimeMin#
            </isNotNull>
            <isNotNull property="createTimeMax" open="and">
                a.create_time &lt;#createTimeMax#
            </isNotNull>
            <isNotNull property="updateTimeMin" open="and">
                a.update_time >=#updateTimeMin#
            </isNotNull>
            <isNotNull property="updateTimeMax" open="and">
                a.update_time &lt;#updateTimeMax#
            </isNotNull>
            <isNotEmpty property="roleTypes" open="and">
                a.role_type in
                <iterate property="roleTypes" conjunction="," open="(" close=")">
                    #roleTypes[]#
                </iterate>
            </isNotEmpty>
            <isEmpty property="roleIds">
            <isEmpty property="roleNameLike">
            <isEmpty property="descriptionLike">
            <isNull property="createTimeMin">
            <isNull property="createTimeMax">
            <isNull property="updateTimeMin">
            <isNull property="updateTimeMax">
            <isEmpty property="roleTypes">
              and 0 = 1
            </isEmpty>
            </isNull>
            </isNull>
            </isNull>
            </isNull>
            </isEmpty>
            </isEmpty>
            </isEmpty>
        </sql>
    </operation>

    <operation name="getRolesByRoleIds" multiplicity="many" remarks="">
        <sql>
            select
            a.role_id,
            a.role_name,
            a.description,
            a.create_time,
            a.update_time,
            a.delete_flag,
            a.role_type
            from role a
            where
            a.delete_flag = 0
            and a.role_id in
            <iterate property="roleIds" conjunction="," open="(" close=")">
                #roleIds[]#
            </iterate>
        </sql>
    </operation>

    <operation name="deleteByRoleIds" remarks="">
        <sql>
            UPDATE role SET
               delete_flag = 1
               , update_time = CURRENT_TIMESTAMP(6)
            where
            delete_flag = 0
            and role_id in
            <iterate property="roleIds" conjunction="," open="(" close=")">
                #roleIds[]#
            </iterate>
        </sql>
    </operation>

    <!-- 以上是生成代码，勿动 ,如果表变更，重新执行 gen.sh table role -e 再复制再粘贴覆盖-->
</table>
