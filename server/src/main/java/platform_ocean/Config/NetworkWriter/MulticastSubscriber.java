package platform_ocean.Config.NetworkWriter;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.MulticastSocket;
import java.net.NetworkInterface;
import java.net.SocketAddress;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
public class MulticastSubscriber extends Thread {

	protected MulticastSocket socket = null;
	protected NetworkInterface localNetwork = null;
	protected byte[] buffer = new byte[256];

	@Autowired
	private NetworkInfoStore networkData;

	public MulticastSubscriber() {

	}

//	public static NetworkInterface getLocalNetworkInterface() {
//		Enumeration<NetworkInterface> interfaces;
//		try {
//			interfaces = NetworkInterface.getNetworkInterfaces();
//		} catch (SocketException e) {
//			throw new RuntimeException("NetworkInterface not found", e);
//		}
//		while (interfaces.hasMoreElements()) {
//			NetworkInterface networkInterface = interfaces.nextElement();
//			Enumeration<InetAddress> addresses = networkInterface.getInetAddresses();
//			while (addresses.hasMoreElements()) {
//				InetAddress address = addresses.nextElement();
//				System.out.println(address);
//				if (address.isLoopbackAddress())
//					continue;
//				if (address.getHostAddress().contains(":"))
//					continue;
//				if (address.isSiteLocalAddress() || address.isLinkLocalAddress() || address.isAnyLocalAddress())
//					return networkInterface;
//			}
//		}
//		throw new RuntimeException("NetworkInterface not found");
//	}

	@Async
	private void respondToServiceDiscovery(String senderIP, NetworkInterface localNetwork) {

		try (DatagramSocket responseSocket = new DatagramSocket()) {

			SocketAddress responseAddress = new InetSocketAddress(senderIP, 9001);

//			System.out.println(responseAddress);
			responseSocket.connect(responseAddress);

			byte[] networkDataBuffer = networkData.generateDiscoveryInfo();

			DatagramPacket pack = new DatagramPacket(networkDataBuffer, networkDataBuffer.length);

			responseSocket.send(pack);

			System.out.println("Responded...");

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Override
	@Async
	@EventListener(ApplicationReadyEvent.class)
	public void run() {

		InetAddress x = networkData.getServerAddress();
		System.out.println(x);

		try (MulticastSocket socket = new MulticastSocket(9001)) {

			SocketAddress group = new InetSocketAddress("230.185.192.108", 9001);
			NetworkInterface localNetwork = socket.getNetworkInterface();
			socket.joinGroup(group, localNetwork);

			while (true) {
				DatagramPacket packet = new DatagramPacket(buffer, buffer.length);
				socket.receive(packet);
				String senderIP = packet.getAddress().getHostAddress();
//				System.out.println(senderIP);
				String received = new String(packet.getData(), 0, packet.getLength());
				System.out.println(received);
				if (received.equals("PlatformOceanDiscovery")) {
					System.out.println("TEST");
					this.respondToServiceDiscovery(senderIP, localNetwork);
				}
			}

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
}
