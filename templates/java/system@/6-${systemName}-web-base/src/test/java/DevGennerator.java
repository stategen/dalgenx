import cn.org.rapid_framework.generator.ConsoleGenerator;

/***
 *  可以代替gen.sh table | dal 命令
 *  如执行 gen.sh dal user ,dal user ,gen.sh table user,table user 都可以
 */
public class DevGennerator {

    public static void main(String[] args) throws Exception {
      ConsoleGenerator consoleGenerator = new ConsoleGenerator();
      consoleGenerator.generate();
    }

}
 