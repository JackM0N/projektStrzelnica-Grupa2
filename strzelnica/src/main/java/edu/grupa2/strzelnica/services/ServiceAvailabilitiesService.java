package edu.grupa2.strzelnica.services;

import edu.grupa2.strzelnica.dto.ServiceAvailabilityDTO;
import edu.grupa2.strzelnica.dto.ServiceDTO;
import edu.grupa2.strzelnica.dto.TracktypeDTO;
import edu.grupa2.strzelnica.models.Service;
import edu.grupa2.strzelnica.models.ServiceAvailability;
import edu.grupa2.strzelnica.models.Tracktype;
import edu.grupa2.strzelnica.repositories.ServiceAvailabilityRepository;
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
public class ServiceAvailabilitiesService {
    private final ServiceAvailabilityRepository serviceAvailabilityRepository;
    private final ServiceRepository serviceRepository;

    @Autowired
    public ServiceAvailabilitiesService(ServiceAvailabilityRepository serviceAvailabilityRepository, ServiceRepository serviceRepository) {
        this.serviceAvailabilityRepository = serviceAvailabilityRepository;
        this.serviceRepository = serviceRepository;
    }

    public Page<ServiceAvailabilityDTO> getPaginatedServiceAvailabilitiesByServiceId(Integer serviceId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "id"));
        Page<ServiceAvailability> serviceAvailabilities = serviceAvailabilityRepository.findPaginatedByServiceId(serviceId, pageable);
        return serviceAvailabilities.map(this::convertToDTO);
    }

    public List<ServiceAvailabilityDTO> getServiceAvailabilitiesByServiceId(Integer serviceId) {
        List<ServiceAvailability> serviceAvailabilities = serviceAvailabilityRepository.findByServiceId(serviceId);
        return serviceAvailabilities.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public ServiceAvailabilityDTO saveServiceAvailability(ServiceAvailabilityDTO serviceAvailabilityDTO) {
        ServiceAvailability serviceAvailability = convertToEntity(serviceAvailabilityDTO);
        ServiceAvailability savedServiceAvailability = serviceAvailabilityRepository.save(serviceAvailability);
        return convertToDTO(savedServiceAvailability);
    }

    public ResponseEntity<ServiceAvailabilityDTO> updateServiceAvailability(Integer id, ServiceAvailabilityDTO updatedServiceAvailabilityDTO) {
        Optional<ServiceAvailability> optionalServiceAvailability = serviceAvailabilityRepository.findById(id);

        if (optionalServiceAvailability.isPresent()) {
            ServiceAvailability existingServiceAvailability = optionalServiceAvailability.get();
            Service service = getServiceEntity(updatedServiceAvailabilityDTO.getService().getId());

            if (service != null) {
                existingServiceAvailability.setService(service);
                existingServiceAvailability.setStart_date(updatedServiceAvailabilityDTO.getStart_date());
                existingServiceAvailability.setEnd_date(updatedServiceAvailabilityDTO.getEnd_date());
                existingServiceAvailability.setService_day(updatedServiceAvailabilityDTO.getService_day());
                existingServiceAvailability.setService_time_start(updatedServiceAvailabilityDTO.getService_time_start());
                existingServiceAvailability.setService_time_end(updatedServiceAvailabilityDTO.getService_time_end());

                ServiceAvailability savedServiceAvailability = serviceAvailabilityRepository.save(existingServiceAvailability);
                return new ResponseEntity<>(convertToDTO(savedServiceAvailability), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public void deleteServiceAvailabilityById(Integer id) {
        serviceAvailabilityRepository.deleteById(id);
    }

    private ServiceAvailabilityDTO convertToDTO(ServiceAvailability serviceAvailability) {
        ServiceAvailabilityDTO dto = new ServiceAvailabilityDTO();
        dto.setId(serviceAvailability.getId());
        dto.setService(convertToServiceDTO(serviceAvailability.getService()));  // Convert Service to ServiceDTO
        dto.setStart_date(serviceAvailability.getStart_date());
        dto.setEnd_date(serviceAvailability.getEnd_date());
        dto.setService_time_start(serviceAvailability.getService_time_start());
        dto.setService_time_end(serviceAvailability.getService_time_end());
        dto.setService_day(serviceAvailability.getService_day());
        return dto;
    }

    private ServiceAvailability convertToEntity(ServiceAvailabilityDTO dto) {
        ServiceAvailability entity = new ServiceAvailability();
        entity.setId(dto.getId());
        entity.setService(getServiceEntity(dto.getService().getId()));  // Convert ServiceDTO to Service
        entity.setStart_date(dto.getStart_date());
        entity.setEnd_date(dto.getEnd_date());
        entity.setService_time_start(dto.getService_time_start());
        entity.setService_time_end(dto.getService_time_end());
        entity.setService_day(dto.getService_day());
        return entity;
    }

    private Service getServiceEntity(Integer serviceId) {
        return serviceRepository.findById(serviceId).orElse(null);
    }

    private ServiceDTO convertToServiceDTO(Service service) {
        ServiceDTO dto = new ServiceDTO();
        dto.setId(service.getId());
        dto.setName(service.getName());
        dto.setDescription(service.getDescription());
        dto.setImage_url(service.getImage_url());
        dto.setPrice(service.getPrice());
        dto.setTracktype(convertToTracktypeDTO(service.getTracktype()));
        return dto;
    }

    private TracktypeDTO convertToTracktypeDTO(Tracktype tracktype) {
        TracktypeDTO dto = new TracktypeDTO();
        dto.setId(tracktype.getId());
        dto.setName(tracktype.getName());
        return dto;
    }
}
