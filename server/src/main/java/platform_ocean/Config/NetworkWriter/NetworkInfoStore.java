package platform_ocean.Config.NetworkWriter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.Serial;
import java.io.Serializable;
import java.net.InetAddress;
import java.net.UnknownHostException;

@ConfigurationProperties(prefix = "server")
@Configuration
public class NetworkInfoStore {

    public class PlatformIdentifier implements Serializable {

        @Serial
        private static final long serialVersionUID = 1L;

        public final String platformName;

        public final String platformIP;

        public PlatformIdentifier() throws UnknownHostException {
            platformName = ServerDetailsParser.getServerName();
            platformIP = getFullServerAddress();
        }

    }

    @Value("${server.port}")
    private String serverPort;

    @Bean
    public String getFullEndpointAddress() throws UnknownHostException {
        String serverIP = InetAddress.getLocalHost().getHostAddress();
        return String.format("http://%s/PlatformOcean", serverIP);
    }

    @Bean
    public String getFullServerAddress() throws UnknownHostException {
        String serverIP = InetAddress.getLocalHost().getHostAddress();
        return String.format("http://%s:%s", serverIP, serverPort);
    }

    @Bean
    public String getFullGatewayAddress() throws UnknownHostException {
        String serverIP = InetAddress.getLocalHost().getHostAddress();
        final int GATEWAY_PORT = 3000;
        return String.format("http://%s:%s", serverIP, GATEWAY_PORT);
    }

    @Bean
    public byte[] generateDiscoveryInfo() throws UnknownHostException, JsonProcessingException {
        PlatformIdentifier platformIdentifier = new PlatformIdentifier();
        ObjectMapper jsonGenerator = new ObjectMapper();

        String jsonStr = jsonGenerator.writeValueAsString(platformIdentifier);
        System.out.println(jsonStr);

        return jsonStr.getBytes();
    }
}
