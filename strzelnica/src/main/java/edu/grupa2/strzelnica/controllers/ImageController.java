package edu.grupa2.strzelnica.controllers;

import edu.grupa2.strzelnica.dto.ImageDTO;
import edu.grupa2.strzelnica.services.ImagesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/images")
public class ImageController {
    private final ImagesService imagesService;

    @Autowired
    public ImageController(ImagesService imagesService) {
        this.imagesService = imagesService;
    }

    // GET - Get all images from the database
    @GetMapping
    @ResponseBody
    public List<ImageDTO> getImages() {
        return imagesService.getAllImages();
    }

    // GET - Get specific image from the database
    @GetMapping("/{id}")
    public ResponseEntity<?> getImageById(@PathVariable Integer id) {
        Optional<ImageDTO> optionalImage = imagesService.getImage(id);

        // Send the image if it exists
        if (optionalImage.isPresent()) {
            return ResponseEntity.ok(optionalImage.get());

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"error_image_not_found\"}");
        }
    }

    // POST - Add a few images to the database
    @PostMapping(value = "/add/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addImage(@PathVariable Integer id, @RequestBody List<ImageDTO> imagesDTO) {
        try {
            System.out.println("TRYING TO ADD IMAGE, ALBUM:");
            System.out.println(imagesDTO.get(0).getAlbum());
            imagesService.saveImages(imagesDTO);
            return ResponseEntity.ok().body("{\"message\": \"success_image_added_successfully\"}");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\": \"Error adding image: " + e.getMessage() + "\"}");
        }
    }

    // PUT - Update an existing image
    @PutMapping("/edit/{id}")
    public ResponseEntity<ImageDTO> updateImage(@PathVariable Integer id, @RequestBody ImageDTO updatedImageDTO) {
        return imagesService.updateImage(id, updatedImageDTO);
    }

    // DELETE - Delete or restore an image
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteImage(@PathVariable Integer id) {
        try {
            imagesService.deleteImage(id);
            return ResponseEntity.ok().build();

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\": \"Error deleting image: " + e.getMessage() + "\"}");
        }
    }
}
