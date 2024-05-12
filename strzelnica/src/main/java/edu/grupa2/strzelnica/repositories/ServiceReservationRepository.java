package edu.grupa2.strzelnica.repositories;

import edu.grupa2.strzelnica.models.ServiceReservation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ServiceReservationRepository extends JpaRepository<ServiceReservation, Integer> {
    List<ServiceReservation> findByServiceId(Integer serviceId);
    Page<ServiceReservation> findPaginatedByServiceId(Integer serviceId, Pageable pageable);
}
