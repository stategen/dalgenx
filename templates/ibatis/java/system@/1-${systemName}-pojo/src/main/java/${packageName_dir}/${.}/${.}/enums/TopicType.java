package com.mycompany.biz.enums;

import org.stategen.framework.lite.ValuedEnum;

public enum TopicType implements ValuedEnum<String>{
    
    good( "精华"),
    share( "分享"),
    ask( "问答"),
    job( "招聘"),
    dev( "测试"),
    ;
    
    private String desc;
    
    TopicType(String desc){
      this.desc =desc;  
    }
}
