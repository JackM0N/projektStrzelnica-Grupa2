package edu.grupa2.strzelnica.repositories;

import edu.grupa2.strzelnica.models.ServiceReservation;
import edu.grupa2.strzelnica.models.ServiceUnavailability;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceUnavailabilityRepository extends JpaRepository<ServiceUnavailability, Integer> {
    List<ServiceUnavailability> findByServiceId(Integer serviceId);
    Page<ServiceUnavailability> findPaginatedByServiceId(Integer serviceId, Pageable pageable);
}
