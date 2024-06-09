package edu.grupa2.strzelnica.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import java.util.Date;

@Setter
@Getter
@Entity
@Table(name = "competition")
public class Competition {
    @Id
    //@ColumnDefault("nextval('competitions_id_seq'")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false, length = 200)
    private String name;

    @Column(name = "description", nullable = false, length = 5000)
    private String description;

    @Column(name = "date", nullable = false)
    private Date date;

    @Column(name = "hour_start", nullable = false)
    private Integer hourStart;

    @Column(name = "hour_end", nullable = false)
    private Integer hourEnd;

    @Column(name = "done", nullable = false)
    private Boolean done;
}