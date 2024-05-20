package edu.grupa2.strzelnica.controllers;

import edu.grupa2.strzelnica.models.Track;
import edu.grupa2.strzelnica.services.TracksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@Controller
public class TrackController {
    private final TracksService tracksService;

    @Autowired
    public TrackController(TracksService tracksService) {
        this.tracksService = tracksService;
    }

    // GET - Get all tracks from the database
    @GetMapping("/tracks")
    @ResponseBody
    public List<Track> getAllTracks() {
        return tracksService.getAllTracks();
    }

    // GET - Get specific tracks from the database
    @GetMapping("/tracks/{id}")
    public ResponseEntity<?> getTrackById(@PathVariable Integer id) {
        Optional<Track> optionalTrack = tracksService.getTrackById(id);

        // Send the track if it exists
        if (optionalTrack.isPresent()) {
            return ResponseEntity.ok(optionalTrack.get());

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"error_track_not_found\"}");
        }
    }

    // POST - Add a new track to the database
    @PostMapping("/tracks/add")
    public ResponseEntity<?> addTrack(@RequestBody Track track) {
        try {
            tracksService.saveTrack(track);
            return ResponseEntity.ok().body("{\"message\": \"success_track_added_successfully\"}");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\": \"Error adding track: " + e.getMessage() + "\"}");
        }
    }

    // PUT - Update an existing track
    @PutMapping("/tracks/edit/{id}")
    public ResponseEntity<Track> updateTrack(@PathVariable Integer id, @RequestBody Track updatedTrack) {
        return tracksService.updateTrack(id, updatedTrack);
    }

    // DELETE - Delete a track
    @DeleteMapping("/tracks/{id}")
    public ResponseEntity<?> deleteTrack(@PathVariable Integer id) {
        try {
            tracksService.deleteTrackById(id);
            return ResponseEntity.ok().build();

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\": \"Error deleting track: " + e.getMessage() + "\"}");
        }
    }
}