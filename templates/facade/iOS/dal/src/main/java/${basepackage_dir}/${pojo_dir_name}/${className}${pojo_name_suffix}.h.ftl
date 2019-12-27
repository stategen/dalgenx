


/**
 * ${tableConfig.className}${pojo_name_suffix}
 */
@interface AppointmentInfoModel : ${className}${pojo_name_suffix}

  
<#list table.columns as column>
/** ${column.columnAlias!}   db_column: ${column.sqlName}  */
@property (nonatomic ,strong) ${column.simpleJavaType}  *${column.columnNameLower};
</#list>
  
@end


