package edu.grupa2.strzelnica.services;

import edu.grupa2.strzelnica.models.Role;
import edu.grupa2.strzelnica.models.Userrole;
import edu.grupa2.strzelnica.models.Users;
import edu.grupa2.strzelnica.repositories.UserroleRepository;
import jakarta.transaction.Transactional;
import java.util.List;

public class UserroleService {

    private final UserroleRepository userroleRepository;

    public UserroleService(UserroleRepository userroleRepository) {
        this.userroleRepository = userroleRepository;
    }

    @Transactional
    public void setRoles(Users user, List<Role> roles) {
        for (Role role : roles) {
            Userrole userrole = new Userrole();
            userrole.setUser(user);
            userrole.setRole(role);
            userroleRepository.save(userrole);
        }
    }
}
