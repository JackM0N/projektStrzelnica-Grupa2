package edu.grupa2.strzelnica.services;

import edu.grupa2.strzelnica.dto.TrackDTO;
import edu.grupa2.strzelnica.dto.TracktypeDTO;
import edu.grupa2.strzelnica.models.Track;
import edu.grupa2.strzelnica.models.Tracktype;
import edu.grupa2.strzelnica.repositories.TrackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TracksService {
    private final TrackRepository trackRepository;

    @Autowired
    public TracksService(TrackRepository trackRepository) {
        this.trackRepository = trackRepository;
    }

    public List<TrackDTO> getAllTracks() {
        return trackRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Optional<TrackDTO> getTrackById(Integer id) {
        Optional<Track> optionalTrack = trackRepository.findById(id);
        return optionalTrack.map(this::convertToDto);
    }

    public TrackDTO saveTrack(TrackDTO trackDTO) {
        Track track = convertToEntity(trackDTO);
        Track savedTrack = trackRepository.save(track);
        return convertToDto(savedTrack);
    }

    public ResponseEntity<TrackDTO> updateTrack(Integer id, TrackDTO updatedTrackDTO) {
        Optional<Track> optionalTrack = trackRepository.findById(id);

        if (optionalTrack.isPresent()) {
            Track existingTrack = optionalTrack.get();
            existingTrack = updateEntityFromDto(existingTrack, updatedTrackDTO);

            Track savedTrack = trackRepository.save(existingTrack);
            return new ResponseEntity<>(convertToDto(savedTrack), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public void deleteTrackById(Integer id) {
        trackRepository.deleteById(id);
    }

    private TrackDTO convertToDto(Track track) {
        TrackDTO trackDTO = new TrackDTO();
        trackDTO.setId(track.getId());
        trackDTO.setType(convertToDto(track.getType()));
        return trackDTO;
    }

    private Track convertToEntity(TrackDTO trackDTO) {
        Track track = new Track();
        track.setId(trackDTO.getId());
        track.setType(convertToEntity(trackDTO.getType()));
        return track;
    }

    private TracktypeDTO convertToDto(Tracktype tracktype) {
        edu.grupa2.strzelnica.dto.TracktypeDTO tracktypeDTO = new edu.grupa2.strzelnica.dto.TracktypeDTO();
        tracktypeDTO.setId(tracktype.getId());
        tracktypeDTO.setName(tracktype.getName());
        return tracktypeDTO;
    }

    private edu.grupa2.strzelnica.models.Tracktype convertToEntity(edu.grupa2.strzelnica.dto.TracktypeDTO tracktypeDTO) {
        edu.grupa2.strzelnica.models.Tracktype tracktype = new edu.grupa2.strzelnica.models.Tracktype();
        tracktype.setId(tracktypeDTO.getId());
        tracktype.setName(tracktypeDTO.getName());
        return tracktype;
    }

    private Track updateEntityFromDto(Track track, TrackDTO trackDTO) {
        track.setType(convertToEntity(trackDTO.getType()));
        return track;
    }
}