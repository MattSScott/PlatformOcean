package platform_ocean.Controller.Surfer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import platform_ocean.Entities.Surfer.Surfer;
import platform_ocean.Entities.Surfer.SurferRegistrationRequest;
import platform_ocean.Service.Surfer.SurferService;
import platform_ocean.Service.Surfer.SurferServiceInterface.UsernameExistsException;

import java.util.Map;
import java.util.UUID;

@Controller
@CrossOrigin
@RequestMapping("/registry")
public class SurferController implements SurferControllerInterface {

    @Autowired
    private SurferService surferService;

    @PostMapping("/add")
    @ResponseBody
    public ResponseEntity<SimplifiedSurferData> registerSurfer(@RequestBody SurferRegistrationRequest request) {
        try {
            boolean onlySingleSurferExists = surferService.getNumSurfers() == 0;
            Surfer surferRequest = surferService.registerSurfer(request, onlySingleSurferExists);
            SimplifiedSurferData responseData = new SimplifiedSurferData(
                    surferRequest.getUserID(), surferRequest.getRole().toString(), !surferRequest.isAccountNonLocked()
            );
            return ResponseEntity.status(HttpStatus.CREATED).body(responseData);
        } catch (UsernameExistsException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @PostMapping("/own")
    @ResponseBody
    public ResponseEntity<SimplifiedSurferData> registerOwner(@RequestBody SurferRegistrationRequest request) {
        try {
            Surfer owner = surferService.registerOwner(request);
            SimplifiedSurferData responseData = new SimplifiedSurferData(
                    owner.getUserID(), owner.getRole().toString(), !owner.isAccountNonLocked()
            );
            return ResponseEntity.status(HttpStatus.CREATED).body(responseData);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @PostMapping("/get")
    @ResponseBody
    public ResponseEntity<SimplifiedSurferData> retrieveSurfer(@RequestBody SurferRegistrationRequest request) {
        try {
            Surfer surferRequest = surferService.retrieveSurfer(request.getUsername(), request.getPassword());
            SimplifiedSurferData responseData = new SimplifiedSurferData(
                    surferRequest.getUserID(), surferRequest.getRole().toString(), !surferRequest.isAccountNonLocked()
            );
            return ResponseEntity.status(HttpStatus.OK).body(responseData);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/getAll")
    @ResponseBody
    public ResponseEntity<Map<UUID, String>> retrieveAllSurfers() {
        Map<UUID, String> surfers = surferService.retrieveAllSurfers();
        return ResponseEntity.status(HttpStatus.OK).body(surfers);
    }
}
