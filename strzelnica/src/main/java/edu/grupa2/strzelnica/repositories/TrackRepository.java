package edu.grupa2.strzelnica.repositories;

import edu.grupa2.strzelnica.models.Track;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrackRepository extends JpaRepository<Track, Integer> {
}
