package edu.grupa2.strzelnica.models;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Table(name = "competitionweapon")
public class Competitionweapon {
    @Id
    @ColumnDefault("nextval('competitionweapons_id_seq'")
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "weapon_id", nullable = false)
    private Weapon weapon;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "competition_id", nullable = false)
    private Competition competition;

    @Column(name = "shots_taken")
    private Integer shotsTaken;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Weapon getWeapon() {
        return weapon;
    }

    public void setWeapon(Weapon weapon) {
        this.weapon = weapon;
    }

    public Competition getCompetition() {
        return competition;
    }

    public void setCompetition(Competition competition) {
        this.competition = competition;
    }

    public Integer getShotsTaken() {
        return shotsTaken;
    }

    public void setShotsTaken(Integer shotsTaken) {
        this.shotsTaken = shotsTaken;
    }

}