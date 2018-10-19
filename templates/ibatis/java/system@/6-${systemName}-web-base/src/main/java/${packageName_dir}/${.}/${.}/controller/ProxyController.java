package ${packageName}.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.stategen.framework.spring.util.HttpRequestUtil;

import com.alibaba.fastjson.JSON;

@Controller
public class ProxyController {
    final String weatherURI ="/api/v1/weather/";
    
    @RequestMapping(weatherURI+"now.json")
    @ResponseBody
    public Object proxyWeather(HttpServletRequest httpRequest,HttpServletResponse httpResponse) throws IOException{
        Object result = HttpRequestUtil.proxy("https://api.seniverse.com", "^"+weatherURI, "/v3/weather/");
        result=JSON.parse((String) result);
        return result;
    }

}
