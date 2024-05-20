package edu.grupa2.strzelnica.services;

import edu.grupa2.strzelnica.models.Tracktype;
import edu.grupa2.strzelnica.repositories.TracktypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
public class TracktypesService {
    private final TracktypeRepository tracktypeRepository;

    @Autowired
    public TracktypesService(TracktypeRepository tracktypeRepository) {
        this.tracktypeRepository = tracktypeRepository;
    }

    public List<Tracktype> getAllTracktypes() {
        return tracktypeRepository.findAll();
    }

    public Optional<Tracktype> getTracktypeById(Integer id) {
        return tracktypeRepository.findById(id);
    }

    public Tracktype saveTracktype(Tracktype track) {
        return tracktypeRepository.save(track);
    }

    public ResponseEntity<Tracktype> updateTracktype(Integer id, Tracktype updatedTracktype) {
        Optional<Tracktype> optionalTracktype = this.getTracktypeById(id);

        if (optionalTracktype.isPresent()) {
            Tracktype existingTrack = optionalTracktype.get();
            existingTrack.setName(updatedTracktype.getName());

            Tracktype savedTracktype = this.saveTracktype(existingTrack);
            return new ResponseEntity<>(savedTracktype, HttpStatus.OK);

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public void deleteTracktypeById(Integer id) {
        tracktypeRepository.deleteById(id);
    }
}
