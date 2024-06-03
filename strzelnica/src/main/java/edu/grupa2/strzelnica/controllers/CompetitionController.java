package edu.grupa2.strzelnica.controllers;

import edu.grupa2.strzelnica.dto.CompetitionDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


import edu.grupa2.strzelnica.services.CompetitionsService;


@RestController
@RequestMapping("/competitions")
public class CompetitionController {
    private final CompetitionsService competitionsService;

    @Autowired
    public CompetitionController(CompetitionsService competitionsService) {
        this.competitionsService = competitionsService;
    }

    // GET - Get paginated competitions from the database
    @GetMapping
    @ResponseBody
    public Page<CompetitionDTO> getPaginatedCompetitions(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return competitionsService.getPaginatedCompetitions(page, size);
    }

    // GET - Get all competitions from the database
    @GetMapping("/all")
    @ResponseBody
    public List<CompetitionDTO> getAllCompetitions() {
        return competitionsService.getAllCompetitions();
    }

    // GET - Get specific competition from the database
    @GetMapping("/{id}")
    public ResponseEntity<?> getCompetitionById(@PathVariable Integer id) {
        Optional<CompetitionDTO> optionalCompetition = competitionsService.getCompetitionById(id);

        // Send the competition if it exists
        if (optionalCompetition.isPresent()) {
            return ResponseEntity.ok(optionalCompetition.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"error_competition_not_found\"}");
        }
    }

    // POST - Add a new competition to the database
    @PostMapping("/add")
    public ResponseEntity<?> addCompetition(@RequestBody CompetitionDTO competitionDTO) {
        try {
            competitionsService.saveCompetition(competitionDTO);
            return ResponseEntity.ok().body("{\"message\": \"success_competition_added_successfully\"}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\": \"Error adding competition: " + e.getMessage() + "\"}");
        }
    }

    // PUT - Update an existing competition
    @PutMapping("/edit/{id}")
    public ResponseEntity<CompetitionDTO> updateCompetition(@PathVariable Integer id, @RequestBody CompetitionDTO updatedCompetitionDTO) {
        return competitionsService.updateCompetition(id, updatedCompetitionDTO);
    }

    // DELETE - Delete or restore a competition
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCompetition(@PathVariable Integer id) {
        try {
            competitionsService.deleteCompetitionById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\": \"Error deleting competition: " + e.getMessage() + "\"}");
        }
    }
}
