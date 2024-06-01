package edu.grupa2.strzelnica.services;

import edu.grupa2.strzelnica.dto.ServiceDTO;
import edu.grupa2.strzelnica.dto.TracktypeDTO;
import edu.grupa2.strzelnica.models.Service;
import edu.grupa2.strzelnica.models.Tracktype;
import edu.grupa2.strzelnica.repositories.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
public class ServicesService {
    private final ServiceRepository serviceRepository;

    @Autowired
    public ServicesService(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    public List<ServiceDTO> getAllServices() {
        List<Service> services = serviceRepository.findAll();
        return services.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public Page<ServiceDTO> getPaginatedServices(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "id"));
        Page<Service> services = serviceRepository.findAll(pageable);
        return services.map(this::convertToDTO);
    }

    public Optional<ServiceDTO> getServiceById(Integer id) {
        Optional<Service> service = serviceRepository.findById(id);
        return service.map(this::convertToDTO);
    }

    public ServiceDTO saveService(ServiceDTO serviceDTO) {
        Service service = convertToEntity(serviceDTO);
        Service savedService = serviceRepository.save(service);
        return convertToDTO(savedService);
    }

    public ResponseEntity<ServiceDTO> updateService(Integer id, ServiceDTO updatedServiceDTO) {
        Optional<Service> optionalService = serviceRepository.findById(id);

        if (optionalService.isPresent()) {
            Service existingService = optionalService.get();
            existingService.setName(updatedServiceDTO.getName());
            existingService.setDescription(updatedServiceDTO.getDescription());
            existingService.setPrice(updatedServiceDTO.getPrice());
            existingService.setTracktype(convertToEntity(updatedServiceDTO.getTracktype()));

            Service savedService = serviceRepository.save(existingService);
            return new ResponseEntity<>(convertToDTO(savedService), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public void deleteServiceById(Integer id) {
        serviceRepository.deleteById(id);
    }

    private ServiceDTO convertToDTO(Service service) {
        ServiceDTO serviceDTO = new ServiceDTO();
        serviceDTO.setId(service.getId());
        serviceDTO.setName(service.getName());
        serviceDTO.setImage_url(service.getImage_url());
        serviceDTO.setDescription(service.getDescription());
        serviceDTO.setPrice(service.getPrice());
        serviceDTO.setTracktype(convertToDTO(service.getTracktype()));
        return serviceDTO;
    }

    private Service convertToEntity(ServiceDTO serviceDTO) {
        Service service = new Service();
        service.setId(serviceDTO.getId());
        service.setName(serviceDTO.getName());
        service.setImage_url(serviceDTO.getImage_url());
        service.setDescription(serviceDTO.getDescription());
        service.setPrice(serviceDTO.getPrice());
        service.setTracktype(convertToEntity(serviceDTO.getTracktype()));
        return service;
    }

    private TracktypeDTO convertToDTO(Tracktype tracktype) {
        TracktypeDTO dto = new TracktypeDTO();
        dto.setId(tracktype.getId());
        dto.setName(tracktype.getName());
        return dto;
    }

    private Tracktype convertToEntity(TracktypeDTO dto) {
        Tracktype tracktype = new Tracktype();
        tracktype.setId(dto.getId());
        tracktype.setName(dto.getName());
        return tracktype;
    }
}
