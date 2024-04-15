package edu.grupa2.strzelnica.repositories;

import edu.grupa2.strzelnica.models.Weapon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WeaponRepository extends JpaRepository<Weapon, Integer> {

}
