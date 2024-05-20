package edu.grupa2.strzelnica.controllers;

import edu.grupa2.strzelnica.models.Tracktype;
import edu.grupa2.strzelnica.services.TracksService;
import edu.grupa2.strzelnica.services.TracktypesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@Controller
public class TracktypeController {
    private final TracktypesService tracktypesService;

    @Autowired
    public TracktypeController(TracktypesService tracktypesService) {
        this.tracktypesService = tracktypesService;
    }

    // GET - Get all tracktypes from the database
    @GetMapping("/tracktypes")
    @ResponseBody
    public List<Tracktype> getAllTracktypes() {
        return tracktypesService.getAllTracktypes();
    }

    // GET - Get specific tracktype from the database
    @GetMapping("/tracktypes/{id}")
    public ResponseEntity<?> getTrackById(@PathVariable Integer id) {
        Optional<Tracktype> optionalTracktype = tracktypesService.getTracktypeById(id);

        // Send the tracktype if it exists
        if (optionalTracktype.isPresent()) {
            return ResponseEntity.ok(optionalTracktype.get());

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"error_tracktype_not_found\"}");
        }
    }

    // POST - Add a new tracktype to the database
    @PostMapping("/tracktypes/add")
    public ResponseEntity<?> addTracktype(@RequestBody Tracktype tracktype) {
        try {
            tracktypesService.saveTracktype(tracktype);
            return ResponseEntity.ok().body("{\"message\": \"success_track_added_successfully\"}");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\": \"Error adding tracktype: " + e.getMessage() + "\"}");
        }
    }

    // PUT - Update an existing tracktype
    @PutMapping("/tracktypes/edit/{id}")
    public ResponseEntity<Tracktype> updateTracktype(@PathVariable Integer id, @RequestBody Tracktype updatedTracktype) {
        return tracktypesService.updateTracktype(id, updatedTracktype);
    }

    // DELETE - Delete a tracktype
    @DeleteMapping("/tracktypes/{id}")
    public ResponseEntity<?> deleteTracktype(@PathVariable Integer id) {
        try {
            tracktypesService.deleteTracktypeById(id);
            return ResponseEntity.ok().build();

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\": \"Error deleting tracktype: " + e.getMessage() + "\"}");
        }
    }
}