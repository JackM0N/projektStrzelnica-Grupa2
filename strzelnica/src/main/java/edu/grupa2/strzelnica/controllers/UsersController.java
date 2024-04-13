package edu.grupa2.strzelnica.controllers;

import edu.grupa2.strzelnica.models.News;
import edu.grupa2.strzelnica.models.Users;

import edu.grupa2.strzelnica.services.UsersServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;


@Controller
public class UsersController {
    private final UsersServices usersService;
    @Autowired
    public UsersController(UsersServices usersService) {
        this.usersService = usersService;
    }
    @GetMapping("/users")
    @ResponseBody
    public Page<Users> getPaginetedUsers(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return usersService.getPaginatedUsers(page, size);
    }
    @GetMapping("/users/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        Optional<Users> optionalUsers = usersService.getUserById(id);

        // Send the news if it exists
        if (optionalUsers.isPresent()) {
            return ResponseEntity.ok(optionalUsers.get());

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"error_news_not_found\"}");
        }
    }

    @PostMapping("/users/add")
    public ResponseEntity<?> addUser(@RequestBody Users user) {
        try {
            Users savedUser = usersService.saveUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\": \"Error adding user: " + e.getMessage() + "\"}");
        }
    }

    @PutMapping("/users/edit/{id}")
    public ResponseEntity<Users> updateUser(@PathVariable Long id, @RequestBody Users updatedUser) {
        try {
            Users user = usersService.updateUser(id, updatedUser);
            return ResponseEntity.ok(user);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            usersService.deleteUserById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\": \"Error deleting user: " + e.getMessage() + "\"}");
        }
    }
}
