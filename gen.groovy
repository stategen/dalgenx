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


main();

def main() {
	freemarker.log.Logger.selectLoggerLibrary(freemarker.log.Logger.LIBRARY_NONE);
	String executeTarget = System.getProperty("executeTarget");
    println pom.properties.getClass();
	if ("${executeTarget}"=="system" || "${executeTarget}"=="project" ){
	    new ProgenTargets(this)."${executeTarget}"();
	} else {
	    loadDefaultGeneratorProperties();
	    new DalgenTargets(this)."${executeTarget}"();
	}

	println "---------------------Generator executed SUCCESS---------------------"
}

def loadDefaultGeneratorProperties() {
    
    Properties pts =GeneratorProperties.properties;
    
	pts.put("generator_tools_class","cn.org.rapid_framework.generator.util.StringHelper,org.apache.commons.lang.StringUtils,org.stategen.framework.util.CollectionUtil,org.stategen.framework.util.Setting,org.stategen.framework.generator.util.CompatibleHelper,org.stategen.framework.util.StringUtil,org.stategen.framework.generator.util.TableHelper");
	pts.put("gg_isOverride","true");

	pts.put("generator_sourceEncoding","UTF-8");
	pts.put("generator_outputEncoding","UTF-8");
	pts.put("gg_isOverride","true");
	
	//将表名从复数转换为单数
	pts.put("tableNameSingularize","true");
	
	//加载默认配置文件
	String dalgen_dir =pom.basedir.path;
	GeneratorProperties.load(dalgen_dir+"/gen.xml"); 
	
	//加载项目配置文件，如果相同，覆盖默认配置
	GeneratorProperties.load(System.getProperty("generatorConfigFile")); 
	pts.putAll(pom.properties);
	pts.put("dalgen_dir",dalgen_dir);
	
	pts.put("genInputCmd",System.getProperty("genInputCmd"));
	pts.put("cmdPath",System.getProperty("cmdPath"));
	pts.put("dir_templates_root",pts.getProperty("dalgen_dir")+"/templates/"+pts.getProperty("dao_type"));
	
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




