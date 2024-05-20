package edu.grupa2.strzelnica.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.postgresql.util.PGmoney;

import java.sql.Time;
import java.util.Date;

@Setter
@Getter
@Entity
@Table(name = "service_reservation")
public class ServiceReservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "service_id", nullable = false)
    private Service service;

    @Column(name = "date", nullable = false)
    private Date date;

    @Column(name = "start_time", nullable = false)
    private Time start_time;

    @Column(name = "end_time", nullable = false)
    private Time end_time;

    @Column(name = "price", nullable = false)
    private Float price;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "track_id", nullable = false)
    private Track track;
}