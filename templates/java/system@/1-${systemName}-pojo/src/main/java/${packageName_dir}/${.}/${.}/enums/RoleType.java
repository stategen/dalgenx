package ${packageName}.enums;

import org.stategen.framework.lite.ValuedEnum;

import io.swagger.annotations.ApiModelProperty;

/**
 * The Enum RoleType.
 *
 * @author niaoge
 * @version $Id: RoleType.java, v 0.1 2021年1月7日 上午5:34:39 XiaZhengsheng Exp $$
 */
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
