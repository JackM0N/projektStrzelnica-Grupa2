package edu.grupa2.strzelnica.controllers;

import edu.grupa2.strzelnica.models.Users;
import edu.grupa2.strzelnica.services.UsersService;
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
import java.util.Optional;

@Controller
public class UsersController {
    private final UsersService usersService;

    @Autowired
    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    // GET - Get all users from the service
    @GetMapping("/users")
    @ResponseBody
    public Page<Users> getUsers(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return usersService.getPaginatedUsers(page, size);
    }

    // GET - Get a specific user
    @GetMapping("/users/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        // Get the user from news service
        Optional<Users> optionalUsers = usersService.getUserById(id);

        // Send the user if they exists
        if (optionalUsers.isPresent()) {
            return ResponseEntity.ok(optionalUsers.get());

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"error_news_not_found\"}");
        }
    }

    // GET - Get a specific user
    @GetMapping("/users/{name}")
    public ResponseEntity<?> getUserByEmail(@PathVariable String email) {
        Optional<Users> optionalUsers = usersService.getUserByEmail(email);

        // Send the user if they exists
        if (optionalUsers.isPresent()) {
            return ResponseEntity.ok(optionalUsers.get());

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"error_news_not_found\"}");
        }
    }

    // POST - Add a new user
    @PostMapping("/users/add")
    public ResponseEntity<?> addUser(@RequestBody Users user) {
        try {
            Users savedUser = usersService.saveUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\": \"Error adding user: " + e.getMessage() + "\"}");
        }
    }

    // PUT - Update an existing user
    @PutMapping("/users/edit/{id}")
    public ResponseEntity<Users> updateUser(@PathVariable Long id, @RequestBody Users updatedUser) {
        try {
            Users user = usersService.updateUser(id, updatedUser);
            return ResponseEntity.ok(user);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE - Delete a user
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
