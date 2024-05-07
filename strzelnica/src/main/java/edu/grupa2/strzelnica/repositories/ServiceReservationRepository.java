package edu.grupa2.strzelnica.repositories;

import edu.grupa2.strzelnica.models.ServiceReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceReservationRepository extends JpaRepository<ServiceReservation, Integer> {
}
