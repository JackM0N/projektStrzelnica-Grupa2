package edu.grupa2.strzelnica.services;

import edu.grupa2.strzelnica.dto.UserDTO;
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
import java.util.stream.Collectors;

@Service
public class UsersService {
    private final UsersRepository usersRepository;

    @Autowired
    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    private UserDTO convertEntityToDTO(Users user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setSurname(user.getSurname());
        userDTO.setEmail(user.getEmail());
        userDTO.setDateOfBirth(user.getDateOfBirth());
        userDTO.setClubMember(user.getClubMember());
        return userDTO;
    }
    private Users convertDTOToEntity(UserDTO userDTO) {
        Users user = new Users();
        user.setName(userDTO.getName());
        user.setSurname(userDTO.getSurname());
        user.setEmail(userDTO.getEmail());
        user.setDateOfBirth(userDTO.getDateOfBirth());
        user.setClubMember(userDTO.getClubMember());
        return user;
    }

    public Page<UserDTO> getPaginatedUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "id"));
        Page<Users> usersPage = usersRepository.findAll(pageable);
        return usersPage.map(this::convertEntityToDTO);
    }

    public Optional<UserDTO> getUserById(Long id) {
        return usersRepository.findById(id).map(this::convertEntityToDTO);
    }

    public Optional<UserDTO> getUserByEmail(String email) {
        return usersRepository.findByEmail(email).map(this::convertEntityToDTO);
    }

    public UserDTO saveUser(UserDTO userDTO) {
        Users user = convertDTOToEntity(userDTO);
        Users savedUser = usersRepository.save(user);
        return convertEntityToDTO(savedUser);
    }

    public UserDTO updateUser(Long id, UserDTO updatedUserDTO) {
        Optional<Users> optionalUser = usersRepository.findById(id);
        if (optionalUser.isPresent()) {
            Users existingUser = optionalUser.get();

            if (updatedUserDTO.getName() != null) {
                existingUser.setName(updatedUserDTO.getName());
            }
            if (updatedUserDTO.getSurname() != null) {
                existingUser.setSurname(updatedUserDTO.getSurname());
            }
            if (updatedUserDTO.getEmail() != null) {
                existingUser.setEmail(updatedUserDTO.getEmail());
            }
            if (updatedUserDTO.getDateOfBirth() != null) {
                existingUser.setDateOfBirth(updatedUserDTO.getDateOfBirth());
            }
            if (updatedUserDTO.getClubMember() != null) {
                existingUser.setClubMember(updatedUserDTO.getClubMember());
            }

            Users updatedUser = usersRepository.save(existingUser);
            return convertEntityToDTO(updatedUser);
        } else {
            throw new IllegalArgumentException("User with ID " + id + " does not exist");
        }
    }

    public void deleteUserById(Long id) {
        usersRepository.deleteById(id);
    }
}
