package edu.grupa2.strzelnica.services;

import edu.grupa2.strzelnica.models.ServiceAvailability;
import edu.grupa2.strzelnica.models.ServiceUnavailability;
import edu.grupa2.strzelnica.repositories.ServiceUnavailabilityRepository;
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
public class ServiceUnavailabilitiesService {
    private final ServiceUnavailabilityRepository serviceUnavailabilityRepository;

    @Autowired
    public ServiceUnavailabilitiesService(ServiceUnavailabilityRepository serviceUnavailabilityRepository) {
        this.serviceUnavailabilityRepository = serviceUnavailabilityRepository;
    }

    public Page<ServiceUnavailability> getPaginatedServiceUnavailabilitiesByServiceId(Integer serviceId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "id"));
        return serviceUnavailabilityRepository.findPaginatedByServiceId(serviceId, pageable);
    }

    public List<ServiceUnavailability> getServiceUnavailabilitiesByServiceId(Integer serviceId) {
        return serviceUnavailabilityRepository.findByServiceId(serviceId);
    }

    public Optional<ServiceUnavailability> getServiceUnavailabilityById(Integer id) {
        return serviceUnavailabilityRepository.findById(id);
    }

    public ServiceUnavailability saveServiceUnavailability(ServiceUnavailability serviceUnavailability) {
        return serviceUnavailabilityRepository.save(serviceUnavailability);
    }

    public ResponseEntity<ServiceUnavailability> updateServiceUnavailability(Integer id, ServiceUnavailability updatedServiceUnavailability) {
        Optional<ServiceUnavailability> optionalServiceUnavailability = this.getServiceUnavailabilityById(id);

        if (optionalServiceUnavailability.isPresent()) {
            ServiceUnavailability existingServiceUnavailability = optionalServiceUnavailability.get();
            existingServiceUnavailability.setServiceId(updatedServiceUnavailability.getServiceId());
            existingServiceUnavailability.setStart_date(updatedServiceUnavailability.getStart_date());
            existingServiceUnavailability.setEnd_date(updatedServiceUnavailability.getEnd_date());
            existingServiceUnavailability.setStart_time(updatedServiceUnavailability.getStart_time());
            existingServiceUnavailability.setEnd_time(updatedServiceUnavailability.getEnd_time());

            ServiceUnavailability savedServiceUnavailability = this.saveServiceUnavailability(existingServiceUnavailability);
            return new ResponseEntity<>(savedServiceUnavailability, HttpStatus.OK);

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public void deleteServiceUnavailabilityById(Integer id) {
        serviceUnavailabilityRepository.deleteById(id);
    }
}
