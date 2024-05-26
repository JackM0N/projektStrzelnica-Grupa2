package edu.grupa2.strzelnica.controllers;

import edu.grupa2.strzelnica.models.DateAvailability;
import edu.grupa2.strzelnica.services.AvailabilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AvailabilityController {

    @Autowired
    private AvailabilityService availabilityService;

    @GetMapping("/availability/{id}")
    public List<DateAvailability> getAvailability(@PathVariable Integer id) {
        return availabilityService.getAvailableSlots(id);
    }
}
