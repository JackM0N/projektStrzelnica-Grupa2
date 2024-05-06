package edu.grupa2.strzelnica.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import java.math.BigDecimal;
import java.time.Instant;

@Setter
@Getter
@Entity
@Table(name = "trackreservation")
public class Trackreservation {
    @Id
    @ColumnDefault("nextval('trackreservation_id_seq'")
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "track_id", nullable = false)
    private Track track;

    @Column(name = "reserved_from", nullable = false)
    private Instant reservedFrom;

    @Column(name = "reserved_to", nullable = false)
    private Instant reservedTo;

    @Column(name = "price", nullable = false)
    private BigDecimal price;
}