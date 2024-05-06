package edu.grupa2.strzelnica.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
public class Users {
    @Setter
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Setter
    @Getter
    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Setter
    @Column(name = "surname", nullable = false, length = 50)
    private String surname;

    @Setter
    @Getter
    @Column(name = "password", nullable = false, length = 100)
    private String password;

    @Setter
    @Getter
    @Column(name = "email", nullable = false, length = 100)
    private String email;

    @Setter
    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dateOfBirth;

    @Column(name = "club_member", nullable = false)
    private Boolean clubMember = false;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "Userrole", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
    inverseJoinColumns = @JoinColumn(name = "role_id",referencedColumnName = "id"))
    private List<Role> roles = new ArrayList<>();

    public void setRoles(List<Role> roles) {
        this.roles.clear();
        this.roles.addAll(roles);
    }
}