package edu.grupa2.strzelnica.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import java.sql.Time;

@Setter
@Getter
@Entity
@Table(name = "service_unavailability")
public class ServiceUnavailability {
    @Id
    @ColumnDefault("nextval('service_unavailability_id_seq'")
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "service_id", nullable = false)
    private Integer serviceId;

    @Column(name = "start_date", nullable = false)
    private String start_date;

    @Column(name = "start_time", nullable = false)
    private String start_time;

    @Column(name = "end_date")
    private Time end_date;

    @Column(name = "end_time")
    private Time end_time;
}