package platform_ocean.Config.NetworkWriter;

import java.nio.file.Files;
import java.nio.file.Path;

public class ServerDetailsParser {

    private static final Path CONFIG_FILE = Path.of("server-name.txt");
    private static String SERVER_OWNER;

    static {
        try {
            SERVER_OWNER = parseConfigFile();
        } catch (Exception e) {
            SERVER_OWNER = "UnnamedPlatform";
            e.printStackTrace();
        }
    }

    private static String parseConfigFile() throws Exception {
        if (Files.exists(CONFIG_FILE)) {
            final String platformName = Files.readString(CONFIG_FILE).trim();
            if (platformName.isEmpty()) {
                throw new RuntimeException("Server name is empty, using default.");
            }
            return platformName;
        } else {
            String error = String.format("Configuration file not found at: %s. Using default server name", CONFIG_FILE.toAbsolutePath());
            throw new RuntimeException(error);
        }
    }

    public static String getServerName() {
        return SERVER_OWNER;
    }

}
