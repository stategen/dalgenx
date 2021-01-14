### 介绍

1. dalgenX是对支付宝dalgen代码生成器的开源实现，freemarker版

2. 该项目基于cn_rapidframework（dalgenx为了生产使用性改造很多）

3. dalgen开源初级版最早由badqiu放在taocode上，badqiu大神我不认识，mybatis-plus-pagging.jar那个分页器有一个@author badqiu

4. 我对本项目持续开发优化从2015年开始，用于生产环境改造，特别是支持可迭代开发(全网唯一？？)，它生成java代码时会双向比对java文件。所以本版基本上是重构开发，命名为dalgenX。

5. 与支付宝dalgen还有一个区别：支付宝dalgen只支持ibatis,而dalgenX可以在ibatis与mybatis之间自由切换生成.

6. dalgenX中的sql为batis中sql的语法糖，方便对sql阅读，开发，DBA优化，语法糖只在生成代码时起作用，显式生成目标batis sql语言。不参与运行期，无需担心语法糖会造成运行期bug。

7. StateGen用dalgenX来生成dao层+service层+baseController层，开发者也可以单独在自己的项目中使用.

8. 我使用过一段时间支付宝的dalgen,被其深深的理念所折服，很难再回到之前的mybatis-gernertator搞原始开发。加上很幸运地taocode关闭前找到badqiu的dalgen。工欲善其事,必先利其器,所以才有今天的dalgenX

8. 因为早期基于的项目不是svn管理就是代码管理平台(taocode)关闭，无法列举源项目地址.在此向前辈开源贡献者表示感谢。

### 以下是使用方法:       

   1. #### 配置 dalgenX

```
git clone https://github.com/stategen/dalgenx.git
```
2. 设置 DALGENX_HOME 环境变量为 dalgenx所在目录  
3. 将 %DALGENX_HOME% 添加至 PATH 中  

4. Ide中配置（eclipse|myeclipse|idea）xml文件，方便开发时打字提示.

>location: {DALGENX_HOME}\gen.schemas-1.0.dtd  
>key type: system Id  
>key: https://github.com/stategen/dalgenx/blob/master/gen.schemas-1.0.dtd

##### 用命令初始化系统及项目/范例
ps: 以下gen.sh 必须在gitbash中运行，不能在cmd中运行。linux可以无需考虑。
1.  帮助
```
gen.sh -h  //只需用到里面的两个命令 table 和 dal
```

复制以下gen_config.xml到你项目同级目录,如果有parent pom.xml的话，和这个pom.xml平行,修改生成目的地的key值
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
    <!--有些系统把date按long存到数据库,本转换开关表示是否在pojo内使用date -->
    <entry key="date_long_field_to_date">true</entry>
    <!-- 生成 select时包括 create_date_field -->
    <entry key="gen_select_create_date_field">true</entry>
    <entry key="gen_select_update_date_field">true</entry>
    <entry key="gen_select_delete_flag_field">true</entry>

    <!-- 在className前增加一个非法字符?阻止生成dal,除非大小写驼峰写法校验完毕，该功能可解决windows文件名不区分的大小写的问题 -->
    <entry key="add_illegal_prefix">true</entry>

    <!-- 指定包名 -->
    <entry key="packageName">com.mycompany.biz</entry>

    <!-- 模块，用于dal层sqlmap及spring配置文件的划分 -->
    <entry key="systemName">trade</entry>

    <!-- 各层生成到哪个目录下，如果为空，表示同一个目录 -->
    <!-- 本项目中 pojo与dto放入一个工程内 -->
    <entry key="pojo_module_name">1-trade-pojo</entry>
    <!-- <entry key="dto_module_name">1-trade-pojo</entry> -->
    <entry key="facade_module_name">2-trade-facade</entry>
    <entry key="dao_module_name">4-trade-dao</entry>
    <entry key="service_module_name">5-trade-service</entry>
    <entry key="controller_module_name">6-trade-web-base</entry>


    <entry key="pojo_dir_name">domain</entry>



    <!-- 需要移除的表名前缀,使用逗号进行分隔多个前缀,示例值: t_,v_ -->
    <entry key="tableRemovePrefixes">br_,demo_</entry>
    <entry key="lombok">true</entry>

    <entry key="mybatisTypeHandlers">
    <![CDATA[ 
      <typeHandlers>
        <!-- <typeHandler javaType="java.util.Date" handler="org.stategen.framework.mybatis.DateTypeHandler"/> -->
      </typeHandlers>  
    ]]>    
    </entry>
    <entry key="ibatisTypeHandlers">
    <![CDATA[ 
    <!-- 
    <typeHandler javaType="com.iwallet.biz.common.util.money.Money" callback="com.alipay.common.ibatis.typehandler.MoneyTypeHandler"/>
    -->
    <typeHandler javaType="java.util.Currency" callback="org.stategen.framework.ibatis.typehandler.CurrencyHandlerCallback"/>
    <typeHandler javaType="java.util.Date" callback="org.stategen.framework.ibatis.typehandler.DateTypehandlerCallBack"/>
    <typeHandler javaType="[B" jdbcType="LONGVARBINARY" callback="org.springframework.orm.ibatis.support.BlobByteArrayTypeHandler" />
    ]]>
    </entry>


    <!-- Mysql -->
    <!-- 数据库相关配置 -->
    <entry key="jdbc_url">jdbc:mysql://localhost:3306/trade?useUnicode=true</entry>
    <entry key="jdbc_driver">com.mysql.jdbc.Driver</entry>

    <entry key="jdbc_username">stategen</entry>
    <entry key="jdbc_password">stategen</entry>
    
    <!-- ibatis,mybatis,最下面覆盖上面，最下面优先 ，修改顺序后，需要重新运行一次 ./dalbatch.sh 批量生成-->
    <entry key="dao_type">mybatis</entry>
    <entry key="dao_type">ibatis</entry>
    <!-- 如果表有水平权限(-level(orgnization|树型级别表),-owner(user|所有者表))，下面属生为true,必须提示水平权限参数，否则更不了 -->
    <entry key="forceUseLevelAuthorForWrite">true</entry>
</properties>
```
