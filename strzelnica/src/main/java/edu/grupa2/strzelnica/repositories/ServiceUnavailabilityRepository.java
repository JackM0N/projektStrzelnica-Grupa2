package edu.grupa2.strzelnica.repositories;

import edu.grupa2.strzelnica.models.ServiceUnavailability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceUnavailabilityRepository extends JpaRepository<ServiceUnavailability, Integer> {
    List<ServiceUnavailability> findByServiceId(Integer serviceId);
}
