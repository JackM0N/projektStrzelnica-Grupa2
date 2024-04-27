package edu.grupa2.strzelnica.repositories;

import edu.grupa2.strzelnica.models.Userrole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserroleRepository extends JpaRepository<Userrole, Long>{
}
