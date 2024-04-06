package edu.grupa2.strzelnica.repositories;

import edu.grupa2.strzelnica.models.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsRepository extends JpaRepository<News, Long> {

}
