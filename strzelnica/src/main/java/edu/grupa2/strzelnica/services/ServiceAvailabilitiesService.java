package edu.grupa2.strzelnica.services;

import edu.grupa2.strzelnica.models.ServiceAvailability;
import edu.grupa2.strzelnica.models.ServiceReservation;
import edu.grupa2.strzelnica.repositories.ServiceAvailabilityRepository;
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
public class ServiceAvailabilitiesService {
    private final ServiceAvailabilityRepository serviceAvailabilityRepository;

    @Autowired
    public ServiceAvailabilitiesService(ServiceAvailabilityRepository serviceAvailabilityRepository) {
        this.serviceAvailabilityRepository = serviceAvailabilityRepository;
    }

    public Page<ServiceAvailability> getPaginatedServiceAvailabilitiesByServiceId(Integer serviceId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "id"));
        return serviceAvailabilityRepository.findPaginatedByServiceId(serviceId, pageable);
    }

    public List<ServiceAvailability> getServiceAvailabilitiesByServiceId(Integer serviceId) {
        return serviceAvailabilityRepository.findByServiceId(serviceId);
    }

    public ServiceAvailability saveServiceAvailability(ServiceAvailability serviceAvailability) {
        return serviceAvailabilityRepository.save(serviceAvailability);
    }

    public ResponseEntity<ServiceAvailability> updateServiceAvailability(Integer id, ServiceAvailability updatedServiceAvailability) {
        Optional<ServiceAvailability> optionalServiceAvailability = serviceAvailabilityRepository.findById(id);

        if (optionalServiceAvailability.isPresent()) {
            ServiceAvailability existingServiceAvailability = optionalServiceAvailability.get();
            existingServiceAvailability.setService(updatedServiceAvailability.getService());
            existingServiceAvailability.setStart_date(updatedServiceAvailability.getStart_date());
            existingServiceAvailability.setEnd_date(updatedServiceAvailability.getEnd_date());
            existingServiceAvailability.setService_time_start(updatedServiceAvailability.getService_time_start());
            existingServiceAvailability.setService_time_end(updatedServiceAvailability.getService_time_end());

            ServiceAvailability savedServiceAvailability = this.saveServiceAvailability(existingServiceAvailability);
            return new ResponseEntity<>(savedServiceAvailability, HttpStatus.OK);

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public void deleteServiceAvailabilityById(Integer id) {
        serviceAvailabilityRepository.deleteById(id);
    }
}
