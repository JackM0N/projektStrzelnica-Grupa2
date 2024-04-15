package edu.grupa2.strzelnica.controllers;

import edu.grupa2.strzelnica.models.Weapon;
import edu.grupa2.strzelnica.services.WeaponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@Controller
public class WeaponController {
    // Service for handling the weapon repository
    private final WeaponService weaponService;

    @Autowired
    public WeaponController(WeaponService weaponService) {
        this.weaponService = weaponService;
    }

    // GET - Get all weapons from the database
    @GetMapping("/weapons")
    @ResponseBody
    public Page<Weapon> getWeapon(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return weaponService.getPaginatedWeapons(page, size);
    }

    // GET - Get specific weapon from the database
    @GetMapping("/weapons/{id}")
    public ResponseEntity<?> getWeaponById(@PathVariable Integer id) {
        // Get the weapon from weapon service
        Optional<Weapon> optionalWeapon = weaponService.getWeaponById(id);

        // Send the weapon if it exists
        if (optionalWeapon.isPresent()) {
            return ResponseEntity.ok(optionalWeapon.get());

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"error_weapon_not_found\"}");
        }
    }

    // POST - Add a new weapon to the database
    @PostMapping("/weapons/add")
    public ResponseEntity<?> addWeapon(@RequestBody Weapon weapon) {
        try {
            weaponService.saveWeapon(weapon);
            return ResponseEntity.ok().body("{\"message\": \"success_weapon_added_successfully\"}");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\": \"Error adding weapon: " + e.getMessage() + "\"}");
        }
    }

    // PUT - Update an existing weapon
    @PutMapping("/weapons/edit/{id}")
    public ResponseEntity<Weapon> updateWeapon(@PathVariable Integer id, @RequestBody Weapon updatedWeapon) {
        // Get the weapon from weapon service
        Optional<Weapon> optionalWeapon = weaponService.getWeaponById(id);

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

            Weapon savedWeapon = weaponService.saveWeapon(existingWeapon);
            return new ResponseEntity<>(savedWeapon, HttpStatus.OK);

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // DELETE - Delete or restore a weapon
    @DeleteMapping("/weapons/{id}")
    public ResponseEntity<?> deleteWeapon(@PathVariable Integer id) {
        try {
            weaponService.deleteWeaponById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\": \"Error deleting weapon: " + e.getMessage() + "\"}");
        }
    }
}