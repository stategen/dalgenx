import cn.org.rapid_framework.generator.ConsoleGenerator;

/***
 *  可以代替gen.sh table | dal 命令
 *
 */
public class DevGennerator {

    public static void main(String[] args) throws Exception {
      ConsoleGenerator consoleGenerator = new ConsoleGenerator();
      consoleGenerator.generate();
    }

}
 