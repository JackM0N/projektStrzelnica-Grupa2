package edu.grupa2.strzelnica.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import java.time.LocalDate;

@Setter
@Getter
@Entity
@Table(name = "competition")
public class Competition {
    @Id
    @ColumnDefault("nextval('competitions_id_seq'")
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false, length = 200)
    private String name;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "active", nullable = false)
    private Boolean active = false;

    @Column(name = "description", length = Integer.MAX_VALUE)
    private String description;
}