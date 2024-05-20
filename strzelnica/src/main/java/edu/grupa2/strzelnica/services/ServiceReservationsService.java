package edu.grupa2.strzelnica.services;

import edu.grupa2.strzelnica.models.ServiceReservation;
import edu.grupa2.strzelnica.repositories.ServiceReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ServiceReservationsService {
    private final ServiceReservationRepository serviceReservationRepository;

    @Autowired
    public ServiceReservationsService(ServiceReservationRepository serviceReservationRepository) {
        this.serviceReservationRepository = serviceReservationRepository;
    }

    public Page<ServiceReservation> getPaginatedServiceReservations(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "id"));
        return serviceReservationRepository.findAll(pageable);
    }

    public Page<ServiceReservation> getPaginatedServiceReservationsByServiceId(Integer serviceId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "id"));
        return serviceReservationRepository.findPaginatedByServiceId(serviceId, pageable);
    }

    public List<ServiceReservation> getServiceReservationsByServiceId(Integer serviceId) {
        return serviceReservationRepository.findByServiceId(serviceId);
    }

    public Optional<ServiceReservation> getServiceReservationById(Integer id) {
        return serviceReservationRepository.findById(id);
    }

    public ServiceReservation saveServiceReservation(ServiceReservation serviceReservation) {
        return serviceReservationRepository.save(serviceReservation);
    }

    public ResponseEntity<ServiceReservation> updateServiceReservation(Integer id, ServiceReservation updatedServiceReservation) {
        Optional<ServiceReservation> optionalServiceReservation = this.getServiceReservationById(id);

        if (optionalServiceReservation.isPresent()) {
            ServiceReservation existingServiceReservation = optionalServiceReservation.get();
            existingServiceReservation.setService(updatedServiceReservation.getService());
            existingServiceReservation.setDate(updatedServiceReservation.getDate());
            existingServiceReservation.setStart_time(updatedServiceReservation.getStart_time());
            existingServiceReservation.setEnd_time(updatedServiceReservation.getEnd_time());
            existingServiceReservation.setPrice(updatedServiceReservation.getPrice());
            existingServiceReservation.setTrack(updatedServiceReservation.getTrack());

            ServiceReservation savedServiceReservation = this.saveServiceReservation(existingServiceReservation);
            return new ResponseEntity<>(savedServiceReservation, HttpStatus.OK);

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public void deleteServiceReservationById(Integer id) {
        serviceReservationRepository.deleteById(id);
    }
}
