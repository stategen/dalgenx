package ${packageName}.checker;

import java.lang.annotation.Annotation;
import java.lang.reflect.Method;

import org.springframework.core.annotation.AnnotationUtils;
import org.stategen.framework.annotation.CookieCheck;
import org.stategen.framework.checker.AbstractMethodChecker;
import org.stategen.framework.lite.IResponseStatus;

public class LoginChecker extends AbstractMethodChecker<LoginCheck>{
    final static org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(LoginChecker.class);

    @Override
    public IResponseStatus doCheck(Method method, LoginCheck anno, Class<? extends IResponseStatus> defaultResponseStatusTypeClzOfCheckFail) {
        CookieCheck cookieCheck = AnnotationUtils.getAnnotation(anno,CookieCheck.class);
        AbstractMethodChecker<Annotation> checker = getChecker(CookieCheck.class);
        return checker.doCheck(method, cookieCheck, defaultResponseStatusTypeClzOfCheckFail);
    }

    @Override
    public Class<LoginCheck> getCheckAnnoClz() {
        return LoginCheck.class;
    }

}
