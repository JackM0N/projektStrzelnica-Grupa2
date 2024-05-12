package edu.grupa2.strzelnica.controllers;

import edu.grupa2.strzelnica.models.ServiceAvailability;
import edu.grupa2.strzelnica.models.ServiceReservation;
import edu.grupa2.strzelnica.services.ServiceAvailabilitiesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Controller
public class ServiceAvailabilityController {
    private final ServiceAvailabilitiesService serviceAvailabilitiesService;

    @Autowired
    public ServiceAvailabilityController(ServiceAvailabilitiesService serviceAvailabilitiesService) {
        this.serviceAvailabilitiesService = serviceAvailabilitiesService;
    }

    // GET - Get service availability list for a specific service from the database
    @GetMapping("/serviceavailabilities/{id}")
    public ResponseEntity<?> getServiceAvailabilityById(@PathVariable Integer id) {
        List<ServiceAvailability> got = serviceAvailabilitiesService.getServiceAvailabilitiesByServiceId(id);

        if (got.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"error_service_availabilities_empty\"}");

        } else {
            return ResponseEntity.ok(got);
        }
    }

    // GET - Get paginated service availability list for a specific service from the database
    @GetMapping("/serviceavailabilities/paginated/{id}")
    @ResponseBody
    public Page<ServiceAvailability> getPaginatedServiceReservationByServiceId(@PathVariable Integer id, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return serviceAvailabilitiesService.getPaginatedServiceAvailabilitiesByServiceId(id, page, size);
    }

    // POST - Add a new service availability to the database
    @PostMapping("/serviceavailabilities/add")
    public ResponseEntity<?> addWeapon(@RequestBody ServiceAvailability serviceAvailability) {
        try {
            serviceAvailabilitiesService.saveServiceAvailability(serviceAvailability);
            return ResponseEntity.ok().body("{\"message\": \"success_service_availability_added_successfully\"}");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\": \"Error adding service availability: " + e.getMessage() + "\"}");
        }
    }

    // PUT - Update an existing service availability
    @PutMapping("/serviceavailabilities/edit/{id}")
    public ResponseEntity<ServiceAvailability> updateServiceAvailability(@PathVariable Integer id, @RequestBody ServiceAvailability updatedServiceAvailability) {
        return serviceAvailabilitiesService.updateServiceAvailability(id, updatedServiceAvailability);
    }

    // DELETE - Delete a service availability
    @DeleteMapping("/serviceavailabilities/{id}")
    public ResponseEntity<?> deleteServiceAvailability(@PathVariable Integer id) {
        try {
            serviceAvailabilitiesService.deleteServiceAvailabilityById(id);
            return ResponseEntity.ok().build();

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\": \"Error deleting service availability: " + e.getMessage() + "\"}");
        }
    }
}