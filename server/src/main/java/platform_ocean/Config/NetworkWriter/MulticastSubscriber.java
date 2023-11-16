package platform_ocean.Config.NetworkWriter;

//import java.net.InetAddress;
import java.net.MulticastSocket;
import java.net.NetworkInterface;
import java.net.Socket;
import java.net.DatagramSocket;
import java.net.SocketAddress;
//import java.net.SocketException;
//import java.net.UnknownHostException;
//import java.util.Enumeration;

import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.boot.context.event.ApplicationReadyEvent;

import java.net.InetSocketAddress;
import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.BufferedWriter;
import java.net.DatagramPacket;
import java.net.InetAddress;

@Component
public class MulticastSubscriber extends Thread {

	protected MulticastSocket socket = null;
	protected NetworkInterface localNetwork = null;
	protected byte[] buffer = new byte[256];

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

//	@Async
//	@EventListener(ApplicationReadyEvent.class)
//	public void run() {
//		SocketAddress group = new InetSocketAddress("230.185.192.108", 9001);
//
//		try {
//
//			socket = new MulticastSocket(9001);
//			localNetwork = socket.getNetworkInterface();
//
//			socket.joinGroup(group, localNetwork);
////			socket.joinGroup(otherGroup);
//
//			while (true) {
//				DatagramPacket packet = new DatagramPacket(buf, buf.length);
//				socket.receive(packet);
//				String received = new String(packet.getData(), 0, packet.getLength());
//				System.out.println(received);
//				if (!received.equals("PlatformOceanDiscovery")) {
//					// TODO: respond to request with name + ip location
//					break;
//				}
//			}
//			socket.leaveGroup(group, localNetwork);
////			socket.leaveGroup(otherGroup);
//			socket.close();
//
//		} catch (IOException e) {
//			e.printStackTrace();
//		} finally {
//
//		}
//	}

	@Async
	private void respondToServiceDiscovery(String senderIP, NetworkInterface localNetwork) {

		try (DatagramSocket responseSocket = new DatagramSocket()) {

			SocketAddress responseAddress = new InetSocketAddress(senderIP, 9002);
//			InetAddress localIP = localNetwork.getInetAddresses().nextElement();
//			SocketAddress localIpSocket = new InetSocketAddress(localIP);
//			responseSocket.bind(localIP);
			System.out.println(responseAddress);
			responseSocket.connect(responseAddress);
			
			DatagramPacket pack = new DatagramPacket(buffer, buffer.length);
			
			
			responseSocket.send(pack);
			
//			OutputStream os = responseSocket.getOutputStream();
//	        OutputStreamWriter osw = new OutputStreamWriter(os);
//	        BufferedWriter bw = new BufferedWriter(osw);
//	        
//	        bw.write("found you!");
			
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Async
	@EventListener(ApplicationReadyEvent.class)
	public void run() {

		try (MulticastSocket socket = new MulticastSocket(9001)) {

			SocketAddress group = new InetSocketAddress("230.185.192.108", 9001);
			NetworkInterface localNetwork = socket.getNetworkInterface();
			socket.joinGroup(group, localNetwork);

			while (true) {
				DatagramPacket packet = new DatagramPacket(buffer, buffer.length);
				socket.receive(packet);
				String senderIP = packet.getAddress().getHostAddress();
				System.out.println(senderIP);
				String received = new String(packet.getData(), 0, packet.getLength());
				System.out.println(received);
				if (received.equals("PlatformOceanDiscovery")) {
					// TODO: respond to request with name + IP location
					this.respondToServiceDiscovery(senderIP, localNetwork);

				}
			}

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
}
