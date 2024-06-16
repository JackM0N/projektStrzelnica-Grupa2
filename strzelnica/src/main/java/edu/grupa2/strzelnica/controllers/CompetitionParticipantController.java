package edu.grupa2.strzelnica.controllers;

import edu.grupa2.strzelnica.dto.CompetitionParticipantDTO;
import edu.grupa2.strzelnica.services.CompetitionParticipantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/competitionparticipants")
public class CompetitionParticipantController {
    private final CompetitionParticipantService competitionParticipantService;

    @Autowired
    public CompetitionParticipantController(CompetitionParticipantService competitionParticipantService) {
        this.competitionParticipantService = competitionParticipantService;
    }

    // GET - Get paginated competition participants from the database
    @GetMapping
    @ResponseBody
    public Page<CompetitionParticipantDTO> getPaginatedCompetitionParticipants(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return competitionParticipantService.getPaginatedCompetitionParticipants(page, size);
    }

    // GET - Get all competition participants from the database
    @GetMapping("/all")
    @ResponseBody
    public List<CompetitionParticipantDTO> getAllCompetitionParticipants() {
        return competitionParticipantService.getAllCompetitionParticipants();
    }

    // GET - Get specific competition participant from the database
    @GetMapping("/{id}")
    public ResponseEntity<?> getCompetitionParticipantById(@PathVariable Integer id) {
        Optional<CompetitionParticipantDTO> optionalCompetitionParticipant = competitionParticipantService.getCompetitionParticipantById(id);

        // Send the competition participant if it exists
        if (optionalCompetitionParticipant.isPresent()) {
            return ResponseEntity.ok(optionalCompetitionParticipant.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"error_competition_participant_not_found\"}");
        }
    }

    // POST - Add a new competition participant to the database
    @PostMapping("/add")
    public ResponseEntity<?> addCompetitionParticipant(@RequestBody CompetitionParticipantDTO competitionParticipantDTO) {
        try {
            competitionParticipantService.saveCompetitionParticipant(competitionParticipantDTO);
            return ResponseEntity.ok().body("{\"message\": \"success_competition_participant_added_successfully\"}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\": \"Error adding competition participant: " + e.getMessage() + "\"}");
        }
    }

    // PUT - Update an existing competition participant
    @PutMapping("/edit/{id}")
    public ResponseEntity<CompetitionParticipantDTO> updateCompetitionParticipant(@PathVariable Integer id, @RequestBody CompetitionParticipantDTO updatedCompetitionParticipantDTO) {
        return competitionParticipantService.updateCompetitionParticipant(id, updatedCompetitionParticipantDTO);
    }

    // DELETE - Delete or restore a competition participant
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCompetitionParticipant(@PathVariable Integer id) {
        try {
            competitionParticipantService.deleteCompetitionParticipantById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\": \"Error deleting competition participant: " + e.getMessage() + "\"}");
        }
    }

    @DeleteMapping("/remove/{userId}/{competitionId}")
    public ResponseEntity<?> unregisterParticipant(@PathVariable Long userId, @PathVariable Integer competitionId) {
        System.out.println("Captured unregisterParticipant event");
        try {
            competitionParticipantService.deleteByUserIdAndCompetitionId(userId, competitionId);
            return ResponseEntity.ok().body("{\"message\": \"success_unregistered\"}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\": \"Error unregistering participant: " + e.getMessage() + "\"}");
        }
    }

    @GetMapping("/is-registered/{userId}/{competitionId}")
    public ResponseEntity<Boolean> isUserRegistered(@PathVariable Long userId, @PathVariable Integer competitionId) {
        boolean isRegistered = competitionParticipantService.isUserRegistered(userId, competitionId);
        return ResponseEntity.ok(isRegistered);
    }
}
