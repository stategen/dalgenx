package ${packageName}.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.stategen.framework.annotation.ApiRequestMappingAutoWithMethodName;

import ${packageName}.domain.ResponseExtend;
import ${packageName}.enums.ResponseStatus;
import ${packageName}.enums.RoleType;

@Controller
@RequestMapping("/api")
/***无@ApiConfig 不能成api，但是对应的方法参数返回值还是会照样生成 */
public class BeanAndEnumController {

    @ApiRequestMappingAutoWithMethodName(name = "将ResponseExtend 导出到前端")
    @ResponseBody
    public ResponseExtend<Long> getResponseExtend(){
        return null;
    }
    
    @ApiRequestMappingAutoWithMethodName(name = "将ResponseStatus 导出到前端")
    @ResponseBody
    public ResponseStatus getResponseStatus(){
        return null;
    }
    
    @ApiRequestMappingAutoWithMethodName(name = "将RoleType 导出到前端")
    @ResponseBody
    public RoleType getRoleType(){
        return null;
    }
    
}
