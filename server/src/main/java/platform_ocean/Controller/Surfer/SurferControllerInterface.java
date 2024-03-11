package platform_ocean.Controller.Surfer;

import java.util.Map;
import java.util.UUID;

import org.springframework.http.ResponseEntity;

import platform_ocean.Entities.Surfer.SurferRegistrationRequest;

public interface SurferControllerInterface {

	public ResponseEntity<UUID> registerSurfer(SurferRegistrationRequest request);

	public ResponseEntity<UUID> registerOwner(SurferRegistrationRequest request);

	public ResponseEntity<UUID> retrieveSurfer(SurferRegistrationRequest request);

	public ResponseEntity<Map<UUID, String>> retrieveAllSurfers();
}
