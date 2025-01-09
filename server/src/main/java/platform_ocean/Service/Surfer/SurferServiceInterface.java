package platform_ocean.Service.Surfer;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import platform_ocean.Entities.Surfer.Surfer;
import platform_ocean.Entities.Surfer.SurferRegistrationRequest;

import java.util.Map;
import java.util.UUID;

@Service
public interface SurferServiceInterface {

    class PasswordMatchFailureException extends Exception {
        private static final long serialVersionUID = 1L;

        public PasswordMatchFailureException() {
        }

        public PasswordMatchFailureException(String message) {
            super(message);
        }
    }

    class OwnerExistsException extends Exception {
        private static final long serialVersionUID = 1L;

        public OwnerExistsException() {
        }

        public OwnerExistsException(String message) {
            super(message);
        }
    }

    class UsernameExistsException extends Exception {
        private static final long serialVersionUID = 1L;

        public UsernameExistsException() {
        }

        public UsernameExistsException(String message) {
            super(message);
        }
    }

    Surfer registerSurfer(SurferRegistrationRequest request, boolean promote) throws UsernameExistsException;

    Surfer registerOwner(SurferRegistrationRequest request) throws OwnerExistsException, UsernameExistsException;

    Surfer retrieveSurfer(String username, String password)
            throws EntityNotFoundException, PasswordMatchFailureException;

    Map<UUID, String> retrieveAllSurfers();
}
