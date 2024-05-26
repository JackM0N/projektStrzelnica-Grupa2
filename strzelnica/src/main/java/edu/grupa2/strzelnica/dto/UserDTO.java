package edu.grupa2.strzelnica.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;

@Data
@Getter
@Setter
public class UserDTO implements Serializable {
    private Long id;
    private String name;
    private String surname;
    private String email;
    private LocalDate dateOfBirth;
    private Boolean clubMember;
    // TODO: Add roles when they are done
}
