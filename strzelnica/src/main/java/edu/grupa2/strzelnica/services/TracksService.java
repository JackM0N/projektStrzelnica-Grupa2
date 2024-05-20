package edu.grupa2.strzelnica.services;

import edu.grupa2.strzelnica.models.Track;
import edu.grupa2.strzelnica.repositories.TrackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
public class TracksService {
    private final TrackRepository trackRepository;

    @Autowired
    public TracksService(TrackRepository serviceRepository) {
        this.trackRepository = serviceRepository;
    }

    public List<Track> getAllTracks() {
        return trackRepository.findAll();
    }

    public Optional<Track> getTrackById(Integer id) {
        return trackRepository.findById(id);
    }

    public Track saveTrack(Track track) {
        return trackRepository.save(track);
    }

    public ResponseEntity<Track> updateTrack(Integer id, Track updatedTrack) {
        Optional<Track> optionalTrack = this.getTrackById(id);

        if (optionalTrack.isPresent()) {
            Track existingTrack = optionalTrack.get();
            existingTrack.setType(updatedTrack.getType());

            Track savedTrack = this.saveTrack(existingTrack);
            return new ResponseEntity<>(savedTrack, HttpStatus.OK);

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public void deleteTrackById(Integer id) {
        trackRepository.deleteById(id);
    }
}
