package ${packageName}.controller;

import java.io.IOException;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.stategen.framework.annotation.ApiConfig;
import org.stategen.framework.annotation.ApiRequestMappingAutoWithMethodName;
import org.stategen.framework.annotation.State;
import org.stategen.framework.annotation.Wrap;
import org.stategen.framework.util.JSONUtil;

@Controller
@ApiConfig
@Wrap
public class HomeController {
    final static org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(HomeController.class);
    @Autowired
    private ServletContext servletContext;

    @ApiRequestMappingAutoWithMethodName(name = "")
    @State(init=true)
    @RequestMapping("/api/home")
    public Object getDashboard() throws IOException {
        String realPath = servletContext.getRealPath("/");
        String jsonPath=realPath+"json/dashboard.json";
        return JSONUtil.loadJson(jsonPath);
    }
    
//    final String weatherURI ="/api/v1/weather/";
//    @RequestMapping(weatherURI+"now.json")
//    @ResponseBody
//    @State(init=true)
//    public Object proxyWeather(HttpServletRequest httpRequest,HttpServletResponse httpResponse) throws IOException{
//        Object result = HttpRequestUtil.proxy("https://api.seniverse.com", "^"+weatherURI, "/v3/weather/");
//        result=JSON.parse((String) result);
//        return result;
//    }


}
