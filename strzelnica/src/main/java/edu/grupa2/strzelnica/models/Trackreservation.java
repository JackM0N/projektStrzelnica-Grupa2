package edu.grupa2.strzelnica.models;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "trackreservation")
public class Trackreservation {
    @Id
    @ColumnDefault("nextval('trackreservation_id_seq'")
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "track_id", nullable = false)
    private Track track;

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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Track getTrack() {
        return track;
    }

    public void setTrack(Track track) {
        this.track = track;
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