package edu.grupa2.strzelnica.controllers;

import edu.grupa2.strzelnica.models.ServiceAvailability;
import edu.grupa2.strzelnica.models.ServiceUnavailability;
import edu.grupa2.strzelnica.services.ServiceUnavailabilitiesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Controller
public class ServiceUnavailabilityController {
    private final ServiceUnavailabilitiesService serviceUnavailabilitiesService;

    @Autowired
    public ServiceUnavailabilityController(ServiceUnavailabilitiesService serviceUnavailabilitiesService) {
        this.serviceUnavailabilitiesService = serviceUnavailabilitiesService;
    }

    // GET - Get service unavailability list for a specific service from the database
    @GetMapping("/serviceunavailabilities/{id}")
    public ResponseEntity<?> getServiceUnavailabilityById(@PathVariable Integer id) {
        List<ServiceUnavailability> got = serviceUnavailabilitiesService.getServiceUnavailabilitiesByServiceId(id);

        if (got.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"error_service_unavailabilities_empty\"}");

        } else {
            return ResponseEntity.ok(got);
        }
    }

    // GET - Get paginated service unavailability list for a specific service from the database
    @GetMapping("/serviceunavailabilities/paginated/{id}")
    @ResponseBody
    public Page<ServiceUnavailability> getPaginatedServiceReservationByServiceId(@PathVariable Integer id, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return serviceUnavailabilitiesService.getPaginatedServiceUnavailabilitiesByServiceId(id, page, size);
    }

    // POST - Add a new service unavailability to the database
    @PostMapping("/serviceunavailabilities/add")
    public ResponseEntity<?> addServiceUnavailability(@RequestBody ServiceUnavailability serviceUnavailability) {
        try {
            serviceUnavailabilitiesService.saveServiceUnavailability(serviceUnavailability);
            return ResponseEntity.ok().body("{\"message\": \"success_service_availability_added_successfully\"}");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\": \"Error adding service availability: " + e.getMessage() + "\"}");
        }
    }

    // PUT - Update an existing service unavailability
    @PutMapping("/serviceunavailabilities/edit/{id}")
    public ResponseEntity<ServiceUnavailability> updateServiceUnavailability(@PathVariable Integer id, @RequestBody ServiceUnavailability updatedServiceUnavailability) {
        return serviceUnavailabilitiesService.updateServiceUnavailability(id, updatedServiceUnavailability);
    }

    // DELETE - Delete a service unavailability
    @DeleteMapping("/serviceunavailabilities/{id}")
    public ResponseEntity<?> deleteServiceUnavailability(@PathVariable Integer id) {
        try {
            serviceUnavailabilitiesService.deleteServiceUnavailabilityById(id);
            return ResponseEntity.ok().build();

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\": \"Error deleting service availability: " + e.getMessage() + "\"}");
        }
    }
}