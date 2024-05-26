package edu.grupa2.strzelnica.repositories;

import edu.grupa2.strzelnica.models.Track;
import edu.grupa2.strzelnica.models.Tracktype;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TrackRepository extends JpaRepository<Track, Integer> {
    List<Track> findByType(Tracktype tracktype);
}
