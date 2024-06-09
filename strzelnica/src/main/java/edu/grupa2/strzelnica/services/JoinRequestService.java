package edu.grupa2.strzelnica.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import edu.grupa2.strzelnica.models.JoinRequest;
import edu.grupa2.strzelnica.models.Users;
import edu.grupa2.strzelnica.repositories.JoinRequestRepository;
import edu.grupa2.strzelnica.repositories.UsersRepository;

@Service
public class JoinRequestService {

    @Autowired
    private JoinRequestRepository joinRequestRepository;

    @Autowired
    private UsersRepository usersRepository;

    public JoinRequest saveJoinRequest(Long userId, String message) {
        Users user = usersRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        JoinRequest joinRequest = new JoinRequest();
        joinRequest.setUser(user);
        joinRequest.setMessage(message);
        return joinRequestRepository.save(joinRequest);
    }
}
