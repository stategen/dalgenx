package com.mycompany.biz.controller;

import java.util.Arrays;
import java.util.Date;

import javax.annotation.Resource;

import org.stategen.framework.annotation.ApiConfig;
import org.stategen.framework.annotation.ApiRequestMappingAutoWithMethodName;
import org.stategen.framework.annotation.State;
import org.stategen.framework.annotation.Wrap;
import org.stategen.framework.enums.DataOpt;
import org.stategen.framework.lite.AntdPageList;
import org.stategen.framework.lite.PageList;
import org.stategen.framework.lite.Pagination;
import org.stategen.framework.util.DatetimeUtil;
import org.stategen.framework.web.cookie.CookieGroup;

import com.mycompany.biz.domain.Topic;
import com.mycompany.biz.enums.CookieType.LOGIN.LoginCookieNames;
import com.mycompany.biz.enums.TopicType;

import io.swagger.annotations.ApiParam;

@ApiConfig
@Wrap
public class TopicController extends TopicControllerBase {
    final static org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(TopicController.class);
    
    @Resource
    private CookieGroup<LoginCookieNames> loginCookieGroup;
    
    
    @ApiRequestMappingAutoWithMethodName
    @State(init=true,dataOpt=DataOpt.APPEND_OR_UPDATE)
    public AntdPageList<Topic> getTopicPageList(TopicType topicType,Boolean mdrender,@ApiParam(hidden=true) Topic topic, Pagination pagination){
        topic.setCreateTimeMax(DatetimeUtil.current());
        PageList<Topic> topicPageList = this.topicService.getTopicPageList(topic, pagination.getPageSize(), pagination.getPage());
        topicService.assignTopicExtraProperties(topicPageList.getItems());
        return new AntdPageList<Topic>(topicPageList);
    }


    
    @ApiRequestMappingAutoWithMethodName
    @State
    public Topic update(@ApiParam() String authorId,
                        @ApiParam() String topicType,
                        @ApiParam() String content,
                        @ApiParam() String title,
                        @ApiParam() String lastReplyAt,
                        @ApiParam() String good,
                        @ApiParam() String top,
                        @ApiParam() Long visitCount,
                        @ApiParam() String createAt,
                        @ApiParam() Date testTimestamp,
                        @ApiParam() Date testDatetime,
                        @ApiParam() Date testDate,
                        @ApiParam() Date testTime,
                        @ApiParam() String topicId,
                        @ApiParam(hidden = true) Topic topic) {
        topic = this.topicService.update(topic);
        topicService.assignTopicExtraProperties(Arrays.asList(topic));
        return topic;
    }

}
