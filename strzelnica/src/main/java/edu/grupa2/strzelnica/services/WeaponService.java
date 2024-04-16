package edu.grupa2.strzelnica.services;

import edu.grupa2.strzelnica.models.Weapon;
import edu.grupa2.strzelnica.repositories.WeaponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Weapon> updateWeapon(Integer id, Weapon updatedWeapon) {
        // Get the weapon from weapon service
        Optional<Weapon> optionalWeapon = this.getWeaponById(id);

        // Update the weapon if it exists
        if (optionalWeapon.isPresent()) {
            Weapon existingWeapon = optionalWeapon.get();
            existingWeapon.setName(updatedWeapon.getName());
            existingWeapon.setUsesSinceLastMaintenance(updatedWeapon.getUsesSinceLastMaintenance());
            existingWeapon.setMaintenanceEvery(updatedWeapon.getMaintenanceEvery());
            existingWeapon.setFitForUse(updatedWeapon.getFitForUse());
            existingWeapon.setPricePerHour(updatedWeapon.getPricePerHour());
            existingWeapon.setInMaintenance(updatedWeapon.getInMaintenance());
            existingWeapon.setSerialNumber(updatedWeapon.getSerialNumber());
            existingWeapon.setCompetitionweapons(updatedWeapon.getCompetitionweapons());
            existingWeapon.setWeaponreservations(updatedWeapon.getWeaponreservations());

            Weapon savedWeapon = this.saveWeapon(existingWeapon);
            return new ResponseEntity<>(savedWeapon, HttpStatus.OK);

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Method to delete a weapon by its ID
    public void deleteWeaponById(Integer id) {
        weaponRepository.deleteById(id);
    }
}
