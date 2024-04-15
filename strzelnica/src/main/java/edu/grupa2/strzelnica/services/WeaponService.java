package edu.grupa2.strzelnica.services;

import edu.grupa2.strzelnica.models.Weapon;
import edu.grupa2.strzelnica.repositories.WeaponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class WeaponService {
    private final WeaponRepository weaponRepository;

    @Autowired
    public WeaponService(WeaponRepository weaponRepository) {
        this.weaponRepository = weaponRepository;
    }

    // Method to get a paginated list of weapons
    public Page<Weapon> getPaginatedWeapons(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "id"));
        return weaponRepository.findAll(pageable);
    }

    // Method to get specific weapon by its ID
    public Optional<Weapon> getWeaponById(Integer id) {
        return weaponRepository.findById(id);
    }

    // Method to save a new weapon
    public Weapon saveWeapon(Weapon weapon) {
        return weaponRepository.save(weapon);
    }

    // Method to update an existing weapon
    public Weapon updateWeapon(Integer id, Weapon updatedWeapon) {
        if (weaponRepository.existsById(id)) {
            updatedWeapon.setId(id);
            return weaponRepository.save(updatedWeapon);
        } else {
            throw new IllegalArgumentException("Weapon with ID " + id + " does not exist");
        }
    }

    // Method to delete a weapon by its ID
    public void deleteWeaponById(Integer id) {
        weaponRepository.deleteById(id);
    }
}
