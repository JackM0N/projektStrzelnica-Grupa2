package edu.grupa2.strzelnica.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "tracktype")
public class Tracktype {
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    //@OneToMany(mappedBy = "type", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    //private Set<Track> tracks;

    @Column(name = "name", nullable = false, length = 100)
    private String name;
}