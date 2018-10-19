package ${packageName}.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.stategen.framework.web.cookie.RequestUtil;

@Controller
/***没有 @ApiConfig 不生成前端代码 */
@RequestMapping
public class DefaultController {
    private static final String INDEX_HTML = "pages/index.html";

    @RequestMapping(value = { "/", "", "/index.html", INDEX_HTML, "/pages/" })
    public void index(HttpServletResponse response) throws IOException {
        String requestAppName = RequestUtil.getRequestAppName();
        String result = new StringBuffer(requestAppName).append("pages").toString();
        response.sendRedirect(result);
    }

    @RequestMapping(value = { "/pages" })
    public String pages(HttpServletResponse response) throws IOException {
        return INDEX_HTML;
    }

    @RequestMapping(value = { "/pages/{route}" })
    public String pagesOfPage(String route, HttpServletResponse response) throws IOException {
        String result = INDEX_HTML;
        return result;
    }

//    @RequestMapping(value = { "/pages/service-worker.js" })
//    public String pagesOfServiceWoker(String node, HttpServletResponse response) throws IOException {
//        String result = null;
//        result = "pages/service-worker.js";
//        return result;
//    }

}
