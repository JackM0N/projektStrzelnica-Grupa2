package edu.grupa2.strzelnica.services;

import edu.grupa2.strzelnica.dto.ServiceDTO;
import edu.grupa2.strzelnica.dto.ServiceReservationDTO;
import edu.grupa2.strzelnica.dto.TrackDTO;
import edu.grupa2.strzelnica.dto.TracktypeDTO;
import edu.grupa2.strzelnica.models.DateAvailability;
import edu.grupa2.strzelnica.models.Service;
import edu.grupa2.strzelnica.models.ServiceReservation;
import edu.grupa2.strzelnica.models.Track;
import edu.grupa2.strzelnica.models.Tracktype;
import edu.grupa2.strzelnica.repositories.ServiceReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.sql.Time;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
public class ServiceReservationsService {
    @Autowired
    private ServiceReservationRepository serviceReservationRepository;

    @Autowired
    private AvailabilityService availabilityService;

    @Autowired
    public ServiceReservationsService(ServiceReservationRepository serviceReservationRepository) {
        this.serviceReservationRepository = serviceReservationRepository;
    }

    public Page<ServiceReservationDTO> getPaginatedServiceReservations(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "id"));
        Page<ServiceReservation> serviceReservations = serviceReservationRepository.findAll(pageable);
        return serviceReservations.map(this::convertToDTO);
    }

    public Page<ServiceReservationDTO> getPaginatedServiceReservationsByServiceId(Integer serviceId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "id"));
        Page<ServiceReservation> serviceReservations = serviceReservationRepository.findPaginatedByServiceId(serviceId, pageable);
        return serviceReservations.map(this::convertToDTO);
    }

    public List<ServiceReservationDTO> getServiceReservationsByServiceId(Integer serviceId) {
        List<ServiceReservation> serviceReservations = serviceReservationRepository.findByServiceId(serviceId);
        return serviceReservations.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public Optional<ServiceReservationDTO> getServiceReservationById(Integer id) {
        Optional<ServiceReservation> serviceReservation = serviceReservationRepository.findById(id);
        return serviceReservation.map(this::convertToDTO);
    }

    public ServiceReservationDTO saveServiceReservation(ServiceReservationDTO serviceReservationDTO) throws Exception {
        ServiceReservation serviceReservation = convertToEntity(serviceReservationDTO);

        if (isReservationConflict(serviceReservation)) {
            throw new Exception("A reservation already exists for the selected time and track.");
        }

        if (!isAvailabilityAvailable(serviceReservation)) {
            throw new Exception("The selected time and track are not available.");
        }

        ServiceReservation savedServiceReservation = serviceReservationRepository.save(serviceReservation);
        return convertToDTO(savedServiceReservation);
    }

    private boolean isReservationConflict(ServiceReservation serviceReservation) {
        List<ServiceReservation> existingReservations = serviceReservationRepository.findByDateAndStartTimeAndTrack(
                serviceReservation.getDate(), serviceReservation.getStartTime(), serviceReservation.getTrack()
        );
        return !existingReservations.isEmpty();
    }

    private boolean isAvailabilityAvailable(ServiceReservation serviceReservation) {
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

    public ResponseEntity<ServiceReservationDTO> updateServiceReservation(Integer id, ServiceReservationDTO updatedServiceReservationDTO) throws Exception {
        Optional<ServiceReservation> optionalServiceReservation = serviceReservationRepository.findById(id);

        if (optionalServiceReservation.isPresent()) {
            ServiceReservation existingServiceReservation = optionalServiceReservation.get();
            existingServiceReservation.setService(convertToEntity(updatedServiceReservationDTO.getService()));
            existingServiceReservation.setDate(updatedServiceReservationDTO.getDate());
            existingServiceReservation.setStartTime(updatedServiceReservationDTO.getStartTime());
            existingServiceReservation.setEnd_time(updatedServiceReservationDTO.getEnd_time());
            existingServiceReservation.setPrice(updatedServiceReservationDTO.getPrice());
            existingServiceReservation.setTrack(convertToEntity(updatedServiceReservationDTO.getTrack()));

            ServiceReservation savedServiceReservation = serviceReservationRepository.save(existingServiceReservation);
            return new ResponseEntity<>(convertToDTO(savedServiceReservation), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public void deleteServiceReservationById(Integer id) {
        serviceReservationRepository.deleteById(id);
    }

    private ServiceReservationDTO convertToDTO(ServiceReservation serviceReservation) {
        ServiceReservationDTO dto = new ServiceReservationDTO();
        dto.setId(serviceReservation.getId());
        dto.setService(convertToDTO(serviceReservation.getService()));
        dto.setDate(serviceReservation.getDate());
        dto.setStartTime(serviceReservation.getStartTime());
        dto.setEnd_time(serviceReservation.getEnd_time());
        dto.setPrice(serviceReservation.getPrice());
        dto.setTrack(convertToDTO(serviceReservation.getTrack()));
        return dto;
    }

    private ServiceReservation convertToEntity(ServiceReservationDTO dto) {
        ServiceReservation entity = new ServiceReservation();
        entity.setId(dto.getId());
        entity.setService(convertToEntity(dto.getService()));
        entity.setDate(dto.getDate());
        entity.setStartTime(dto.getStartTime());
        entity.setEnd_time(dto.getEnd_time());
        entity.setPrice(dto.getPrice());
        entity.setTrack(convertToEntity(dto.getTrack()));
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

    private TrackDTO convertToDTO(Track track) {
        TrackDTO dto = new TrackDTO();
        dto.setId(track.getId());
        dto.setType(convertToDTO(track.getType()));
        return dto;
    }

    private Track convertToEntity(TrackDTO dto) {
        Track track = new Track();
        track.setId(dto.getId());
        track.setType(convertToEntity(dto.getType()));
        return track;
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
