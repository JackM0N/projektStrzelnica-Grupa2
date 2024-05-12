package edu.grupa2.strzelnica.repositories;

import edu.grupa2.strzelnica.models.ServiceAvailability;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ServiceAvailabilityRepository extends JpaRepository<ServiceAvailability, Integer> {
    List<ServiceAvailability> findByServiceId(Integer serviceId);
    Page<ServiceAvailability> findPaginatedByServiceId(Integer serviceId, Pageable pageable);
}
