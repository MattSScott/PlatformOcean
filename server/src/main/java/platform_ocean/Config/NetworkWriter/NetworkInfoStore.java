package platform_ocean.Config.NetworkWriter;

import java.io.Serializable;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.util.Enumeration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@ConfigurationProperties(prefix = "server")
@Configuration
public class NetworkInfoStore {

	public class PlatformIdentifier implements Serializable {

		private static final long serialVersionUID = 1L;

		public final String platformOwner;

		public final String platformIP;

		public PlatformIdentifier() throws UnknownHostException {

			platformOwner = "Matt_Uni";
			platformIP = getFullGatewayAddress();
		}

	}

	public class AddressInterfacePair {
		private final NetworkInterface netInf;
		private final InetAddress serverIP;

		public AddressInterfacePair(NetworkInterface netInf, InetAddress serverIP) {
			this.netInf = netInf;
			this.serverIP = serverIP;
		}

		public NetworkInterface getNetInf() {
			return netInf;
		}

		public InetAddress getServerIP() {
			return serverIP;
		}
	}

	@Value("${server.port}")
	private String serverPort;

	@Bean
	public AddressInterfacePair getServerAddressInterfacePair() {
		Enumeration<NetworkInterface> interfaces;
		try {
			interfaces = NetworkInterface.getNetworkInterfaces();
		} catch (SocketException e) {
			throw new RuntimeException("NetworkInterface not found", e);
		}
		while (interfaces.hasMoreElements()) {
			NetworkInterface networkInterface = interfaces.nextElement();

			try {
				if (!networkInterface.supportsMulticast()) {
					continue;
				}
			} catch (SocketException e) {
				e.printStackTrace();
			}

			Enumeration<InetAddress> addresses = networkInterface.getInetAddresses();

			while (addresses.hasMoreElements()) {
				InetAddress address = addresses.nextElement();
				System.out.println(address);
				if (address.isLoopbackAddress())
					continue;
				if (address.isSiteLocalAddress())
					continue;
				if (address.getHostAddress().contains(":"))
					continue;
				System.out.println(networkInterface);
				return new AddressInterfacePair(networkInterface, address);
			}
		}
		throw new RuntimeException("Non-loopback IP address not found");
	}

	@Bean
	public String getFullServerAddress() throws UnknownHostException {
		InetAddress serverIP = getServerAddressInterfacePair().getServerIP();
		String serverIpString = serverIP.getHostAddress();
		String fullServerAddress = String.format("http://%s:%s", serverIpString, serverPort);
		return fullServerAddress;
	}

	@Bean
	public String getFullGatewayAddress() throws UnknownHostException {
		InetAddress serverIP = getServerAddressInterfacePair().getServerIP();
		String serverIpString = serverIP.getHostAddress();
		final int GATEWAY_PORT = 3000;
		String fullServerAddress = String.format("http://%s:%s", serverIpString, GATEWAY_PORT);
		return fullServerAddress;
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
