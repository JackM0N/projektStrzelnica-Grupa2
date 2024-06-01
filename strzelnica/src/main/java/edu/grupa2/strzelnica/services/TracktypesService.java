package edu.grupa2.strzelnica.services;

import edu.grupa2.strzelnica.dto.TracktypeDTO;
import edu.grupa2.strzelnica.models.Tracktype;
import edu.grupa2.strzelnica.repositories.TracktypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TracktypesService {
    private final TracktypeRepository tracktypeRepository;

    @Autowired
    public TracktypesService(TracktypeRepository tracktypeRepository) {
        this.tracktypeRepository = tracktypeRepository;
    }

    public List<TracktypeDTO> getAllTracktypes() {
        return tracktypeRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Optional<TracktypeDTO> getTracktypeById(Integer id) {
        Optional<Tracktype> optionalTracktype = tracktypeRepository.findById(id);
        return optionalTracktype.map(this::convertToDto);
    }

    public TracktypeDTO saveTracktype(TracktypeDTO tracktypeDTO) {
        Tracktype tracktype = convertToEntity(tracktypeDTO);
        Tracktype savedTracktype = tracktypeRepository.save(tracktype);
        return convertToDto(savedTracktype);
    }

    public ResponseEntity<TracktypeDTO> updateTracktype(Integer id, TracktypeDTO updatedTracktypeDTO) {
        Optional<Tracktype> optionalTracktype = tracktypeRepository.findById(id);

        if (optionalTracktype.isPresent()) {
            Tracktype existingTracktype = optionalTracktype.get();
            existingTracktype = updateEntityFromDto(existingTracktype, updatedTracktypeDTO);

            Tracktype savedTracktype = tracktypeRepository.save(existingTracktype);
            return new ResponseEntity<>(convertToDto(savedTracktype), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public void deleteTracktypeById(Integer id) {
        tracktypeRepository.deleteById(id);
    }

    private TracktypeDTO convertToDto(Tracktype tracktype) {
        TracktypeDTO tracktypeDTO = new TracktypeDTO();
        tracktypeDTO.setId(tracktype.getId());
        tracktypeDTO.setName(tracktype.getName());
        return tracktypeDTO;
    }

    private Tracktype convertToEntity(TracktypeDTO tracktypeDTO) {
        Tracktype tracktype = new Tracktype();
        tracktype.setId(tracktypeDTO.getId());
        tracktype.setName(tracktypeDTO.getName());
        return tracktype;
    }

    private Tracktype updateEntityFromDto(Tracktype tracktype, TracktypeDTO tracktypeDTO) {
        tracktype.setName(tracktypeDTO.getName());
        return tracktype;
    }
}