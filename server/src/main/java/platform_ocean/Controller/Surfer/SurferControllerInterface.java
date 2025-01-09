package platform_ocean.Controller.Surfer;

import java.util.Map;
import java.util.UUID;

import org.springframework.http.ResponseEntity;

import platform_ocean.Entities.Surfer.SurferRegistrationRequest;

public interface SurferControllerInterface {

	ResponseEntity<UUID> registerSurfer(SurferRegistrationRequest request);

	ResponseEntity<UUID> registerOwner(SurferRegistrationRequest request);

	ResponseEntity<SimplifiedSurferData> retrieveSurfer(SurferRegistrationRequest request);

	ResponseEntity<Map<UUID, String>> retrieveAllSurfers();
}
