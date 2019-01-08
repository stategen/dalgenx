package ${packageName}.controller;

import java.io.IOException;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.stategen.framework.annotation.ApiConfig;
import org.stategen.framework.annotation.ApiRequestMappingAutoWithMethodName;
import org.stategen.framework.annotation.Wrap;
import org.stategen.framework.util.JSONUtil;

@Controller
@ApiConfig
@Wrap
@RequestMapping("/api/dashboard")
public class DashboardController {
    final static org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(DashboardController.class);
    @Autowired
    private ServletContext servletContext;

    @ApiRequestMappingAutoWithMethodName(name = "", method = RequestMethod.GET)
    public Object getDashboard() throws IOException {
        String realPath = servletContext.getRealPath("/");
        String jsonPath=realPath+"json/dashboard.json";
        return JSONUtil.loadJson(jsonPath);
    }

}
