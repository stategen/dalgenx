<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE table SYSTEM "http://sources.alipay.net/svn/dtd/table-config-1.0.dtd">
<table sqlName="role_menu" className="RoleMenu">
   
    <!-- 不需要配置的列请删除-->
    <!-- <column name="currency_Unit" javaType="java.util.Currency"/> -->
    <!-- <column name="status" javaType="aa.bb.cc.StatusEnum"/> -->
    <!-- <column name="sex" javaType="aa.bb.cc.SexEnum"/> -->

    
    <operation name="insert" paramType="object" remarks="">
      <!-- 临时方案，请在 field或 value 两边加上空格,以方便dalgen解析 -->
        <sql>
            insert into role_menu (
            create_time
            , update_time
            , delete_flag
            <isNotNull prepend="," property="id"> id </isNotNull>
            <isNotNull prepend="," property="roleId"> role_id </isNotNull>
            <isNotNull prepend="," property="menuId"> menu_id </isNotNull>
            ) VALUES (
            CURRENT_TIMESTAMP(6)
            , CURRENT_TIMESTAMP(6)
            , 0
            <isNotNull prepend="," property="id"> ?  </isNotNull>
            <isNotNull prepend="," property="roleId"> ?  </isNotNull>
            <isNotNull prepend="," property="menuId"> ?  </isNotNull>
            )
            <selectKey resultClass="long" keyProperty="id">
                select  LAST_INSERT_ID()
            </selectKey>
        </sql>
    </operation>

    <operation name="deleteById" remarks="">
        <sql>
            UPDATE role_menu SET
            delete_flag = 1
            , update_time = CURRENT_TIMESTAMP(6)
            where
            delete_flag = 0
            and id = ?
        </sql>
    </operation>

    <operation name="update" paramType="object" remarks="">
        <sql>
            UPDATE role_menu
            SET update_time= CURRENT_TIMESTAMP(6)
            <dynamic>
                <isNotNull property="roleId" prepend=",">
                    role_id =  ?
                </isNotNull>
                <isNotNull property="menuId" prepend=",">
                    menu_id =  ?
                </isNotNull>
            </dynamic>
            where
            delete_flag = 0
            and id = ?
        </sql>
    </operation>

    <operation name="getRoleMenuById" multiplicity="one" remarks="">
        <sql>
            select
            a.id,
            a.role_id,
            a.menu_id,
            a.create_time,
            a.update_time,
            a.delete_flag
            from role_menu a
            where
            a.delete_flag = 0
            and a.id = ?
        </sql>
    </operation>

    <operation name="getRoleMenuPageListByDefaultQuery" paramType="object" multiplicity="paging" remarks="">
        <sql>
            select
            a.id,
            a.role_id,
            a.menu_id,
            a.create_time,
            a.update_time,
            a.delete_flag
            from role_menu a
            where
            a.delete_flag = 0
            <isNotEmpty property="ids" open="and">
                a.id in
                <iterate property="ids" conjunction="," open="(" close=")">
                    #ids[]#
                </iterate>
            </isNotEmpty>
            <isNotEmpty property="roleIds" open="and">
                a.role_id in
                <iterate property="roleIds" conjunction="," open="(" close=")">
                    #roleIds[]#
                </iterate>
            </isNotEmpty>
            <isNotEmpty property="menuIds" open="and">
                a.menu_id in
                <iterate property="menuIds" conjunction="," open="(" close=")">
                    #menuIds[]#
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
            <isEmpty property="roleIds">
            <isEmpty property="menuIds">
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
        </sql>
    </operation>

    <operation name="getRoleMenusByIds" multiplicity="many" remarks="">
        <sql>
            select
            a.id,
            a.role_id,
            a.menu_id,
            a.create_time,
            a.update_time,
            a.delete_flag
            from role_menu a
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
            UPDATE role_menu SET
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

    <!-- 以上是生成代码，勿动 ,如果表变更，重新执行 gen.sh table role_menu -e 再复制再粘贴覆盖-->


    <operation name="getRoleMenusByMenuIds" multiplicity="many" remarks="">
        <sql>
            select
            a.id,
            a.role_id,
            a.menu_id,
            a.create_time,
            a.update_time,
            a.delete_flag
            from role_menu a
            where
            <isNotEmpty property="menuIds">
                a.menu_id in
                <iterate property="menuIds" conjunction="," open="(" close=")">
                    #menuIds[]#
                </iterate>
            </isNotEmpty>
            and a.delete_flag = 0
        </sql>
    </operation>

  
</table>
