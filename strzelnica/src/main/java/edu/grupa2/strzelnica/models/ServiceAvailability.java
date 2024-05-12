package edu.grupa2.strzelnica.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import java.sql.Time;
import java.util.Date;

@Setter
@Getter
@Entity
@Table(name = "service_availability")
public class ServiceAvailability {
    @Id
    @ColumnDefault("nextval('service_availability_id_seq'")
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "service_id", nullable = false)
    private Integer serviceId;

    @Column(name = "start_date", nullable = false)
    private Date start_date;

    @Column(name = "end_date")
    private Date end_date;

    @Column(name = "service_day", nullable = false)
    private String service_day;

    @Column(name = "service_time_start", nullable = false)
    private Time service_time_start;

    @Column(name = "service_time_end", nullable = false)
    private Time service_time_end;
}