package platform_ocean.Config.NetworkWriter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import jakarta.annotation.PostConstruct;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.nio.file.Paths;
import java.io.FileWriter;
import java.io.IOException; 

@Configuration
public class NetworkConfig {
	
	@Value("${server.port}")
	private String serverPort;
	
	
	@PostConstruct
	public void writeServerIP() throws UnknownHostException  {
		String serverIP = InetAddress.getLocalHost().getHostAddress();
		String fullServerAddress = String.format("http://%s:%s", serverIP, serverPort);
		try {
			this.writeToFile(fullServerAddress);
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
