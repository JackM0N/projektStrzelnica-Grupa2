package edu.grupa2.strzelnica.controllers;

import edu.grupa2.strzelnica.requests.UserRoleRequest;
import edu.grupa2.strzelnica.services.UserroleService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import edu.grupa2.strzelnica.models.Role;
import edu.grupa2.strzelnica.models.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/users/edit")
public class UserroleController {
    @Autowired
    private UserroleService userroleService;

    @PostMapping("/{userId}/setRoles")
    public void setRoles(@RequestBody UserRoleRequest userRoleRequest) {
        Users user = userRoleRequest.getUser();
        List<Role> roles = userRoleRequest.getRoles();
        userroleService.setRoles(user, roles);
    }

    @PostMapping("/{userId}/removeRoles")
    public void removeRoles(@RequestBody UserRoleRequest userRoleRequest) {
        Users user = userRoleRequest.getUser();
        List<Role> roles = userRoleRequest.getRoles();
        userroleService.removeRoles(user, roles);
    }

    @GetMapping("/{userId}/getRoles")
    public List<Role> getRoles(@PathVariable Long userId) {
        Users user = new Users();
        user.setId(userId);
        return userroleService.getRoles(user);
    }
}
