package ${packageName}.facadegen;

import java.io.IOException;
import java.util.Arrays;
import java.util.InvalidPropertiesFormatException;

import javax.servlet.http.HttpServletRequest;

import org.junit.Test;
import org.springframework.web.bind.annotation.CookieValue;
import org.stategen.framework.progen.BaseGenFacadeProcessor;
import org.stategen.framework.progen.FlutterContextSetter;
import org.stategen.framework.progen.GenContext;
import org.stategen.framework.progen.PathType;
import org.stategen.framework.util.CollectionUtil;
import org.stategen.framework.util.JSONUtil;
import org.stategen.framework.util.StringUtil;

import freemarker.template.TemplateException;


public class ${webType?cap_first}FacadeProcessor extends BaseGenFacadeProcessor {
    final static org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(${webType?cap_first}FacadeProcessor.class);

    public ${webType?cap_first}FacadeProcessor() {
        super();
    }

    public static void main(String[] args) {
        ${webType?cap_first}FacadeProcessor ${webType}FacadeProcessor = new ${webType?cap_first}FacadeProcessor();
        try {
            logger.info("================== ${webType} 前端代码生成开始===========================");
            ${webType}FacadeProcessor.genFacade();
            logger.info("================== ${webType} 前端代码生成结束===========================");
        } catch (Exception e) {
            logger.error("生成前端代码时出错:", e);
        }
    }
 
    @Test
    public void gen() {
        main(null);
    }

    public void genFacade() throws InvalidPropertiesFormatException, IOException, TemplateException {
        new FlutterContextSetter().setContext();

        //这里注册的将替代supper中的注册
        GenContext.registSimpleClz(Void.TYPE, "void");
        GenContext.registSimpleClz(Class.class, "String");

        GenContext.registIgnoreParamClz(HttpServletRequest.class);
        GenContext.registIgnoreParamAnnotationClz(CookieValue.class);
        GenContext.addStaticUtil(StringUtil.class);
        GenContext.addStaticUtil(CollectionUtil.class);
        GenContext.addStaticUtil(JSONUtil.class);
        //
        GenContext.tempDirs = Arrays.asList("/${webType}/dart-api", "/${webType}/dart-flutter");
        GenContext.outDir="${projectName?uncap_first}-frontend-${webType}/lib/intergrade/";

        PathType[] pathTypes = PathType.values();
        for (PathType pathType : pathTypes) {
            String nameStr = pathType.getWrapName() + "s";
            GenContext.put(pathType, nameStr);
        }
        
        super.scanControllerAndGenFacade();
        
        
    }

}
