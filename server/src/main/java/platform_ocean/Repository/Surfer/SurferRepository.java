package platform_ocean.Repository.Surfer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import platform_ocean.Entities.Surfer.Surfer;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SurferRepository extends JpaRepository<Surfer, UUID> {

    Optional<Surfer> findDistinctByUsernameAndPassword(String username, String password);

    Optional<Surfer> findByUsername(String username);

    Optional<Surfer> findByRole(Surfer.Role role);

    @Override
    List<Surfer> findAll();
}