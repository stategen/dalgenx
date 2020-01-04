package ${packageName}.annotion;

import static java.lang.annotation.ElementType.ANNOTATION_TYPE;
import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.METHOD;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.constraints.NotNull;

import org.stategen.framework.annotation.ExcludeBeanRule;
/**
 * framework中的lite不引用validate-api，因而不引用到NotNull,所以可以在业务代码中写这个标注用以简化 @ExcludeBeanRule(NotNull.class)
 * 
 * @author XiaZhengsheng
 * @version $Id: ExcludeBeanRuleNotNull.java, v 0.1 2018年12月23日 上午7:22:17 XiaZhengsheng Exp $
 */
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ METHOD,ElementType.PARAMETER, FIELD, ANNOTATION_TYPE })
@Inherited
@ExcludeBeanRule(NotNull.class)
public @interface ExcludeBeanRuleNotNull {

}
