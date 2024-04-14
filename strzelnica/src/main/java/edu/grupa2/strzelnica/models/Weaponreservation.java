package edu.grupa2.strzelnica.models;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "weaponreservation")
public class Weaponreservation {
    @Id
    @ColumnDefault("nextval('gunreservations_type_seq'")
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "weapon_id", nullable = false)
    private Weapon weapon;

    @Column(name = "reserved_from", nullable = false)
    private Instant reservedFrom;

    @Column(name = "reserved_to", nullable = false)
    private Instant reservedTo;

    @Column(name = "price", nullable = false)
    private BigDecimal price;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Weapon getWeapon() {
        return weapon;
    }

    public void setWeapon(Weapon weapon) {
        this.weapon = weapon;
    }

    public Instant getReservedFrom() {
        return reservedFrom;
    }

    public void setReservedFrom(Instant reservedFrom) {
        this.reservedFrom = reservedFrom;
    }

    public Instant getReservedTo() {
        return reservedTo;
    }

    public void setReservedTo(Instant reservedTo) {
        this.reservedTo = reservedTo;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

}