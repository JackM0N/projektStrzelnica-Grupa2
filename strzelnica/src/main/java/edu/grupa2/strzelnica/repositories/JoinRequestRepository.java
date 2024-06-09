package edu.grupa2.strzelnica.repositories;

import edu.grupa2.strzelnica.models.JoinRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JoinRequestRepository extends JpaRepository<JoinRequest, Long> {
}
