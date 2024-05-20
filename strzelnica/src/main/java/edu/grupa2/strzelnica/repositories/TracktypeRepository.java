package edu.grupa2.strzelnica.repositories;

import edu.grupa2.strzelnica.models.Tracktype;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TracktypeRepository extends JpaRepository<Tracktype, Integer> {
}
