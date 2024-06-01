package edu.grupa2.strzelnica.services;

import edu.grupa2.strzelnica.dto.WeaponDTO;
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

    public Page<WeaponDTO> getPaginatedWeapons(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "id"));
        Page<Weapon> weaponPage = weaponRepository.findAll(pageable);
        return weaponPage.map(this::convertToDto);
    }

    public Optional<WeaponDTO> getWeaponById(Integer id) {
        Optional<Weapon> optionalWeapon = weaponRepository.findById(id);
        return optionalWeapon.map(this::convertToDto);
    }

    public Weapon saveWeapon(WeaponDTO weaponDto) {
        Weapon weapon = convertToEntity(weaponDto);
        return weaponRepository.save(weapon);
    }

    public ResponseEntity<WeaponDTO> updateWeapon(Integer id, WeaponDTO updatedWeaponDto) {
        Optional<Weapon> optionalWeapon = this.weaponRepository.findById(id);

        if (optionalWeapon.isPresent()) {
            Weapon existingWeapon = optionalWeapon.get();
            existingWeapon = updateEntityFromDto(existingWeapon, updatedWeaponDto);
            Weapon savedWeapon = this.weaponRepository.save(existingWeapon);
            return new ResponseEntity<>(convertToDto(savedWeapon), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public void deleteWeaponById(Integer id) {
        weaponRepository.deleteById(id);
    }

    private WeaponDTO convertToDto(Weapon weapon) {
        WeaponDTO weaponDto = new WeaponDTO();
        weaponDto.setId(weapon.getId());
        weaponDto.setName(weapon.getName());
        weaponDto.setUsesSinceLastMaintenance(weapon.getUsesSinceLastMaintenance());
        weaponDto.setMaintenanceEvery(weapon.getMaintenanceEvery());
        weaponDto.setFitForUse(weapon.getFitForUse());
        weaponDto.setPricePerHour(weapon.getPricePerHour());
        weaponDto.setInMaintenance(weapon.getInMaintenance());
        weaponDto.setSerialNumber(weapon.getSerialNumber());
        return weaponDto;
    }

    private Weapon convertToEntity(WeaponDTO weaponDto) {
        Weapon weapon = new Weapon();
        weapon.setId(weaponDto.getId());
        weapon.setName(weaponDto.getName());
        weapon.setUsesSinceLastMaintenance(weaponDto.getUsesSinceLastMaintenance());
        weapon.setMaintenanceEvery(weaponDto.getMaintenanceEvery());
        weapon.setFitForUse(weaponDto.getFitForUse());
        weapon.setPricePerHour(weaponDto.getPricePerHour());
        weapon.setInMaintenance(weaponDto.getInMaintenance());
        weapon.setSerialNumber(weaponDto.getSerialNumber());
        return weapon;
    }

    private Weapon updateEntityFromDto(Weapon weapon, WeaponDTO weaponDto) {
        weapon.setName(weaponDto.getName());
        weapon.setUsesSinceLastMaintenance(weaponDto.getUsesSinceLastMaintenance());
        weapon.setMaintenanceEvery(weaponDto.getMaintenanceEvery());
        weapon.setFitForUse(weaponDto.getFitForUse());
        weapon.setPricePerHour(weaponDto.getPricePerHour());
        weapon.setInMaintenance(weaponDto.getInMaintenance());
        weapon.setSerialNumber(weaponDto.getSerialNumber());
        return weapon;
    }
}