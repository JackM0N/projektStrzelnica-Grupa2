package edu.grupa2.strzelnica.repositories;

import edu.grupa2.strzelnica.models.CompetitionParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompetitionParticipantRepository extends JpaRepository<CompetitionParticipant, Integer> {
    void deleteByUserIdAndCompetitionId(Long userId, Integer competitionId);
    boolean existsByUserIdAndCompetitionId(Long userId, Integer competitionId);
}
