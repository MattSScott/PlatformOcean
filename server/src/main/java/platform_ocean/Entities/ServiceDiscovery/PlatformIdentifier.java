package platform_ocean.Entities.ServiceDiscovery;

import java.io.Serializable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import platform_ocean.Config.NetworkWriter.NetworkInfoStore;

@Component
public class PlatformIdentifier implements Serializable {
	
	@Autowired
	NetworkInfoStore infoStore;

	private static final long serialVersionUID = 1L;

	public final String platformOwner;

	public final String platformIP;

	public PlatformIdentifier() {

		platformOwner = "Matt";
		platformIP = "";
	}

}
