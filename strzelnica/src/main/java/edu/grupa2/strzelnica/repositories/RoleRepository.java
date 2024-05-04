package edu.grupa2.strzelnica.repositories;

import edu.grupa2.strzelnica.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String user);
}
