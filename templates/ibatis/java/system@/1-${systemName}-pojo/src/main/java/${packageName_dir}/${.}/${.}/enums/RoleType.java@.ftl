package ${packageName}.enums;

import org.stategen.framework.lite.ValuedEnum;

import io.swagger.annotations.ApiModelProperty;

public enum RoleType implements ValuedEnum<String> {
    @ApiModelProperty("管理员")
    ADMIN("admin"),
    
    DEFAULT("默认角色"),
    DEVELOPER("开发人员"),
    ;
    
    private String desc;
    
    RoleType(String desc){
        this.desc =desc;
    }
    
    public String getDesc() {
        return desc;
    }
}
