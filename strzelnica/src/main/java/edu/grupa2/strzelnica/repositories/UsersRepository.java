package edu.grupa2.strzelnica.repositories;

import edu.grupa2.strzelnica.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<User, Long> {
}
