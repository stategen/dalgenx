package ${packageName}.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.stategen.framework.annotation.ApiConfig;
import org.stategen.framework.annotation.ApiRequestMappingAutoWithMethodName;
import org.stategen.framework.annotation.State;
import org.stategen.framework.annotation.Wrap;
import org.stategen.framework.enums.DataOpt;

import ${packageName}.domain.User;

@ApiConfig
@Wrap
@RequestMapping("api/userDetail")
public class User_detail_$usernameController extends User_meController {

    @ApiRequestMappingAutoWithMethodName
    @RequestMapping("/{username}")
    @State(init=true,dataOpt=DataOpt.FULL_REPLACE)
    public User getUserData(@PathVariable("username") String username) {
        User topicAuthor = this.userService.getUserByUsername(username);
        return topicAuthor;
    }
}
