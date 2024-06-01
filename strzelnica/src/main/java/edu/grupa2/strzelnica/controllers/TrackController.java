package edu.grupa2.strzelnica.controllers;

import edu.grupa2.strzelnica.dto.TrackDTO;
import edu.grupa2.strzelnica.services.TracksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/tracks")
public class TrackController {
    private final TracksService tracksService;

    @Autowired
    public TrackController(TracksService tracksService) {
        this.tracksService = tracksService;
    }

    // GET - Get all tracks from the database
    @GetMapping
    @ResponseBody
    public List<TrackDTO> getAllTracks() {
        return tracksService.getAllTracks();
    }

    // GET - Get specific track from the database
    @GetMapping("/{id}")
    public ResponseEntity<?> getTrackById(@PathVariable Integer id) {
        Optional<TrackDTO> optionalTrackDTO = tracksService.getTrackById(id);

        // Send the track if it exists
        if (optionalTrackDTO.isPresent()) {
            return ResponseEntity.ok(optionalTrackDTO.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"error_track_not_found\"}");
        }
    }

    // POST - Add a new track to the database
    @PostMapping("/add")
    public ResponseEntity<?> addTrack(@RequestBody TrackDTO trackDTO) {
        try {
            TrackDTO savedTrackDTO = tracksService.saveTrack(trackDTO);
            return ResponseEntity.ok().body("{\"message\": \"success_track_added_successfully\"}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\": \"Error adding track: " + e.getMessage() + "\"}");
        }
    }

    // PUT - Update an existing track
    @PutMapping("/edit/{id}")
    public ResponseEntity<?> updateTrack(@PathVariable Integer id, @RequestBody TrackDTO updatedTrackDTO) {
        return tracksService.updateTrack(id, updatedTrackDTO);
    }

    // DELETE - Delete a track
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTrack(@PathVariable Integer id) {
        try {
            tracksService.deleteTrackById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\": \"Error deleting track: " + e.getMessage() + "\"}");
        }
    }
}