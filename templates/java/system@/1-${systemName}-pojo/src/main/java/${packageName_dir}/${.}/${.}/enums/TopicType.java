package ${packageName}.enums;

import org.stategen.framework.lite.ValuedEnum;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum TopicType implements ValuedEnum<String>{
    
    good( "精华"),
    share( "分享"),
    ask( "问答"),
    job( "招聘"),
    dev( "测试"),
    ;
    
    private String desc;
    

}
