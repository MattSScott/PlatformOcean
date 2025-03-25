package platform_ocean.Service.Surfer;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import platform_ocean.Config.Surfer.SurferPasswordEncoder;
import platform_ocean.Entities.Surfer.Surfer;
import platform_ocean.Entities.Surfer.SurferRegistrationRequest;
import platform_ocean.Repository.Surfer.SurferRepository;

import java.util.*;

@Service
public class SurferService implements SurferServiceInterface, UserDetailsService {

    @Autowired
    private SurferRepository surferRepo;

    @Autowired
    private SurferPasswordEncoder encoder;

    public long getNumSurfers() {
        return surferRepo.count();
    }

    @Override
    public Surfer registerSurfer(SurferRegistrationRequest request, boolean promote) throws UsernameExistsException {

        boolean nameTaken = surferRepo.findByUsername(request.getUsername()).isPresent();
//		final String RESPONSE_PAYLOAD = "{'response':'%s'}";

        if (nameTaken) {
            throw new UsernameExistsException("Username already exists");
        }

        String requestedPassword = request.getPassword();
        String encodedPass = encoder.getEncoder().encode(requestedPassword);

        Surfer deployedSurfer = new Surfer();

        deployedSurfer.setUsername(request.getUsername());
        deployedSurfer.setPassword(encodedPass);

        if (promote) {
            deployedSurfer.elevatePrivileges();
        }

        surferRepo.save(deployedSurfer);
        return deployedSurfer;
    }

    @Override
    public Surfer retrieveSurfer(String username, String password)
            throws EntityNotFoundException, PasswordMatchFailureException {

        Surfer request = surferRepo.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("Username not found. Try registering instead."));
        String encodedPass = request.getPassword();
        boolean isMatch = encoder.getEncoder().matches(password, encodedPass);
        if (!isMatch) {
            throw new PasswordMatchFailureException("Password not recognised.");
        }
        return request;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws EntityNotFoundException {
        Optional<Surfer> request = surferRepo.findByUsername(username);
        return request.orElseThrow(() -> new EntityNotFoundException("Username not found. Try registering instead."));
    }

    @Override
    public Surfer registerOwner(SurferRegistrationRequest request) throws OwnerExistsException, UsernameExistsException {
        Surfer.Role ownerRole = Surfer.Role.OWNER;
        Optional<Surfer> ownerRequest = surferRepo.findByRole(ownerRole);
        if (ownerRequest.isPresent()) {
            String existingOwner = ownerRequest.get().getUsername();
            throw new OwnerExistsException("Owner role exists with name: " + existingOwner);
        }
        return registerSurfer(request, true);
    }

    @Override
    public Map<UUID, String> retrieveAllSurfers() {
        List<Surfer> allSurfers = surferRepo.findAll();
        Map<UUID, String> idNamePairs = new HashMap<>();

        for (Surfer s : allSurfers) {
            idNamePairs.put(s.getUserID(), s.getUsername());
        }

        return idNamePairs;

    }

}
