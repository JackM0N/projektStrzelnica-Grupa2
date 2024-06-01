package edu.grupa2.strzelnica.controllers;

import edu.grupa2.strzelnica.dto.TracktypeDTO;
import edu.grupa2.strzelnica.services.TracktypesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/tracktypes")
public class TracktypeController {
    private final TracktypesService tracktypesService;

    @Autowired
    public TracktypeController(TracktypesService tracktypesService) {
        this.tracktypesService = tracktypesService;
    }

    // GET - Get all tracktypes from the database
    @GetMapping
    @ResponseBody
    public List<TracktypeDTO> getAllTracktypes() {
        return tracktypesService.getAllTracktypes();
    }

    // GET - Get specific tracktype from the database
    @GetMapping("/{id}")
    public ResponseEntity<?> getTracktypeById(@PathVariable Integer id) {
        Optional<TracktypeDTO> optionalTracktypeDTO = tracktypesService.getTracktypeById(id);

        // Send the tracktype if it exists
        if (optionalTracktypeDTO.isPresent()) {
            return ResponseEntity.ok(optionalTracktypeDTO.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"error_tracktype_not_found\"}");
        }
    }

    // POST - Add a new tracktype to the database
    @PostMapping("/add")
    public ResponseEntity<?> addTracktype(@RequestBody TracktypeDTO tracktypeDTO) {
        try {
            TracktypeDTO savedTracktypeDTO = tracktypesService.saveTracktype(tracktypeDTO);
            return ResponseEntity.ok().body("{\"message\": \"success_tracktype_added_successfully\"}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\": \"Error adding tracktype: " + e.getMessage() + "\"}");
        }
    }

    // PUT - Update an existing tracktype
    @PutMapping("/edit/{id}")
    public ResponseEntity<?> updateTracktype(@PathVariable Integer id, @RequestBody TracktypeDTO updatedTracktypeDTO) {
        return tracktypesService.updateTracktype(id, updatedTracktypeDTO);
    }

    // DELETE - Delete a tracktype
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTracktype(@PathVariable Integer id) {
        try {
            tracktypesService.deleteTracktypeById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\": \"Error deleting tracktype: " + e.getMessage() + "\"}");
        }
    }
}