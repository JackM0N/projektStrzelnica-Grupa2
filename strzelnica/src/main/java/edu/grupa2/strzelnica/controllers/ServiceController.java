package edu.grupa2.strzelnica.controllers;

import edu.grupa2.strzelnica.models.Service;
import edu.grupa2.strzelnica.services.ServicesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@Controller
public class ServiceController {
    private final ServicesService servicesService;

    @Autowired
    public ServiceController(ServicesService servicesService) {
        this.servicesService = servicesService;
    }

    // GET - Get all services from the database
    @GetMapping("/services")
    @ResponseBody
    public Page<Service> getService(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return servicesService.getPaginatedServices(page, size);
    }

    // GET - Get specific service from the database
    @GetMapping("/services/{id}")
    public ResponseEntity<?> getServiceById(@PathVariable Integer id) {
        Optional<Service> optionalService = servicesService.getServiceById(id);

        // Send the service if it exists
        if (optionalService.isPresent()) {
            return ResponseEntity.ok(optionalService.get());

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"error_service_not_found\"}");
        }
    }

    // POST - Add a new service to the database
    @PostMapping("/services/add")
    public ResponseEntity<?> addService(@RequestBody Service service) {
        try {
            servicesService.saveService(service);
            return ResponseEntity.ok().body("{\"message\": \"success_service_added_successfully\"}");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\": \"Error adding service: " + e.getMessage() + "\"}");
        }
    }

    // PUT - Update an existing service
    @PutMapping("/services/edit/{id}")
    public ResponseEntity<Service> updateService(@PathVariable Integer id, @RequestBody Service updatedService) {
        return servicesService.updateService(id, updatedService);
    }

    // DELETE - Delete or restore a service
    @DeleteMapping("/services/{id}")
    public ResponseEntity<?> deleteService(@PathVariable Integer id) {
        try {
            servicesService.deleteServiceById(id);
            return ResponseEntity.ok().build();

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\": \"Error deleting service: " + e.getMessage() + "\"}");
        }
    }
}