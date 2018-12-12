<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE table SYSTEM "http://sources.alipay.net/svn/dtd/table-config-1.0.dtd">
<table sqlName="user" className="User">

    <!-- 不需要配置的列请删除 -->
    <!-- <column name="currency_Unit" javaType="java.util.Currency"/> -->
    <!-- <column name="status" javaType="aa.bb.cc.StatusEnum"/> -->
    <!-- <column name="sex" javaType="aa.bb.cc.SexEnum"/> -->
    <column name="role_type" javaType="${packageName}.enums.RoleType"/>
    
    <operation name="insert" paramType="object" remarks="">
      <!-- 临时方案，请在 field或 value 两边加上空格,以方便dalgen解析 -->
        <sql>
            insert into user (
            create_time
            , update_time
            , delete_flag
            <isNotNull prepend="," property="userId"> user_id </isNotNull>
            <isNotNull prepend="," property="username"> username </isNotNull>
            <isNotNull prepend="," property="password"> password </isNotNull>
            <isNotNull prepend="," property="roleType"> role_type </isNotNull>
            <isNotNull prepend="," property="name"> name </isNotNull>
            <isNotNull prepend="," property="nickName"> nickName </isNotNull>
            <isNotNull prepend="," property="age"> age </isNotNull>
            <isNotNull prepend="," property="address"> address </isNotNull>
            <isNotNull prepend="," property="isMale"> isMale </isNotNull>
            <isNotNull prepend="," property="avatar"> avatar </isNotNull>
            <isNotNull prepend="," property="email"> email </isNotNull>
            ) VALUES (
            CURRENT_TIMESTAMP(6)
            , CURRENT_TIMESTAMP(6)
            , 0
            <isNotNull prepend="," property="userId"> ?  </isNotNull>
            <isNotNull prepend="," property="username"> ?  </isNotNull>
            <isNotNull prepend="," property="password"> ?  </isNotNull>
            <isNotNull prepend="," property="roleType"> ?  </isNotNull>
            <isNotNull prepend="," property="name"> ?  </isNotNull>
            <isNotNull prepend="," property="nickName"> ?  </isNotNull>
            <isNotNull prepend="," property="age"> ?  </isNotNull>
            <isNotNull prepend="," property="address"> ?  </isNotNull>
            <isNotNull prepend="," property="isMale"> ?  </isNotNull>
            <isNotNull prepend="," property="avatar"> ?  </isNotNull>
            <isNotNull prepend="," property="email"> ?  </isNotNull>
            )
            <selectKey keyProperty="userId" resultClass="String" type="pre">
                select if((#userId#  is null) ,CONCAT(DATE_FORMAT(CURRENT_TIMESTAMP(6),'%Y%m%d%H%i%s%f'),LPAD(ROUND(RAND()*100000000),8,'0')) ,#userId# ) as userId
            </selectKey>
        </sql>
    </operation>

    <operation name="delete" remarks="">
        <sql>
            UPDATE user SET
            delete_flag = 1
            , update_time = CURRENT_TIMESTAMP(6)
            where
            delete_flag = 0
            and user_id = ?
        </sql>
    </operation>

    <operation name="deleteByEmail" remarks="">
        <sql>
            UPDATE user SET
            delete_flag = 1
            , update_time = CURRENT_TIMESTAMP(6)
            where
            delete_flag = 0
            and email = ?
        </sql>
    </operation>

    <operation name="update" paramType="object" remarks="">
        <sql>
            UPDATE user
            SET update_time= CURRENT_TIMESTAMP(6)
            <dynamic>
                <isNotNull property="username" prepend=",">
                    username =  ?
                </isNotNull>
                <isNotNull property="password" prepend=",">
                    password =  ?
                </isNotNull>
                <isNotNull property="roleType" prepend=",">
                    role_type =  ?
                </isNotNull>
                <isNotNull property="name" prepend=",">
                    name =  ?
                </isNotNull>
                <isNotNull property="nickName" prepend=",">
                    nickName =  ?
                </isNotNull>
                <isNotNull property="age" prepend=",">
                    age =  ?
                </isNotNull>
                <isNotNull property="address" prepend=",">
                    address =  ?
                </isNotNull>
                <isNotNull property="isMale" prepend=",">
                    isMale =  ?
                </isNotNull>
                <isNotNull property="avatar" prepend=",">
                    avatar =  ?
                </isNotNull>
                <isNotNull property="email" prepend=",">
                    email =  ?
                </isNotNull>
            </dynamic>
            where
            delete_flag = 0
            and user_id = ?
        </sql>
    </operation>

    <operation name="getUserByUserId" multiplicity="one" remarks="">
        <sql>
            select
            a.user_id,
            a.username,
            a.password,
            a.role_type,
            a.name,
            a.nickName,
            a.age,
            a.address,
            a.isMale,
            a.avatar,
            a.email,
            a.create_time,
            a.update_time,
            a.delete_flag
            from user a
            where
            a.delete_flag = 0
            and a.user_id = ?
        </sql>
    </operation>

    <operation name="getUserByEmail" multiplicity="one" remarks="">
        <sql>
            select
            a.user_id,
            a.username,
            a.password,
            a.role_type,
            a.name,
            a.nickName,
            a.age,
            a.address,
            a.isMale,
            a.avatar,
            a.email,
            a.create_time,
            a.update_time,
            a.delete_flag
            from user a
            where
            a.delete_flag = 0
            and a.email = ?
        </sql>
    </operation>

    <operation name="getUserPageListByDefaultQuery" paramType="object" multiplicity="paging" remarks="">
        <sql>
            select
            a.user_id,
            a.username,
            a.password,
            a.role_type,
            a.name,
            a.nickName,
            a.age,
            a.address,
            a.isMale,
            a.avatar,
            a.email,
            a.create_time,
            a.update_time,
            a.delete_flag
            from user a
            where
            a.delete_flag = 0
            <isNotEmpty property="userIds" open="and">
                a.user_id in
                <iterate property="userIds" conjunction="," open="(" close=")">
                    #userIds[]#
                </iterate>
            </isNotEmpty>
            <isNotEmpty property="usernameLike" open="and">
                a.username like CONCAT('%',#usernameLike#,'%')
            </isNotEmpty>
            <isNotEmpty property="passwordLike" open="and">
                a.password like CONCAT('%',#passwordLike#,'%')
            </isNotEmpty>
            <isNotEmpty property="roleTypes" open="and">
                a.role_type in
                <iterate property="roleTypes" conjunction="," open="(" close=")">
                    #roleTypes[]#
                </iterate>
            </isNotEmpty>
            <isNotEmpty property="nameLike" open="and">
                a.name like CONCAT('%',#nameLike#,'%')
            </isNotEmpty>
            <isNotEmpty property="nickNameLike" open="and">
                a.nickName like CONCAT('%',#nickNameLike#,'%')
            </isNotEmpty>
            <isNotNull property="ageMin" open="and">
                a.age >=#ageMin#
            </isNotNull>
            <isNotNull property="ageMax" open="and">
                a.age &lt;#ageMax#
            </isNotNull>
            <isNotEmpty property="addressLike" open="and">
                a.address like CONCAT('%',#addressLike#,'%')
            </isNotEmpty>
            <isNotEmpty property="avatarLike" open="and">
                a.avatar like CONCAT('%',#avatarLike#,'%')
            </isNotEmpty>
            <isNotEmpty property="emailLike" open="and">
                a.email like CONCAT('%',#emailLike#,'%')
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
            <isEmpty property="userIds">
            <isEmpty property="usernameLike">
            <isEmpty property="passwordLike">
            <isEmpty property="roleTypes">
            <isEmpty property="nameLike">
            <isEmpty property="nickNameLike">
            <isNull property="ageMin">
            <isNull property="ageMax">
            <isEmpty property="addressLike">
            <isEmpty property="avatarLike">
            <isEmpty property="emailLike">
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
            </isNull>
            </isNull>
            </isEmpty>
            </isEmpty>
            </isEmpty>
            </isEmpty>
            </isEmpty>
            </isEmpty>
        </sql>
    </operation>

    <operation name="getUsersByUserIds" multiplicity="many" remarks="">
        <sql>
            select
            a.user_id,
            a.username,
            a.password,
            a.role_type,
            a.name,
            a.nickName,
            a.age,
            a.address,
            a.isMale,
            a.avatar,
            a.email,
            a.create_time,
            a.update_time,
            a.delete_flag
            from user a
            where
            a.delete_flag = 0
            and a.user_id in
            <iterate property="userIds" conjunction="," open="(" close=")">
                #userIds[]#
            </iterate>
        </sql>
    </operation>

    <operation name="getUsersByEmails" multiplicity="many" remarks="">
        <sql>
            select
            a.user_id,
            a.username,
            a.password,
            a.role_type,
            a.name,
            a.nickName,
            a.age,
            a.address,
            a.isMale,
            a.avatar,
            a.email,
            a.create_time,
            a.update_time,
            a.delete_flag
            from user a
            where
            a.delete_flag = 0
            and a.email in
            <iterate property="emails" conjunction="," open="(" close=")">
                #emails[]#
            </iterate>
        </sql>
    </operation>

    <operation name="deleteByUserIds" remarks="">
        <sql>
            UPDATE user SET
               delete_flag = 1
               , update_time = CURRENT_TIMESTAMP(6)
            where
            delete_flag = 0
            and user_id in
            <iterate property="userIds" conjunction="," open="(" close=")">
                #userIds[]#
            </iterate>
        </sql>
    </operation>

    <operation name="deleteByEmails" remarks="">
        <sql>
            UPDATE user SET
               delete_flag = 1
               , update_time = CURRENT_TIMESTAMP(6)
            where
            delete_flag = 0
            and email in
            <iterate property="emails" conjunction="," open="(" close=")">
                #emails[]#
            </iterate>
        </sql>
    </operation>

    <!-- 以上是生成代码，勿动 ,如果表变更，重新执行 gen.sh table user -e 再复制再粘贴覆盖-->




    <operation name="login" multiplicity="one" remarks="">
        <sql>
            select
            a.user_id,
            a.username,
            a.password,
            a.role_type,
            a.name,
            a.nickName,
            a.age,
            a.address,
            a.isMale,
            a.avatar,
            a.email,
            a.create_time,
            a.update_time,
            a.delete_flag
            from user a
            where
            a.delete_flag = 0
            and a.username=?
            and a.password=?
        </sql>
    </operation>

</table>
