package edu.grupa2.strzelnica.services;

import edu.grupa2.strzelnica.models.Users;
import edu.grupa2.strzelnica.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UsersServices {
    private final UsersRepository usersRepository;

    @Autowired
    public UsersServices(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    // Method to get all users
    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }

    // Method to get paginated users
    public Page<Users> getPaginatedUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));
        return usersRepository.findAll(pageable);
    }


    // Method to get a specific user by its ID
    public Optional<Users> getUserById(Long id) {
        return usersRepository.findById(id);
    }

    // Method to save a new user
    public Users saveUser(Users user) {
        return usersRepository.save(user);
    }

    // Method to update an existing user
    public Users updateUser(Long id, Users updatedUser) {
        if (usersRepository.existsById(id)) {
            updatedUser.setId(id);
            return usersRepository.save(updatedUser);
        } else {
            throw new IllegalArgumentException("User with ID " + id + " does not exist");
        }
    }

    // Method to delete a user by its ID
    public void deleteUserById(Long id) {
        usersRepository.deleteById(id);
    }
}
