package edu.grupa2.strzelnica.services;

import edu.grupa2.strzelnica.dto.CompetitionParticipantDTO;
import edu.grupa2.strzelnica.models.CompetitionParticipant;
import edu.grupa2.strzelnica.repositories.CompetitionParticipantRepository;
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
public class CompetitionParticipantService {
    private final CompetitionParticipantRepository competitionParticipantRepository;

    @Autowired
    public CompetitionParticipantService(CompetitionParticipantRepository competitionParticipantRepository) {
        this.competitionParticipantRepository = competitionParticipantRepository;
    }

    public List<CompetitionParticipantDTO> getAllCompetitionParticipants() {
        List<CompetitionParticipant> competitionParticipants = competitionParticipantRepository.findAll();
        return competitionParticipants.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public Page<CompetitionParticipantDTO> getPaginatedCompetitionParticipants(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));
        Page<CompetitionParticipant> competitionParticipants = competitionParticipantRepository.findAll(pageable);
        return competitionParticipants.map(this::convertToDTO);
    }

    public Optional<CompetitionParticipantDTO> getCompetitionParticipantById(Integer id) {
        Optional<CompetitionParticipant> competitionParticipant = competitionParticipantRepository.findById(id);
        return competitionParticipant.map(this::convertToDTO);
    }

    public CompetitionParticipantDTO saveCompetitionParticipant(CompetitionParticipantDTO competitionParticipantDTO) {
        CompetitionParticipant competitionParticipant = convertToEntity(competitionParticipantDTO);
        CompetitionParticipant savedCompetitionParticipant = competitionParticipantRepository.save(competitionParticipant);
        return convertToDTO(savedCompetitionParticipant);
    }

    public ResponseEntity<CompetitionParticipantDTO> updateCompetitionParticipant(Integer id, CompetitionParticipantDTO updatedCompetitionParticipantDTO) {
        Optional<CompetitionParticipant> optionalCompetitionParticipant = competitionParticipantRepository.findById(id);

        if (optionalCompetitionParticipant.isPresent()) {
            CompetitionParticipant existingCompetitionParticipant = optionalCompetitionParticipant.get();
            existingCompetitionParticipant.setCompetitionId(updatedCompetitionParticipantDTO.getCompetitionId());
            existingCompetitionParticipant.setUserId(updatedCompetitionParticipantDTO.getUserId());
            existingCompetitionParticipant.setScore(updatedCompetitionParticipantDTO.getScore());
            existingCompetitionParticipant.setWeaponId(updatedCompetitionParticipantDTO.getWeaponId());
            existingCompetitionParticipant.setPlace(updatedCompetitionParticipantDTO.getPlace());

            CompetitionParticipant savedCompetitionParticipant = competitionParticipantRepository.save(existingCompetitionParticipant);
            return new ResponseEntity<>(convertToDTO(savedCompetitionParticipant), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public void deleteCompetitionParticipantById(Integer id) {
        competitionParticipantRepository.deleteById(id);
    }

    public void deleteByUserIdAndCompetitionId(Long userId, Integer competitionId) {
        competitionParticipantRepository.deleteByUserIdAndCompetitionId(userId, competitionId);
    }

    public boolean isUserRegistered(Long userId, Integer competitionId) {
        return competitionParticipantRepository.existsByUserIdAndCompetitionId(userId, competitionId);
    }

    private CompetitionParticipantDTO convertToDTO(CompetitionParticipant competitionParticipant) {
        CompetitionParticipantDTO competitionParticipantDTO = new CompetitionParticipantDTO();
        competitionParticipantDTO.setId(competitionParticipant.getId());
        competitionParticipantDTO.setCompetitionId(competitionParticipant.getCompetitionId());
        competitionParticipantDTO.setUserId(competitionParticipant.getUserId());
        competitionParticipantDTO.setScore(competitionParticipant.getScore());
        competitionParticipantDTO.setWeaponId(competitionParticipant.getWeaponId());
        competitionParticipantDTO.setPlace(competitionParticipant.getPlace());
        return competitionParticipantDTO;
    }

    private CompetitionParticipant convertToEntity(CompetitionParticipantDTO competitionParticipantDTO) {
        CompetitionParticipant competitionParticipant = new CompetitionParticipant();
        competitionParticipant.setId(competitionParticipantDTO.getId());
        competitionParticipant.setCompetitionId(competitionParticipantDTO.getCompetitionId());
        competitionParticipant.setUserId(competitionParticipantDTO.getUserId());
        competitionParticipant.setScore(competitionParticipantDTO.getScore());
        competitionParticipant.setWeaponId(competitionParticipantDTO.getWeaponId());
        competitionParticipant.setPlace(competitionParticipantDTO.getPlace());
        return competitionParticipant;
    }
}
