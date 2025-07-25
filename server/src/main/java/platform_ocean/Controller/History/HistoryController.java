package platform_ocean.Controller.History;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import platform_ocean.Entities.Messaging.DataMapper;
import platform_ocean.Entities.Messaging.MessageProtocol;
import platform_ocean.Entities.Messaging.SimpleDataMapper;
import platform_ocean.Service.Messaging.OceanService;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
public class HistoryController implements HistoryControllerInterface {

    @Autowired
    private OceanService serv;

    @Override
    @GetMapping("/history/{PluginKey}")
    public ResponseEntity<List<SimpleDataMapper>> retrieveDataHistory(@PathVariable("PluginKey") UUID pluginKey) {
        List<DataMapper> retrievedHistory = serv.retrieveMessagesByPlugin(pluginKey);

        List<SimpleDataMapper> clientKeyMessagePairs = new ArrayList<>();

        for (DataMapper dm : retrievedHistory) {
            SimpleDataMapper clientKeyMessageEntry = dm.castToSimpleDataMapper(MessageProtocol.PERSIST);
            clientKeyMessagePairs.add(clientKeyMessageEntry);
        }

        return ResponseEntity.status(HttpStatus.OK).body(clientKeyMessagePairs);
    }
}
