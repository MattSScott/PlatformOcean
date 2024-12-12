package platform_ocean.Config.NetworkWriter;

import java.net.MulticastSocket;
import java.net.NetworkInterface;
import java.net.DatagramSocket;
import java.net.SocketAddress;

import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;

import java.net.InetSocketAddress;
import java.io.IOException;
import java.net.DatagramPacket;

@Component
public class MulticastSubscriber extends Thread {

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
    protected void respondToServiceDiscovery(String senderIP) {

		try (DatagramSocket responseSocket = new DatagramSocket()) {

            final int RESPONSE_PORT = 9002;
            SocketAddress responseAddress = new InetSocketAddress(senderIP, RESPONSE_PORT);
			responseSocket.connect(responseAddress);

			byte[] networkDataBuffer = networkData.generateDiscoveryInfo();

			DatagramPacket pack = new DatagramPacket(networkDataBuffer, networkDataBuffer.length);
			responseSocket.send(pack);

			System.out.println("Responded...");

		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@Async
	@EventListener(ApplicationReadyEvent.class)
	public void run() {

        final int MULTICASTER_PORT = 9001;
        try (MulticastSocket socket = new MulticastSocket(MULTICASTER_PORT)) {

			SocketAddress group = new InetSocketAddress("230.185.192.108", MULTICASTER_PORT);
			NetworkInterface localNetwork = socket.getNetworkInterface();
			socket.joinGroup(group, localNetwork);

			while (!Thread.currentThread().isInterrupted()) {
				DatagramPacket packet = new DatagramPacket(buffer, buffer.length);
				socket.receive(packet);
				String senderIP = packet.getAddress().getHostAddress();
				System.out.println(senderIP);
				String received = new String(packet.getData(), 0, packet.getLength());
				System.out.println(received);
				if (received.equals("PlatformOceanDiscovery")) {
					this.respondToServiceDiscovery(senderIP);
				}
			}
			socket.leaveGroup(group, localNetwork);

        } catch (IOException e) {
			e.printStackTrace();
		}

	}
}
