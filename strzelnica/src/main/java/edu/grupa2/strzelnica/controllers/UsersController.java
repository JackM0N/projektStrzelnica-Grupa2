package edu.grupa2.strzelnica.controllers;

import edu.grupa2.strzelnica.dto.UserDTO;
import edu.grupa2.strzelnica.models.CustomUserDetails;
import edu.grupa2.strzelnica.models.Users;
import edu.grupa2.strzelnica.services.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@Controller
@RequestMapping("/users")
public class UsersController {
    private final UsersService usersService;

    @Autowired
    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    // GET - Get all users from the service
    @GetMapping
    @ResponseBody
    public Page<UserDTO> getUsers(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return usersService.getPaginatedUsers(page, size);
    }

    @GetMapping("/account")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        Optional<UserDTO> user =  usersService.getUserById(userDetails.getId());
        return ResponseEntity.ok(user.get());
    }

    @PutMapping("/account")
    public ResponseEntity<?> updateCurrentUser(@RequestBody UserDTO userDto, Authentication authentication) {
        try {
            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            UserDTO updatedUser = usersService.updateUser(userDetails.getId(), userDto);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to update user");
        }
    }

    // GET - Get a specific user by ID
    @GetMapping("/id/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        Optional<UserDTO> optionalUserDTO = usersService.getUserById(id);

        // Send the user if they exist
        if (optionalUserDTO.isPresent()) {
            return ResponseEntity.ok(optionalUserDTO.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"User not found\"}");
        }
    }

    // GET - Get a specific user by email
    @GetMapping("/email/{name}")
    public ResponseEntity<?> getUserByEmail(@PathVariable String email) {
        Optional<UserDTO> optionalUserDTO = usersService.getUserByEmail(email);

        // Send the user if they exist
        if (optionalUserDTO.isPresent()) {
            return ResponseEntity.ok(optionalUserDTO.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"User not found\"}");
        }
    }

    // POST - Add a new user
    @PostMapping("/add")
    public ResponseEntity<?> addUser(@RequestBody UserDTO userDTO) {
        try {
            UserDTO savedUserDTO = usersService.saveUser(userDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUserDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\": \"Error adding user: " + e.getMessage() + "\"}");
        }
    }

    // PUT - Update an existing user
    @PutMapping("/edit/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody UserDTO updatedUserDTO) {
        try {
            UserDTO userDTO = usersService.updateUser(id, updatedUserDTO);
            return ResponseEntity.ok(userDTO);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"User not found\"}");
        }
    }

    // DELETE - Delete a user
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            usersService.deleteUserById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\": \"Error deleting user: " + e.getMessage() + "\"}");
        }
    }
}
