package platform_ocean.Controller.Discovery;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import platform_ocean.Config.NetworkWriter.ServerDetailsParser;

@Controller
public class Beacon {

    @GetMapping("/discover")
    @ResponseBody
    public ResponseEntity<String> detectServer() {
        System.out.println(ServerDetailsParser.getServerName());
        return ResponseEntity.status(HttpStatus.OK).body(ServerDetailsParser.getServerName());
    }

}
