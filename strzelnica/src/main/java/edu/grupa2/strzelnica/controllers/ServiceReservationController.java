package edu.grupa2.strzelnica.controllers;

import edu.grupa2.strzelnica.models.ServiceReservation;
import edu.grupa2.strzelnica.services.ServiceReservationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Controller
public class ServiceReservationController {
    private final ServiceReservationsService serviceReservationsService;

    @Autowired
    public ServiceReservationController(ServiceReservationsService serviceReservationsService) {
        this.serviceReservationsService = serviceReservationsService;
    }

    // GET - Get all service reservations from the database
    @GetMapping("/servicereservations")
    @ResponseBody
    public Page<ServiceReservation> getServiceReservations(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return serviceReservationsService.getPaginatedServiceReservations(page, size);
    }

    // GET - Get paginated service reservation list for a specific service from the database
    @GetMapping("/servicereservations/paginated/{id}")
    @ResponseBody
    public Page<ServiceReservation> getPaginatedServiceReservationByServiceId(@PathVariable Integer id, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return serviceReservationsService.getPaginatedServiceReservationsByServiceId(id, page, size);
    }

    // GET - Get service reservation list for a specific service from the database
    @GetMapping("/servicereservations/{id}")
    public ResponseEntity<?> getServiceReservationByServiceId(@PathVariable Integer id) {
        List<ServiceReservation> got = serviceReservationsService.getServiceReservationsByServiceId(id);

        if (got.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"error_service_reservations_empty\"}");

        } else {
            return ResponseEntity.ok(got);
        }
    }

    // POST - Add a new service reservation to the database
    @PostMapping("/servicereservations/add")
    public ResponseEntity<?> addServiceReservation(@RequestBody ServiceReservation serviceReservation) {
        try {
            serviceReservationsService.saveServiceReservation(serviceReservation);
            return ResponseEntity.ok().body("{\"message\": \"success_service_reservation_added_successfully\"}");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\": \"Error adding service reservation: " + e.getMessage() + "\"}");
        }
    }

    // PUT - Update an existing service reservation
    @PutMapping("/servicereservations/edit/{id}")
    public ResponseEntity<ServiceReservation> updateServiceReservation(@PathVariable Integer id, @RequestBody ServiceReservation updatedServiceReservation) {
        return serviceReservationsService.updateServiceReservation(id, updatedServiceReservation);
    }

    // DELETE - Delete or restore a service reservation
    @DeleteMapping("/servicereservations/{id}")
    public ResponseEntity<?> deleteServiceReservation(@PathVariable Integer id) {
        try {
            serviceReservationsService.deleteServiceReservationById(id);
            return ResponseEntity.ok().build();

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\": \"Error deleting service reservation: " + e.getMessage() + "\"}");
        }
    }
}