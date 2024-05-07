package edu.grupa2.strzelnica.services;

import edu.grupa2.strzelnica.models.ServiceUnavailability;
import edu.grupa2.strzelnica.repositories.ServiceUnavailabilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
