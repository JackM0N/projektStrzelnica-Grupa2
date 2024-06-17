package edu.grupa2.strzelnica.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "image")
public class Image {
    @Id
    //@ColumnDefault("nextval('albums_id_seq'")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Lob
    private String data;

    @ManyToOne
    @JoinColumn(name = "album_id", nullable=false)
    private Album album;
}
