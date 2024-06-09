package edu.grupa2.strzelnica.controllers;

import edu.grupa2.strzelnica.dto.JoinRequestDto;
import edu.grupa2.strzelnica.models.JoinRequest;
import edu.grupa2.strzelnica.services.JoinRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/join-requests")
public class JoinRequestController {

    @Autowired
    private JoinRequestService joinRequestService;

    @PostMapping
    public ResponseEntity<JoinRequest> createJoinRequest(@RequestBody JoinRequestDto joinRequestDto) {
        JoinRequest savedRequest = joinRequestService.saveJoinRequest(joinRequestDto.getUserId(), joinRequestDto.getMessage());
        return new ResponseEntity<>(savedRequest, HttpStatus.CREATED);
    }
}
