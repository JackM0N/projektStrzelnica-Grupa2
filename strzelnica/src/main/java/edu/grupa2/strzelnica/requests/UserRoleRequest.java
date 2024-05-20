package edu.grupa2.strzelnica.requests;

import edu.grupa2.strzelnica.models.Role;
import edu.grupa2.strzelnica.models.Users;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class UserRoleRequest {
    private Users user;
    private List<Role> roles;
}
