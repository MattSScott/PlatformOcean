package platform_ocean.Controller.Surfer;

import org.springframework.http.ResponseEntity;
import platform_ocean.Entities.Surfer.SurferRegistrationRequest;

import java.util.Map;
import java.util.UUID;

public interface SurferControllerInterface {

    ResponseEntity<SimplifiedSurferData> registerSurfer(SurferRegistrationRequest request);

    ResponseEntity<SimplifiedSurferData> registerOwner(SurferRegistrationRequest request);

    ResponseEntity<SimplifiedSurferData> retrieveSurfer(SurferRegistrationRequest request);

    ResponseEntity<Map<UUID, String>> retrieveAllSurfers();
}
