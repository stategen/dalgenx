package ${packageName}.controller;

import java.util.Arrays;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.stategen.framework.annotation.ApiConfig;
import org.stategen.framework.annotation.ApiRequestMappingAutoWithMethodName;
import org.stategen.framework.annotation.State;
import org.stategen.framework.annotation.Wrap;
import org.stategen.framework.enums.DataOpt;
import org.stategen.framework.lite.PageList;
import org.stategen.framework.lite.Pagination;

import ${packageName}.checker.LoginCheck;
import ${packageName}.domain.Topic;
import ${packageName}.domain.TopicReply;
import ${packageName}.enums.CookieType.LOGIN.LoginCookieNames;
import ${packageName}.service.TopicReplyService;
import ${packageName}.service.TopicUpService;
import ${packageName}.service.UserService;

import io.swagger.annotations.ApiParam;

@ApiConfig
@Wrap
public class Topic_detail_$topicIdController extends TopicControllerBase {
    final static org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(Topic_detail_$topicIdController.class);

    @Resource
    private TopicReplyService topicReplyService;

    @Resource
    private UserService userService;

    @Resource
    private TopicUpService topicUpService;

    @ApiRequestMappingAutoWithMethodName
    @RequestMapping("/{topicId}")
    @State(init = true, dataOpt = DataOpt.FULL_REPLACE,genRefresh=true)
    public Topic getTopicDetail(@PathVariable("topicId") String topicId) {
        Topic topic = this.topicService.getTopicByTopicId(topicId);
        topicService.assignTopicExtraProperties(Arrays.asList(topic));
        return topic;
    }

    @ApiRequestMappingAutoWithMethodName
    @RequestMapping("/{topicId}/getReplies")
    @State(init = true, dataOpt = DataOpt.APPEND_OR_UPDATE,genRefresh=true)
    public PageList<TopicReply> getTopicReplyPageList(@PathVariable("topicId") String topicId, @ApiParam(hidden = true) TopicReply topicReply,
                                                Pagination pagination) {

        String userId = loginCookieGroup.getCookieValue(LoginCookieNames.userId);
        PageList<TopicReply> topicReplyPageList = topicReplyService.getPageList(topicReply, pagination.getPageSize(),
            pagination.getPage());
        topicReplyService.assignRepliesExtraProperties(userId, topicReplyPageList.getItems());
        return topicReplyPageList;
    }

    @ApiRequestMappingAutoWithMethodName
    @RequestMapping("reply/{replyId}")
    @LoginCheck
    @State
    public TopicReply replyUp(@PathVariable("replyId") String replyId) {
        String userId = this.loginCookieGroup.getCookieValue(LoginCookieNames.userId);
        TopicReply replyUp = this.topicReplyService.replyUp(replyId, userId);
        topicReplyService.assignRepliesExtraProperties(userId, Arrays.asList(replyUp)); 
        return replyUp;
    }

    @ApiRequestMappingAutoWithMethodName
    @RequestMapping("/{topicId}/postReply")
    @LoginCheck
    @State
    public TopicReply PostReply(@PathVariable("topicId") String topicId, TopicReply topicReply) {
        topicReply.setTopicId(topicId);
        String userId = loginCookieGroup.getCookieValue(LoginCookieNames.userId);
        topicReply.setAuthorId(userId);
        this.topicReplyService.saveTopicReply(topicReply);
        topicReplyService.assignRepliesExtraProperties(userId, Arrays.asList(topicReply));
        return topicReply;
    }
}
