package edu.grupa2.strzelnica.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import java.math.BigDecimal;
import java.util.LinkedHashSet;
import java.util.Set;

@Setter
@Getter
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
}