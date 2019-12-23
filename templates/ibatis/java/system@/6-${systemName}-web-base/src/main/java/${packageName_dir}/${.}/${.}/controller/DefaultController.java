package ${packageName}.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.stategen.framework.spring.util.RequestUtil;

@Controller
/***没有 @ApiConfig 不生成前端代码 */
public class DefaultController {
    private static final String PAGES_STATIC_INDEX_HTML = "pages/static/index.html";
    private static final String PAGES_SLASH = "pages/";

    final static org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(DefaultController.class);

    @RequestMapping(value = { "/", "", "/index.html", "pages/index.html", "/pages" })
    public void index(HttpServletResponse response) throws IOException {
        String requestAppName = RequestUtil.getRequestAppName();
        String result = new StringBuffer(requestAppName).append(PAGES_SLASH).toString();
        response.sendRedirect(result);
    }

    @RequestMapping(PAGES_SLASH)
    public String pages(HttpServletResponse response) throws IOException {
        return PAGES_STATIC_INDEX_HTML;
    }

    @RequestMapping("/pages/{route:(?!static).*$}/**")
    public String route(@PathVariable("route") String route) throws IOException {
        return PAGES_STATIC_INDEX_HTML;
    }

}
