package platform_ocean.Config.NetworkWriter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;

import java.io.FileWriter;
import java.io.IOException;
import java.net.UnknownHostException;
import java.nio.file.Paths;

@Configuration
public class NetworkConfig {

    @Autowired
    private NetworkInfoStore ipInfo;

    @EventListener(ApplicationReadyEvent.class)
    public void writeServerIP() throws UnknownHostException {
        try {
            this.writeToFile(ipInfo.getFullServerAddress());
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    public void writeToFile(String address) throws IOException {
        String currDir = Paths.get("").toAbsolutePath().toString();
        String fileAddress = currDir + "/../client/.env";
        FileWriter writer = new FileWriter(fileAddress);

        String serverEnvString = String.format("REACT_APP_SERVER_IP=%s", address);
        writer.write(serverEnvString);
        writer.close();
    }
}
