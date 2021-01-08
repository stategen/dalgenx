package ${packageName}.enums;

import org.stategen.framework.lite.ValuedEnum;

/**
 * The Enum StatusEnum.
 *
 * @author niaoge
 * @version $Id: StatusEnum.java, v 0.1 2021年1月7日 上午5:34:45 XiaZhengsheng Exp $$
 */
public enum StatusEnum implements ValuedEnum<String> {
    ACTIVE("有效"),
    
    FORBIDDEN("禁用"),
    
    PENDING("待审核"),
    ;
    
    private String desc;
    
    StatusEnum(String desc){
        this.desc =desc;
    }
    
    public String getDesc() {
        return desc;
    }

}
