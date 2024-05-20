package edu.grupa2.strzelnica.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.postgresql.util.PGmoney;

@Setter
@Getter
@Entity
@Table(name = "service")
public class Service {
    @Id
    @ColumnDefault("nextval('serviceId_seq'")
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false, length = 200)
    private String name;

    @Column(name = "description", nullable = false, length = 5000)
    private String description;

    @Column(name = "image_url", nullable = false, length = 300)
    private String image_url;

    @Column(name = "price", nullable = false)
    private Float price;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "tracktype_id", nullable = false)
    private Tracktype tracktype;
}