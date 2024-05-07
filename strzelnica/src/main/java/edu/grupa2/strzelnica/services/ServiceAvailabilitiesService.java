package edu.grupa2.strzelnica.services;

import edu.grupa2.strzelnica.models.ServiceAvailability;
import edu.grupa2.strzelnica.repositories.ServiceAvailabilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
            existingServiceAvailability.setServiceId(updatedServiceAvailability.getServiceId());

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
