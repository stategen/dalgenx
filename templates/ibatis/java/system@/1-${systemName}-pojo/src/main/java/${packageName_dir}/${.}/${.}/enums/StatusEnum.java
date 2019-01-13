package com.mycompany.biz.enums;

import org.stategen.framework.lite.ValuedEnum;

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
