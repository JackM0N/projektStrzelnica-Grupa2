package edu.grupa2.strzelnica.services;

import edu.grupa2.strzelnica.dto.CompetitionDTO;
import edu.grupa2.strzelnica.models.Competition;
import edu.grupa2.strzelnica.repositories.CompetitionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CompetitionsService {
    private final CompetitionRepository competitionRepository;

    @Autowired
    public CompetitionsService(CompetitionRepository competitionRepository) {
        this.competitionRepository = competitionRepository;
    }

    public List<CompetitionDTO> getAllCompetitions() {
        List<Competition> competitions = competitionRepository.findAll();
        return competitions.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public Page<CompetitionDTO> getPaginatedCompetitions(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "date"));
        Page<Competition> competitions = competitionRepository.findAll(pageable);
        return competitions.map(this::convertToDTO);
    }

    public Optional<CompetitionDTO> getCompetitionById(Integer id) {
        Optional<Competition> competition = competitionRepository.findById(id);
        return competition.map(this::convertToDTO);
    }

    public CompetitionDTO saveCompetition(CompetitionDTO competitionDTO) {
        Competition competition = convertToEntity(competitionDTO);
        Competition savedCompetition = competitionRepository.save(competition);
        return convertToDTO(savedCompetition);
    }

    public ResponseEntity<CompetitionDTO> updateCompetition(Integer id, CompetitionDTO updatedCompetitionDTO) {
        Optional<Competition> optionalCompetition = competitionRepository.findById(id);

        if (optionalCompetition.isPresent()) {
            Competition existingCompetition = optionalCompetition.get();
            existingCompetition.setName(updatedCompetitionDTO.getName());
            existingCompetition.setDescription(updatedCompetitionDTO.getDescription());
            existingCompetition.setDate(updatedCompetitionDTO.getDate());
            existingCompetition.setHourStart(updatedCompetitionDTO.getHourStart());
            existingCompetition.setHourEnd(updatedCompetitionDTO.getHourEnd());
            existingCompetition.setDone(updatedCompetitionDTO.getDone());

            Competition savedCompetition = competitionRepository.save(existingCompetition);
            return new ResponseEntity<>(convertToDTO(savedCompetition), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public void deleteCompetitionById(Integer id) {
        competitionRepository.deleteById(id);
    }

    private CompetitionDTO convertToDTO(Competition competition) {
        CompetitionDTO competitionDTO = new CompetitionDTO();
        competitionDTO.setId(competition.getId());
        competitionDTO.setName(competition.getName());
        competitionDTO.setDescription(competition.getDescription());
        competitionDTO.setDate(competition.getDate());
        competitionDTO.setHourStart(competition.getHourStart());
        competitionDTO.setHourEnd(competition.getHourEnd());
        competitionDTO.setDone(competition.getDone());
        return competitionDTO;
    }

    private Competition convertToEntity(CompetitionDTO competitionDTO) {
        Competition competition = new Competition();
        competition.setId(competitionDTO.getId());
        competition.setName(competitionDTO.getName());
        competition.setDescription(competitionDTO.getDescription());
        competition.setDate(competitionDTO.getDate());
        competition.setHourStart(competitionDTO.getHourStart());
        competition.setHourEnd(competitionDTO.getHourEnd());
        competition.setDone(competitionDTO.getDone());
        return competition;
    }
}
