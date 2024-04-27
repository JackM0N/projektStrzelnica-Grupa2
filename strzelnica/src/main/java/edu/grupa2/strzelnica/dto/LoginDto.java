package edu.grupa2.strzelnica.dto;

import java.io.Serializable;

public class LoginDto implements Serializable {
    private final String email;
    private final String password;

    public LoginDto(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}
