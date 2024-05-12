package edu.grupa2.strzelnica.services;

import edu.grupa2.strzelnica.repositories.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import edu.grupa2.strzelnica.models.Service;

import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
public class ServicesService {
    private final ServiceRepository serviceRepository;

    @Autowired
    public ServicesService(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    public List<Service> getAllServices() {
        return serviceRepository.findAll();
    }

    public Page<Service> getPaginatedServices(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "id"));
        return serviceRepository.findAll(pageable);
    }

    public Optional<Service> getServiceById(Integer id) {
        return serviceRepository.findById(id);
    }

    public Service saveService(Service service) {
        return serviceRepository.save(service);
    }

    public ResponseEntity<Service> updateService(Integer id, Service updatedService) {
        Optional<Service> optionalService = this.getServiceById(id);

        if (optionalService.isPresent()) {
            Service existingService = optionalService.get();
            existingService.setName(updatedService.getName());
            existingService.setDescription(updatedService.getDescription());

            Service savedService = this.saveService(existingService);
            return new ResponseEntity<>(savedService, HttpStatus.OK);

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public void deleteServiceById(Integer id) {
        serviceRepository.deleteById(id);
    }
}
