package edu.grupa2.strzelnica.controllers;

import edu.grupa2.strzelnica.dto.LoginDto;
import edu.grupa2.strzelnica.dto.RegisterDto;
import edu.grupa2.strzelnica.models.Role;
import edu.grupa2.strzelnica.models.Users;
import edu.grupa2.strzelnica.repositories.RoleRepository;
import edu.grupa2.strzelnica.repositories.UserroleRepository;
import edu.grupa2.strzelnica.repositories.UsersRepository;
import edu.grupa2.strzelnica.services.UserroleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private AuthenticationManager authenticationManager;
    private UsersRepository usersRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthController(AuthenticationManager authenticationManager, UsersRepository usersRepository,
                           RoleRepository roleRepository, PasswordEncoder passwordEncoder){
        this.usersRepository = usersRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto){
        if(usersRepository.existsByEmail(registerDto.getEmail())){
            return new ResponseEntity<>("Podany e-mail jest już zajęty!", HttpStatus.BAD_REQUEST);
        }

        Users user = new Users();
        user.setName(registerDto.getName());
        user.setSurname(registerDto.getSurname());
        user.setDateOfBirth(registerDto.getDate_of_birth());
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));

        Role roles = roleRepository.findByName("USER");
        user.setRoles(Collections.singletonList(roles));

        usersRepository.save(user);

        return new ResponseEntity<>("Użytkownik został zarejestrowany!", HttpStatus.OK);
    }
 /*   @PostMapping("login")
    public ResponseEntity<String> login(@RequestBody LoginDto loginDto) {
        // Extract username and password from LoginDto
        String username = loginDto.getEmail();
        String password = loginDto.getPassword();

        // Authenticate the user
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
            // If authentication successful, you can generate a token or simply return success message
            return new ResponseEntity<>("Login successful", HttpStatus.OK);
        } catch (AuthenticationException e) {
            // Authentication failed
            return new ResponseEntity<>("Invalid username or password", HttpStatus.UNAUTHORIZED);
        }
    }*/
}
