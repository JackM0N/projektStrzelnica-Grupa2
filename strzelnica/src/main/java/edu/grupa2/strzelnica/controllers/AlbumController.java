package edu.grupa2.strzelnica.controllers;

import edu.grupa2.strzelnica.dto.AlbumDTO;
import edu.grupa2.strzelnica.services.AlbumsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/albums")
public class AlbumController {
    private final AlbumsService albumsService;

    @Autowired
    public AlbumController(AlbumsService albumsService) {
        this.albumsService = albumsService;
    }

    // GET - Get all albums from the database
    @GetMapping
    @ResponseBody
    public List<AlbumDTO> getAlbums() {
        return albumsService.getAllAlbums();
    }

    // GET - Get specific album from the database
    @GetMapping("/{id}")
    public ResponseEntity<?> getAlbumById(@PathVariable Integer id) {
        Optional<AlbumDTO> optionalAlbum = albumsService.getAlbum(id);

        // Send the album if it exists
        if (optionalAlbum.isPresent()) {
            return ResponseEntity.ok(optionalAlbum.get());

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"error_album_not_found\"}");
        }
    }

    // GET - Get specific album from the database by competition id
    @GetMapping("/comp/{id}")
    public ResponseEntity<?> getAlbumByCompetitionId(@PathVariable Integer id) {
        Optional<AlbumDTO> optionalAlbum = albumsService.getAlbumByCompetitionId(id);

        // Send the album if it exists
        if (optionalAlbum.isPresent()) {
            return ResponseEntity.ok(optionalAlbum.get());

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"error_album_not_found\"}");
        }
    }

    // POST - Add a new album to the database
    @PostMapping(value = "/add", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addAlbum(@RequestBody AlbumDTO albumDTO) {
        try {
            System.out.println("TRYING TO ADD ALBUM: " + albumDTO);
            System.out.println(albumDTO);
            albumsService.saveAlbum(albumDTO);
            return ResponseEntity.ok().body("{\"message\": \"success_album_added_successfully\"}");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\": \"Error adding album: " + e.getMessage() + "\"}");
        }
    }

    // PUT - Update an existing album
    @PutMapping("/edit/{id}")
    public ResponseEntity<AlbumDTO> updateAlbum(@PathVariable Integer id, @RequestBody AlbumDTO updatedAlbumDTO) {
        return albumsService.updateAlbum(id, updatedAlbumDTO);
    }

    // DELETE - Delete or restore a album
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAlbum(@PathVariable Integer id) {
        try {
            albumsService.deleteAlbum(id);
            return ResponseEntity.ok().build();

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\": \"Error deleting album: " + e.getMessage() + "\"}");
        }
    }
}
