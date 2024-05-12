package edu.grupa2.strzelnica.controllers;

import edu.grupa2.strzelnica.dto.AuthResponseDTO;
import edu.grupa2.strzelnica.dto.LoginDto;
import edu.grupa2.strzelnica.dto.RegisterDto;
import edu.grupa2.strzelnica.models.Role;
import edu.grupa2.strzelnica.models.Users;
import edu.grupa2.strzelnica.repositories.RoleRepository;
import edu.grupa2.strzelnica.repositories.UsersRepository;
import edu.grupa2.strzelnica.security.JWTGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/")
public class AuthController {

    private AuthenticationManager authenticationManager;
    private UsersRepository usersRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private JWTGenerator generator;

    @Autowired
    private AuthController(AuthenticationManager authenticationManager, UsersRepository usersRepository,
                           RoleRepository roleRepository, PasswordEncoder passwordEncoder, JWTGenerator generator) {
        this.usersRepository = usersRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.generator = generator;
    }

    @PostMapping("register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto){
        if (usersRepository.existsByEmail(registerDto.getEmail())) {
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

        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PostMapping("login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginDto loginDto) {
        // Extract username and password from LoginDto
        String username = loginDto.getEmail();
        String password = loginDto.getPassword();

        // Authenticate the user
        Authentication authentication = authenticationManager.authenticate
                (new UsernamePasswordAuthenticationToken(username, password));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = generator.generateToken(authentication);
        return new ResponseEntity<>(new AuthResponseDTO(jwt), HttpStatus.OK);

//            return ResponseEntity.ok()
//                    .body(Map.of("message", "Login successful"));
//        } catch (BadCredentialsException e) {
//            // Invalid username or password
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                    .body(Map.of("message", "Invalid username or password"));
//        } catch (LockedException e) {
//            // Account locked due to multiple failed login attempts
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                    .body(Map.of("message", "Account locked"));
//        } catch (DisabledException e) {
//            // Account disabled
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                    .body(Map.of("message", "Account disabled"));
//        } catch (AuthenticationException e) {
//            // Other authentication failures
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                    .body(Map.of("message", "Authentication failed"));
//        }
    }
}
