package platform_ocean.Controller.Surfer;

import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.persistence.EntityNotFoundException;
import platform_ocean.Entities.Surfer.SurferRegistrationRequest;
import platform_ocean.Service.Surfer.SurferService;
import platform_ocean.Service.Surfer.SurferServiceInterface.OwnerExistsException;
import platform_ocean.Service.Surfer.SurferServiceInterface.PasswordMatchFailureException;
import platform_ocean.Service.Surfer.SurferServiceInterface.UsernameExistsException;

@Controller
@CrossOrigin
@RequestMapping("/registry")
public class SurferController {

	@Autowired
	private SurferService surferService;

//	@Autowired
//	private ObjectMapper om;

	@PostMapping("/add")
	@ResponseBody
	public UUID registerSurfer(@RequestBody SurferRegistrationRequest request) throws UsernameExistsException {
		UUID response = surferService.registerSurfer(request, false);
		return response;
//		return om.writeValueAsString(response);
	}

	@PostMapping("/own")
	@ResponseBody
	public UUID registerOwner(@RequestBody SurferRegistrationRequest request)
			throws OwnerExistsException, UsernameExistsException {
		return surferService.registerOwner(request);
	}

	@PostMapping("/get")
	@ResponseBody
	public UUID retrieveSurfer(@RequestBody SurferRegistrationRequest request)
			throws EntityNotFoundException, PasswordMatchFailureException {
		return surferService.retrieveSurfer(request.getUsername(), request.getPassword());
	}

	@GetMapping("/getAll")
	@ResponseBody
	public Map<UUID, String> retrieveAllSurfers() {
		return surferService.retrieveAllSurfers();
	}
}
