package ${packageName}.enums;

import org.stategen.framework.lite.ValuedEnum;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * The Enum TopicType.
 *
 * @author niaoge
 * @version $Id: TopicType.java, v 0.1 2021年1月7日 上午5:34:50 XiaZhengsheng Exp $$
 */
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
