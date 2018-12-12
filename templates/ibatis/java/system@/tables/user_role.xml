<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE table SYSTEM "http://sources.alipay.net/svn/dtd/table-config-1.0.dtd">
<table sqlName="user_role" className="UserRole">
   
    <!-- 不需要配置的列请删除-->
    <!-- <column name="currency_Unit" javaType="java.util.Currency"/> -->
    <!-- <column name="status" javaType="aa.bb.cc.StatusEnum"/> -->
    <!-- <column name="sex" javaType="aa.bb.cc.SexEnum"/> -->

    
    <operation name="insert" paramType="object" remarks="">
      <!-- 临时方案，请在 field或 value 两边加上空格,以方便dalgen解析 -->
        <sql>
            insert into user_role (
            create_time
            , update_time
            , delete_flag
            <isNotNull prepend="," property="id"> id </isNotNull>
            <isNotNull prepend="," property="userId"> user_id </isNotNull>
            <isNotNull prepend="," property="roleId"> role_id </isNotNull>
            <isNotNull prepend="," property="roleType"> role_type </isNotNull>
            ) VALUES (
            CURRENT_TIMESTAMP(6)
            , CURRENT_TIMESTAMP(6)
            , 0
            <isNotNull prepend="," property="id"> ?  </isNotNull>
            <isNotNull prepend="," property="userId"> ?  </isNotNull>
            <isNotNull prepend="," property="roleId"> ?  </isNotNull>
            <isNotNull prepend="," property="roleType"> ?  </isNotNull>
            )
            <selectKey resultClass="long" keyProperty="id">
                select  LAST_INSERT_ID()
            </selectKey>
        </sql>
    </operation>

    <operation name="delete" remarks="">
        <sql>
            UPDATE user_role SET
            delete_flag = 1
            , update_time = CURRENT_TIMESTAMP(6)
            where
            delete_flag = 0
            and id = ?
        </sql>
    </operation>

    <operation name="update" paramType="object" remarks="">
        <sql>
            UPDATE user_role
            SET update_time= CURRENT_TIMESTAMP(6)
            <dynamic>
                <isNotNull property="userId" prepend=",">
                    user_id =  ?
                </isNotNull>
                <isNotNull property="roleId" prepend=",">
                    role_id =  ?
                </isNotNull>
                <isNotNull property="roleType" prepend=",">
                    role_type =  ?
                </isNotNull>
            </dynamic>
            where
            delete_flag = 0
            and id = ?
        </sql>
    </operation>

    <operation name="getUserRoleById" multiplicity="one" remarks="">
        <sql>
            select
            a.id,
            a.user_id,
            a.role_id,
            a.role_type,
            a.create_time,
            a.update_time,
            a.delete_flag
            from user_role a
            where
            a.delete_flag = 0
            and a.id = ?
        </sql>
    </operation>

    <operation name="getUserRolePageListByDefaultQuery" paramType="object" multiplicity="paging" remarks="">
        <sql>
            select
            a.id,
            a.user_id,
            a.role_id,
            a.role_type,
            a.create_time,
            a.update_time,
            a.delete_flag
            from user_role a
            where
            a.delete_flag = 0
            <isNotEmpty property="ids" open="and">
                a.id in
                <iterate property="ids" conjunction="," open="(" close=")">
                    #ids[]#
                </iterate>
            </isNotEmpty>
            <isNotEmpty property="userIds" open="and">
                a.user_id in
                <iterate property="userIds" conjunction="," open="(" close=")">
                    #userIds[]#
                </iterate>
            </isNotEmpty>
            <isNotEmpty property="roleIds" open="and">
                a.role_id in
                <iterate property="roleIds" conjunction="," open="(" close=")">
                    #roleIds[]#
                </iterate>
            </isNotEmpty>
            <isNotEmpty property="roleTypes" open="and">
                a.role_type in
                <iterate property="roleTypes" conjunction="," open="(" close=")">
                    #roleTypes[]#
                </iterate>
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
            <isEmpty property="ids">
            <isEmpty property="userIds">
            <isEmpty property="roleIds">
            <isEmpty property="roleTypes">
            <isNull property="createTimeMin">
            <isNull property="createTimeMax">
            <isNull property="updateTimeMin">
            <isNull property="updateTimeMax">
              and 0 = 1
            </isNull>
            </isNull>
            </isNull>
            </isNull>
            </isEmpty>
            </isEmpty>
            </isEmpty>
            </isEmpty>
        </sql>
    </operation>

    <operation name="getUserRolesByIds" multiplicity="many" remarks="">
        <sql>
            select
            a.id,
            a.user_id,
            a.role_id,
            a.role_type,
            a.create_time,
            a.update_time,
            a.delete_flag
            from user_role a
            where
            a.delete_flag = 0
            and a.id in
            <iterate property="ids" conjunction="," open="(" close=")">
                #ids[]#
            </iterate>
        </sql>
    </operation>

    <operation name="deleteByIds" remarks="">
        <sql>
            UPDATE user_role SET
               delete_flag = 1
               , update_time = CURRENT_TIMESTAMP(6)
            where
            delete_flag = 0
            and id in
            <iterate property="ids" conjunction="," open="(" close=")">
                #ids[]#
            </iterate>
        </sql>
    </operation>

    <!-- 以上是生成代码，勿动 ,如果表变更，重新执行 gen.sh table user_role -e 再复制再粘贴覆盖-->


</table>
