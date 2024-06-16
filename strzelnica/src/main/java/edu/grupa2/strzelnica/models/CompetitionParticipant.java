package edu.grupa2.strzelnica.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "competitionparticipant")
public class CompetitionParticipant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "competition_id", nullable = false)
    private Integer competitionId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "score")
    private Integer score;

    @Column(name = "weapon_id")
    private Integer weaponId;

    @Column(name = "place")
    private Integer place;
}
