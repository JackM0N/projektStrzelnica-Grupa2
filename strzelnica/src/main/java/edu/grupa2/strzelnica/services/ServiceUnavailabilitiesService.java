package edu.grupa2.strzelnica.services;

import edu.grupa2.strzelnica.dto.ServiceDTO;
import edu.grupa2.strzelnica.dto.ServiceUnavailabilityDTO;
import edu.grupa2.strzelnica.dto.TracktypeDTO;
import edu.grupa2.strzelnica.models.Service;
import edu.grupa2.strzelnica.models.ServiceUnavailability;
import edu.grupa2.strzelnica.models.Tracktype;
import edu.grupa2.strzelnica.repositories.ServiceRepository;
import edu.grupa2.strzelnica.repositories.ServiceUnavailabilityRepository;
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
public class ServiceUnavailabilitiesService {
    private final ServiceUnavailabilityRepository serviceUnavailabilityRepository;
    private final ServiceRepository serviceRepository;

    @Autowired
    public ServiceUnavailabilitiesService(ServiceUnavailabilityRepository serviceUnavailabilityRepository, ServiceRepository serviceRepository) {
        this.serviceUnavailabilityRepository = serviceUnavailabilityRepository;
        this.serviceRepository = serviceRepository;
    }

    public Page<ServiceUnavailabilityDTO> getPaginatedServiceUnavailabilitiesByServiceId(Integer serviceId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "id"));
        Page<ServiceUnavailability> serviceUnavailabilities = serviceUnavailabilityRepository.findPaginatedByServiceId(serviceId, pageable);
        return serviceUnavailabilities.map(this::convertToDTO);
    }

    public List<ServiceUnavailabilityDTO> getServiceUnavailabilitiesByServiceId(Integer serviceId) {
        List<ServiceUnavailability> serviceUnavailabilities = serviceUnavailabilityRepository.findByServiceId(serviceId);
        return serviceUnavailabilities.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public Optional<ServiceUnavailabilityDTO> getServiceUnavailabilityById(Integer id) {
        Optional<ServiceUnavailability> serviceUnavailability = serviceUnavailabilityRepository.findById(id);
        return serviceUnavailability.map(this::convertToDTO);
    }

    public ServiceUnavailabilityDTO saveServiceUnavailability(ServiceUnavailabilityDTO serviceUnavailabilityDTO) {
        ServiceUnavailability serviceUnavailability = convertToEntity(serviceUnavailabilityDTO);
        ServiceUnavailability savedServiceUnavailability = serviceUnavailabilityRepository.save(serviceUnavailability);
        return convertToDTO(savedServiceUnavailability);
    }

    public ResponseEntity<ServiceUnavailabilityDTO> updateServiceUnavailability(Integer id, ServiceUnavailabilityDTO updatedServiceUnavailabilityDTO) {
        Optional<ServiceUnavailability> optionalServiceUnavailability = serviceUnavailabilityRepository.findById(id);

        if (optionalServiceUnavailability.isPresent()) {
            ServiceUnavailability existingServiceUnavailability = optionalServiceUnavailability.get();
            existingServiceUnavailability.setService(convertToEntity(updatedServiceUnavailabilityDTO.getService()));
            existingServiceUnavailability.setStart_date(updatedServiceUnavailabilityDTO.getStart_date());
            existingServiceUnavailability.setEnd_date(updatedServiceUnavailabilityDTO.getEnd_date());
            existingServiceUnavailability.setStart_time(updatedServiceUnavailabilityDTO.getStart_time());
            existingServiceUnavailability.setEnd_time(updatedServiceUnavailabilityDTO.getEnd_time());

            ServiceUnavailability savedServiceUnavailability = serviceUnavailabilityRepository.save(existingServiceUnavailability);
            return new ResponseEntity<>(convertToDTO(savedServiceUnavailability), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public void deleteServiceUnavailabilityById(Integer id) {
        serviceUnavailabilityRepository.deleteById(id);
    }

    private ServiceUnavailabilityDTO convertToDTO(ServiceUnavailability serviceUnavailability) {
        ServiceUnavailabilityDTO dto = new ServiceUnavailabilityDTO();
        dto.setId(serviceUnavailability.getId());
        dto.setService(convertToDTO(serviceUnavailability.getService()));
        dto.setStart_date(serviceUnavailability.getStart_date());
        dto.setEnd_date(serviceUnavailability.getEnd_date());
        dto.setStart_time(serviceUnavailability.getStart_time());
        dto.setEnd_time(serviceUnavailability.getEnd_time());
        return dto;
    }

    private ServiceUnavailability convertToEntity(ServiceUnavailabilityDTO dto) {
        ServiceUnavailability entity = new ServiceUnavailability();
        entity.setId(dto.getId());
        entity.setService(convertToEntity(dto.getService()));
        entity.setStart_date(dto.getStart_date());
        entity.setEnd_date(dto.getEnd_date());
        entity.setStart_time(dto.getStart_time());
        entity.setEnd_time(dto.getEnd_time());
        return entity;
    }

    private ServiceDTO convertToDTO(Service service) {
        ServiceDTO dto = new ServiceDTO();
        dto.setId(service.getId());
        dto.setName(service.getName());
        dto.setDescription(service.getDescription());
        dto.setPrice(service.getPrice());
        dto.setTracktype(convertToDTO(service.getTracktype()));
        return dto;
    }

    private Service convertToEntity(ServiceDTO dto) {
        Service service = new Service();
        service.setId(dto.getId());
        service.setName(dto.getName());
        service.setDescription(dto.getDescription());
        service.setPrice(dto.getPrice());
        service.setTracktype(convertToEntity(dto.getTracktype()));
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
