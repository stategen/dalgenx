<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE table SYSTEM "http://sources.alipay.net/svn/dtd/table-config-1.0.dtd">
<table sqlName="menu" className="Menu">
   
    <!-- 不需要配置的列请删除-->
    <!-- <column name="currency_Unit" javaType="java.util.Currency"/> -->
    <!-- <column name="status" javaType="aa.bb.cc.StatusEnum"/> -->
    <!-- <column name="sex" javaType="aa.bb.cc.SexEnum"/> -->
    <column name="visit_type" javaType="org.stategen.framework.lite.enums.VisitType" />
    <column name="check_type" javaType="org.stategen.framework.lite.enums.VisitCheckType" />

    <operation name="insert" paramType="object" remarks="">
      <!-- 临时方案，请在 field或 value 两边加上空格,以方便dalgen解析 -->
        <sql>
            insert into menu (
            create_time
            , update_time
            , delete_flag
            <isNotNull prepend="," property="menuId"> menu_id </isNotNull>
            <isNotNull prepend="," property="bpid"> bpid </isNotNull>
            <isNotNull prepend="," property="mpid"> mpid </isNotNull>
            <isNotNull prepend="," property="projectName"> project_name </isNotNull>
            <isNotNull prepend="," property="controllerName"> controller_name </isNotNull>
            <isNotNull prepend="," property="methodName"> method_name </isNotNull>
            <isNotNull prepend="," property="url"> url </isNotNull>
            <isNotNull prepend="," property="icon"> icon </isNotNull>
            <isNotNull prepend="," property="name"> name </isNotNull>
            <isNotNull prepend="," property="route"> route </isNotNull>
            <isNotNull prepend="," property="visitType"> visit_type </isNotNull>
            <isNotNull prepend="," property="checkType"> check_type </isNotNull>
            ) VALUES (
            CURRENT_TIMESTAMP(6)
            , CURRENT_TIMESTAMP(6)
            , 0
            <isNotNull prepend="," property="menuId"> ?  </isNotNull>
            <isNotNull prepend="," property="bpid"> ?  </isNotNull>
            <isNotNull prepend="," property="mpid"> ?  </isNotNull>
            <isNotNull prepend="," property="projectName"> ?  </isNotNull>
            <isNotNull prepend="," property="controllerName"> ?  </isNotNull>
            <isNotNull prepend="," property="methodName"> ?  </isNotNull>
            <isNotNull prepend="," property="url"> ?  </isNotNull>
            <isNotNull prepend="," property="icon"> ?  </isNotNull>
            <isNotNull prepend="," property="name"> ?  </isNotNull>
            <isNotNull prepend="," property="route"> ?  </isNotNull>
            <isNotNull prepend="," property="visitType"> ?  </isNotNull>
            <isNotNull prepend="," property="checkType"> ?  </isNotNull>
            )
            <selectKey resultClass="long" keyProperty="menuId">
                select  LAST_INSERT_ID()
            </selectKey>
        </sql>
    </operation>

    <operation name="delete" remarks="">
        <sql>
            UPDATE menu SET
            delete_flag = 1
            , update_time = CURRENT_TIMESTAMP(6)
            where
            delete_flag = 0
            and menu_id = ?
        </sql>
    </operation>

    <operation name="update" paramType="object" remarks="">
        <sql>
            UPDATE menu
            SET update_time= CURRENT_TIMESTAMP(6)
            <dynamic>
                <isNotNull property="bpid" prepend=",">
                    bpid =  ?
                </isNotNull>
                <isNotNull property="mpid" prepend=",">
                    mpid =  ?
                </isNotNull>
                <isNotNull property="projectName" prepend=",">
                    project_name =  ?
                </isNotNull>
                <isNotNull property="controllerName" prepend=",">
                    controller_name =  ?
                </isNotNull>
                <isNotNull property="methodName" prepend=",">
                    method_name =  ?
                </isNotNull>
                <isNotNull property="url" prepend=",">
                    url =  ?
                </isNotNull>
                <isNotNull property="icon" prepend=",">
                    icon =  ?
                </isNotNull>
                <isNotNull property="name" prepend=",">
                    name =  ?
                </isNotNull>
                <isNotNull property="route" prepend=",">
                    route =  ?
                </isNotNull>
                <isNotNull property="visitType" prepend=",">
                    visit_type =  ?
                </isNotNull>
                <isNotNull property="checkType" prepend=",">
                    check_type =  ?
                </isNotNull>
            </dynamic>
            where
            delete_flag = 0
            and menu_id = ?
        </sql>
    </operation>

    <operation name="getMenuByMenuId" multiplicity="one" remarks="">
        <sql>
            select
            a.menu_id,
            a.bpid,
            a.mpid,
            a.project_name,
            a.controller_name,
            a.method_name,
            a.url,
            a.icon,
            a.name,
            a.route,
            a.visit_type,
            a.check_type,
            a.create_time,
            a.update_time,
            a.delete_flag
            from menu a
            where
            a.delete_flag = 0
            and a.menu_id = ?
        </sql>
    </operation>

    <operation name="getMenuPageListByDefaultQuery" paramType="object" multiplicity="paging" remarks="">
        <sql>
            select
            a.menu_id,
            a.bpid,
            a.mpid,
            a.project_name,
            a.controller_name,
            a.method_name,
            a.url,
            a.icon,
            a.name,
            a.route,
            a.visit_type,
            a.check_type,
            a.create_time,
            a.update_time,
            a.delete_flag
            from menu a
            where
            a.delete_flag = 0
            <isNotEmpty property="menuIds" open="and">
                a.menu_id in
                <iterate property="menuIds" conjunction="," open="(" close=")">
                    #menuIds[]#
                </iterate>
            </isNotEmpty>
            <isNotEmpty property="bpids" open="and">
                a.bpid in
                <iterate property="bpids" conjunction="," open="(" close=")">
                    #bpids[]#
                </iterate>
            </isNotEmpty>
            <isNotEmpty property="mpids" open="and">
                a.mpid in
                <iterate property="mpids" conjunction="," open="(" close=")">
                    #mpids[]#
                </iterate>
            </isNotEmpty>
            <isNotEmpty property="projectNameLike" open="and">
                a.project_name like CONCAT('%',#projectNameLike#,'%')
            </isNotEmpty>
            <isNotEmpty property="controllerNameLike" open="and">
                a.controller_name like CONCAT('%',#controllerNameLike#,'%')
            </isNotEmpty>
            <isNotEmpty property="methodNameLike" open="and">
                a.method_name like CONCAT('%',#methodNameLike#,'%')
            </isNotEmpty>
            <isNotEmpty property="urlLike" open="and">
                a.url like CONCAT('%',#urlLike#,'%')
            </isNotEmpty>
            <isNotEmpty property="nameLike" open="and">
                a.name like CONCAT('%',#nameLike#,'%')
            </isNotEmpty>
            <isNotEmpty property="routeLike" open="and">
                a.route like CONCAT('%',#routeLike#,'%')
            </isNotEmpty>
            <isNotEmpty property="visitTypes" open="and">
                a.visit_type in
                <iterate property="visitTypes" conjunction="," open="(" close=")">
                    #visitTypes[]#
                </iterate>
            </isNotEmpty>
            <isNotEmpty property="checkTypes" open="and">
                a.check_type in
                <iterate property="checkTypes" conjunction="," open="(" close=")">
                    #checkTypes[]#
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
            <isEmpty property="menuIds">
            <isEmpty property="bpids">
            <isEmpty property="mpids">
            <isEmpty property="projectNameLike">
            <isEmpty property="controllerNameLike">
            <isEmpty property="methodNameLike">
            <isEmpty property="urlLike">
            <isEmpty property="nameLike">
            <isEmpty property="routeLike">
            <isEmpty property="visitTypes">
            <isEmpty property="checkTypes">
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
            </isEmpty>
            </isEmpty>
            </isEmpty>
            </isEmpty>
            </isEmpty>
            </isEmpty>
            </isEmpty>
        </sql>
    </operation>

    <operation name="getMenusByMenuIds" multiplicity="many" remarks="">
        <sql>
            select
            a.menu_id,
            a.bpid,
            a.mpid,
            a.project_name,
            a.controller_name,
            a.method_name,
            a.url,
            a.icon,
            a.name,
            a.route,
            a.visit_type,
            a.check_type,
            a.create_time,
            a.update_time,
            a.delete_flag
            from menu a
            where
            a.delete_flag = 0
            and a.menu_id in
            <iterate property="menuIds" conjunction="," open="(" close=")">
                #menuIds[]#
            </iterate>
        </sql>
    </operation>

    <operation name="deleteByMenuIds" remarks="">
        <sql>
            UPDATE menu SET
               delete_flag = 1
               , update_time = CURRENT_TIMESTAMP(6)
            where
            delete_flag = 0
            and menu_id in
            <iterate property="menuIds" conjunction="," open="(" close=")">
                #menuIds[]#
            </iterate>
        </sql>
    </operation>

    <!-- 以上是生成代码，勿动 ,如果表变更，重新执行 gen.sh table menu -e 再复制再粘贴覆盖-->
    
    <operation name="getMenusByVisitType" multiplicity="many" remarks="">
        <sql>
            select
            a.menu_id,
            a.mpid,
            a.bpid,
            a.project_name,
            a.controller_name,
            a.method_name,
            a.url,
            a.icon,
            a.name,
            a.route,
            a.visit_type,
            a.check_type,
            a.create_time,
            a.update_time,
            a.delete_flag
            from menu a
            where
            a.visit_type=?
            and a.project_name=?
            and a.delete_flag = 0
        </sql>
    </operation>

    <operation name="getMenusByProjectName" multiplicity="many" remarks="">
        <sql>
            select
            a.menu_id,
            a.mpid,
            a.bpid,
            a.project_name,
            a.controller_name,
            a.method_name,
            a.url,
            a.icon,
            a.name,
            a.route,
            a.visit_type,
            a.check_type,
            a.create_time,
            a.update_time,
            a.delete_flag
            from menu a
            where
            a.project_name=?
        </sql>
    </operation>

    <operation name="getMenusByUserId" multiplicity="many" remarks="">
        <sql>
            select
            a.menu_id
            from menu a
            left join role_menu rm on rm.menu_id=a.menu_id
            left JOIN role r on r.role_id=rm.role_id
            left JOIN user_role
            ur on ur.role_id =r.role_id
            where
            a.delete_flag = 0
            and rm.delete_flag=0
            and r.delete_flag=0
            and ur.delete_flag=0
            and ur.user_id=?
            <isNotEmpty property="visitType">
                and a.visit_type=#visitType#
            </isNotEmpty>
        </sql>
    </operation>

    <operation name="forceUpdateById" paramType="object" remarks="">
        <sql>
            UPDATE menu
            SET update_time= CURRENT_TIMESTAMP(6)
            ,mpid = ?
            ,bpid = ?
            ,project_name = ?
            ,controller_name = ?
            ,method_name = ?
            ,url = ?
            ,icon = ?
            ,name = ?
            ,route = ?
            ,visit_type = ?
            ,check_type = ?
            ,delete_flag = ?
            where
            menu_id = ?
        </sql>
    </operation>

</table>
