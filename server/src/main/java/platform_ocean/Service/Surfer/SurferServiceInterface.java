package platform_ocean.Service.Surfer;

import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import platform_ocean.Entities.Surfer.SurferRegistrationRequest;

@Service
public interface SurferServiceInterface {

	public class PasswordMatchFailureException extends Exception {
		private static final long serialVersionUID = 1L;

		public PasswordMatchFailureException() {
		}

		public PasswordMatchFailureException(String message) {
			super(message);
		}
	}

	public class OwnerExistsException extends Exception {
		private static final long serialVersionUID = 1L;

		public OwnerExistsException() {
		}

		public OwnerExistsException(String message) {
			super(message);
		}
	}

	public class UsernameExistsException extends Exception {
		private static final long serialVersionUID = 1L;

		public UsernameExistsException() {
		}

		public UsernameExistsException(String message) {
			super(message);
		}
	}

	public UUID registerSurfer(SurferRegistrationRequest request, boolean promote) throws UsernameExistsException;

	public UUID registerOwner(SurferRegistrationRequest request) throws OwnerExistsException, UsernameExistsException;

	public UUID retrieveSurfer(String username, String password)
			throws EntityNotFoundException, PasswordMatchFailureException;

	public Map<UUID, String> retrieveAllSurfers();
}
