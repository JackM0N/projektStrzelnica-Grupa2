package edu.grupa2.strzelnica.dto;

import lombok.Data;
import lombok.Getter;
import java.io.Serializable;

@Getter
@Data
public class LoginDto implements Serializable {
    private final String email;
    private final String password;

    public LoginDto(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
