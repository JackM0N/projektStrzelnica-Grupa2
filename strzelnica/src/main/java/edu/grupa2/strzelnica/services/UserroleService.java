package edu.grupa2.strzelnica.services;

import edu.grupa2.strzelnica.models.Role;
import edu.grupa2.strzelnica.models.Userrole;
import edu.grupa2.strzelnica.models.Users;
import edu.grupa2.strzelnica.repositories.UserroleRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
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

    @Transactional
    public void removeRoles(Users user, List<Role> roles) {
        for (Role role : roles) {
            Userrole userrole = userroleRepository.findByUserAndRole(user, role);
            if (userrole != null) {
                userroleRepository.delete(userrole);
            }
        }
    }

    @Transactional
    public List<Role> getRoles(Users user) {
        List<Userrole> userroles = userroleRepository.findByUser(user);
        return userroles.stream()
                .map(Userrole::getRole)
                .collect(Collectors.toList());
    }
}
