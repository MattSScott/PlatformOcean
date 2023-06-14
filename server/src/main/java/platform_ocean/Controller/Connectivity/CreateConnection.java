package platform_ocean.Controller.Connectivity;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@CrossOrigin
public class CreateConnection {

	@GetMapping("/connect")
	@ResponseBody
	public String whoami() {
		return "platform_ocean_server_active";
	}

}
