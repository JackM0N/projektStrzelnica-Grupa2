package edu.grupa2.strzelnica.controllers;

import edu.grupa2.strzelnica.dto.WeaponDTO;
import edu.grupa2.strzelnica.services.WeaponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequestMapping("/weapons")
public class WeaponController {
    private final WeaponService weaponService;

    @Autowired
    public WeaponController(WeaponService weaponService) {
        this.weaponService = weaponService;
    }

    // GET - Get all weapons from the database
    @GetMapping
    @ResponseBody
    public Page<WeaponDTO> getWeapons(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return weaponService.getPaginatedWeapons(page, size);
    }

    // GET - Get specific weapon from the database
    @GetMapping("/{id}")
    public ResponseEntity<?> getWeaponById(@PathVariable Integer id) {
        Optional<WeaponDTO> optionalWeaponDTO = weaponService.getWeaponById(id);

        // Send the weapon if it exists
        if (optionalWeaponDTO.isPresent()) {
            return ResponseEntity.ok(optionalWeaponDTO.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"error_weapon_not_found\"}");
        }
    }

    // POST - Add a new weapon to the database
    @PostMapping("/add")
    public ResponseEntity<?> addWeapon(@RequestBody WeaponDTO weaponDTO) {
        try {
            weaponService.saveWeapon(weaponDTO);
            return ResponseEntity.ok().body("{\"message\": \"success_weapon_added_successfully\"}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\": \"Error adding weapon: " + e.getMessage() + "\"}");
        }
    }

    // PUT - Update an existing weapon
    @PutMapping("/edit/{id}")
    public ResponseEntity<?> updateWeapon(@PathVariable Integer id, @RequestBody WeaponDTO updatedWeaponDTO) {
        return weaponService.updateWeapon(id, updatedWeaponDTO);
    }

    // DELETE - Delete or restore a weapon
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteWeapon(@PathVariable Integer id) {
        try {
            weaponService.deleteWeaponById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\": \"Error deleting weapon: " + e.getMessage() + "\"}");
        }
    }
}