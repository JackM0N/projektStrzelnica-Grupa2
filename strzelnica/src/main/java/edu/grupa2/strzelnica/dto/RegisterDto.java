package edu.grupa2.strzelnica.dto;

import lombok.Getter;
import java.io.Serializable;
import java.time.LocalDate;

@Getter
public class RegisterDto implements Serializable {
    private final String name;
    private final String surname;
    private final LocalDate date_of_birth;
    private final String email;
    private final String password;
    private final int encoding;

    public RegisterDto(String name, String surname, LocalDate dateOfBirth, String email, String password, int encoding) {
        this.name = name;
        this.surname = surname;
        this.date_of_birth = dateOfBirth;
        this.email = email;
        this.password = password;
        this.encoding = encoding;
    }
}