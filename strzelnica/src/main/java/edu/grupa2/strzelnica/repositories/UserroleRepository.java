package edu.grupa2.strzelnica.repositories;

import edu.grupa2.strzelnica.models.Role;
import edu.grupa2.strzelnica.models.Userrole;
import edu.grupa2.strzelnica.models.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserroleRepository extends JpaRepository<Userrole, Long>{
    List<Userrole> findByUser(Users user);
    Userrole findByUserAndRole(Users user, Role role);
}
