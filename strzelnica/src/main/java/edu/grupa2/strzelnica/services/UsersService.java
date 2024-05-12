package edu.grupa2.strzelnica.services;

import edu.grupa2.strzelnica.models.Users;
import edu.grupa2.strzelnica.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UsersService {
    private final UsersRepository usersRepository;

    @Autowired
    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    public Page<Users> getPaginatedUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "id"));
        return usersRepository.findAll(pageable);
    }

    public Optional<Users> getUserById(Long id) {
        return usersRepository.findById(id);
    }

    public Optional<Users> getUserByEmail(String email) {
        return usersRepository.findByEmail(email);
    }

    public Users saveUser(Users user) {
        return usersRepository.save(user);
    }

    public Users updateUser(Long id, Users updatedUser) {
        if (usersRepository.existsById(id)) {
            updatedUser.setId(id);
            return usersRepository.save(updatedUser);

        } else {
            throw new IllegalArgumentException("User with ID " + id + " does not exist");
        }
    }

    public void deleteUserById(Long id) {
        usersRepository.deleteById(id);
    }
}
