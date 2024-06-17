package edu.grupa2.strzelnica.repositories;

import edu.grupa2.strzelnica.models.Album;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface AlbumRepository extends JpaRepository<Album, Integer> {
    Optional<Album> findByCompetitionId(Integer competitionId);
}
