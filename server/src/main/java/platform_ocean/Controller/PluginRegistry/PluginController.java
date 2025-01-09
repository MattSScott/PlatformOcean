package platform_ocean.Controller.PluginRegistry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import platform_ocean.Entities.PluginRegistry.PluginStore;
import platform_ocean.Service.PluginRegistry.PluginService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/plugins")
public class PluginController implements PluginControllerInterface {

    @Autowired
    private PluginService serv;

    @Autowired
    private SimpMessagingTemplate messageSender;

    @Override
    @PostMapping("/add")
    @ResponseBody
    public UUID registerPlugin(@RequestBody PluginStore plug) {
        UUID newKey = serv.registerPlugin(plug);
        messageSender.convertAndSend("/topic/newPlugins", serv.retrievePlugins());
        return newKey;
    }

    @Override
    @GetMapping("/get")
    @ResponseBody
    public List<PluginStore.PluginData> retrievePlugins() {
        return serv.retrievePlugins();
    }

}
