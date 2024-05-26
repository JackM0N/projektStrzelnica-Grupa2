package edu.grupa2.strzelnica.services;

import edu.grupa2.strzelnica.models.DateAvailability;
import edu.grupa2.strzelnica.models.ServiceReservation;
import edu.grupa2.strzelnica.models.Track;
import edu.grupa2.strzelnica.repositories.ServiceReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Time;
import java.util.List;
import java.util.Optional;

@Service
public class ServiceReservationsService {
    @Autowired
    private ServiceReservationRepository serviceReservationRepository;

    @Autowired
    private AvailabilityService availabilityService;

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

    public ServiceReservation saveServiceReservation(ServiceReservation serviceReservation) throws Exception {
        // Check if there is an existing reservation for the same time and track
        if (isReservationConflict(serviceReservation)) {
            throw new Exception("A reservation already exists for the selected time and track.");
        }

        // Check if the selected time and track are available
        if (!isAvailabilityAvailable(serviceReservation)) {
            throw new Exception("The selected time and track are not available.");
        }

        // Save the reservation
        return serviceReservationRepository.save(serviceReservation);
    }


    private boolean isReservationConflict(ServiceReservation serviceReservation) {
        // Check if there is an existing reservation for the same time and track
        List<ServiceReservation> existingReservations = serviceReservationRepository.findByDateAndStartTimeAndTrack(
                serviceReservation.getDate(), serviceReservation.getStartTime(), serviceReservation.getTrack()
        );
        return !existingReservations.isEmpty();
    }

    private boolean isAvailabilityAvailable(ServiceReservation serviceReservation) {
        // Check if the selected time and track are available
        List<DateAvailability> availableSlots = availabilityService.getAvailableSlots(serviceReservation.getService().getId());

        Date reservationDate = serviceReservation.getDate();
        Time reservationStartTime = serviceReservation.getStartTime();
        Track reservationTrack = serviceReservation.getTrack();

        for (DateAvailability availableSlot : availableSlots) {
            if ( availableSlot.getDate().compareTo(reservationDate) == 0 &&
                    availableSlot.getStartTime().compareTo(String.valueOf(reservationStartTime)) == 0 &&
                    availableSlot.getTrack().getId().equals(reservationTrack.getId())
            ) {
                return true;
            }
        }
        return false;
    }

    public ResponseEntity<ServiceReservation> updateServiceReservation(Integer id, ServiceReservation updatedServiceReservation) throws Exception {
        Optional<ServiceReservation> optionalServiceReservation = this.getServiceReservationById(id);

        if (optionalServiceReservation.isPresent()) {
            ServiceReservation existingServiceReservation = optionalServiceReservation.get();
            existingServiceReservation.setService(updatedServiceReservation.getService());
            existingServiceReservation.setDate(updatedServiceReservation.getDate());
            existingServiceReservation.setStartTime(updatedServiceReservation.getStartTime());
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
