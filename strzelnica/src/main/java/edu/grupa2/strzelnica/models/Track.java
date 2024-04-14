package edu.grupa2.strzelnica.models;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "track")
public class Track {
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "type_id", nullable = false)
    private Tracktype type;

    @Column(name = "price_per_hour", nullable = false)
    private BigDecimal pricePerHour;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Tracktype getType() {
        return type;
    }

    public void setType(Tracktype type) {
        this.type = type;
    }

    public BigDecimal getPricePerHour() {
        return pricePerHour;
    }

    public void setPricePerHour(BigDecimal pricePerHour) {
        this.pricePerHour = pricePerHour;
    }

}