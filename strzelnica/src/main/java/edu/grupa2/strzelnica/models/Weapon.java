package edu.grupa2.strzelnica.models;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "weapon")
public class Weapon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false, length = 200)
    private String name;

    @ColumnDefault("0")
    @Column(name = "uses_since_last_maintenance", nullable = false)
    private Integer usesSinceLastMaintenance;

    @ColumnDefault("0")
    @Column(name = "maintenance_every", nullable = false)
    private Integer maintenanceEvery;

    @Column(name = "fit_for_use", nullable = false)
    private Boolean fitForUse = false;

    @Column(name = "price_per_hour", nullable = false)
    private BigDecimal pricePerHour;

    @ColumnDefault("false")
    @Column(name = "in_maintenance", nullable = false)
    private Boolean inMaintenance = false;

    @Column(name = "serial_number", nullable = false, length = 40)
    private String serialNumber;

    @OneToMany(mappedBy = "weapon")
    private Set<Competitionweapon> competitionweapons = new LinkedHashSet<>();

    @OneToMany(mappedBy = "weapon")
    private Set<Weaponreservation> weaponreservations = new LinkedHashSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getUsesSinceLastMaintenance() {
        return usesSinceLastMaintenance;
    }

    public void setUsesSinceLastMaintenance(Integer usesSinceLastMaintenance) {
        this.usesSinceLastMaintenance = usesSinceLastMaintenance;
    }

    public Integer getMaintenanceEvery() {
        return maintenanceEvery;
    }

    public void setMaintenanceEvery(Integer maintenanceEvery) {
        this.maintenanceEvery = maintenanceEvery;
    }

    public Boolean getFitForUse() {
        return fitForUse;
    }

    public void setFitForUse(Boolean fitForUse) {
        this.fitForUse = fitForUse;
    }

    public BigDecimal getPricePerHour() {
        return pricePerHour;
    }

    public void setPricePerHour(BigDecimal pricePerHour) {
        this.pricePerHour = pricePerHour;
    }

    public Boolean getInMaintenance() {
        return inMaintenance;
    }

    public void setInMaintenance(Boolean inMaintenance) {
        this.inMaintenance = inMaintenance;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public Set<Competitionweapon> getCompetitionweapons() {
        return competitionweapons;
    }

    public void setCompetitionweapons(Set<Competitionweapon> competitionweapons) {
        this.competitionweapons = competitionweapons;
    }

    public Set<Weaponreservation> getWeaponreservations() {
        return weaponreservations;
    }

    public void setWeaponreservations(Set<Weaponreservation> weaponreservations) {
        this.weaponreservations = weaponreservations;
    }

}