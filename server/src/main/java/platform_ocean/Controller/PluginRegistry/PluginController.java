package platform_ocean.Controller.PluginRegistry;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import platform_ocean.Entities.PluginRegistry.PluginStore;
import platform_ocean.Service.PluginRegistry.PluginService;

@RestController
@RequestMapping("/plugins")
public class PluginController implements PluginControllerInterface {

	@Autowired
	private PluginService serv;

	@Override
	@PostMapping("/add")
	@ResponseBody
	public UUID registerPlugin(@RequestBody PluginStore plug) {
		return serv.registerPlugin(plug);
	}

	@Override
	@GetMapping("/get")
	@ResponseBody
	public List<UUID> retrievePlugins() {
		return serv.retrievePluginKeys();
	}

}
