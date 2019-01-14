package ${packageName}.checker;

import java.lang.reflect.Method;

import org.stategen.framework.annotation.VisitCheck;
import org.stategen.framework.checker.AbstractMethodChecker;
import org.stategen.framework.lite.IResponseStatus;

public class VisitChecker extends AbstractMethodChecker<VisitCheck>{


    @Override
    public Class<VisitCheck> getCheckAnnoClz() {
        return VisitCheck.class;
    }

    @Override
    public IResponseStatus doCheck(Method method, VisitCheck checkAnno, Class<? extends IResponseStatus> defaultResponseStatusTypeClzOfCheckFail) {
        return null;
    }




}
