/**
 * Groovy Maven Plugin Default Variables
 * By default a few variables are bound into the scripts environment:
 *
 * project	 The maven project, with auto-resolving properties
 * pom	     Alias for project
 * session	 The executing MavenSession
 * settings	 The executing Settings
 * log	     A SLF4J Logger instance
 * ant	     An AntBuilder instance for easy access to Ant tasks
 * fail()	 A helper to throw MojoExecutionException
 **/



import cn.org.rapid_framework.generator.GeneratorProperties
import cn.org.rapid_framework.generator.provider.db.model.*
import org.stategen.framework.generator.util.*

main();

def main() {
	freemarker.log.Logger.selectLoggerLibrary(freemarker.log.Logger.LIBRARY_NONE);
	String executeTarget = System.getProperty(GenNames.executeTarget);
    println pom.properties.getClass();
//    if ("${executeTarget}" in ["system", "project", "client", "boot"]) {
	if ("${executeTarget}"=="system" || "${executeTarget}"=="project" || "${executeTarget}"=="client" || "${executeTarget}"=="boot" ){
        new ProgenTargets(this)."${executeTarget}"();
    } else {
        loadDefaultGeneratorProperties();
        new DalgenTargets(this)."${executeTarget}"();
    }

	println "---------------------Generator executed SUCCESS---------------------"
}

def loadDefaultGeneratorProperties() {
    Properties mergedProps =GenProperties.getAllMergedProps(System.getProperty(GenNames.genConfigXml));
    GenProperties.putStatics(mergedProps)
    Properties pts =GeneratorProperties.properties;
    pts.putAll(mergedProps);

	pts.putAll(pom.properties);
}

public class DalgenTargets extends org.stategen.framework.generator.BaseTargets{
    private static final long serialVersionUID = 1L;

    public  Object pom;
    public  Object settings;
    public  Object log;
    public  fail

    public DalgenTargets(Object global) {
        super(global);
        this.pom = global.pom;
        this.settings = global.settings;
        this.log = global.log;
        this.fail = global.fail;

        for(e in System.properties) {
            put(e.key,e.value)
        }
        for(e in GeneratorProperties.properties) {
            put(e.key,e.value)
        }
    }

}


public class ProgenTargets extends org.stategen.framework.generator.BaseProgen {
    private static final long serialVersionUID = 1L;

    public  Object pom;
    public  Object settings;
    public  Object log;
    public  fail

    public ProgenTargets(Object global) {
        super(global);
        this.pom = global.pom;
        this.settings = global.settings;
        this.log = global.log;
        this.fail = global.fail;
    }
}




