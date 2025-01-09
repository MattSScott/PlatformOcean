package platform_ocean.Service.Surfer;

import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import platform_ocean.Entities.Surfer.Surfer;
import platform_ocean.Entities.Surfer.SurferRegistrationRequest;

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

	UUID registerSurfer(SurferRegistrationRequest request, boolean promote) throws UsernameExistsException;

	UUID registerOwner(SurferRegistrationRequest request) throws OwnerExistsException, UsernameExistsException;

	Surfer retrieveSurfer(String username, String password)
			throws EntityNotFoundException, PasswordMatchFailureException;

	Map<UUID, String> retrieveAllSurfers();
}
