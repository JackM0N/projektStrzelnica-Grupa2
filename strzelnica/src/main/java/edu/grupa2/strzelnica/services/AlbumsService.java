package edu.grupa2.strzelnica.services;

import edu.grupa2.strzelnica.dto.AlbumDTO;
import edu.grupa2.strzelnica.models.Album;
import edu.grupa2.strzelnica.repositories.AlbumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AlbumsService {
    private final AlbumRepository albumRepository;

    @Autowired
    public AlbumsService(AlbumRepository albumRepository) {
        this.albumRepository = albumRepository;
    }

    public List<AlbumDTO> getAllAlbums() {
        List<Album> albums = albumRepository.findAll();
        return albums.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public Optional<AlbumDTO> getAlbum(Integer id) {
        Optional<Album> album = albumRepository.findById(id);
        return album.map(this::convertToDTO);
    }

    public Optional<AlbumDTO> getAlbumByCompetitionId(Integer competitionId) {
        Optional<Album> album = albumRepository.findByCompetitionId(competitionId);
        return album.map(this::convertToDTO);
    }

    public AlbumDTO saveAlbum(AlbumDTO albumDTO) {
        Album album = convertToEntity(albumDTO);
        Album savedAlbum = albumRepository.save(album);
        return convertToDTO(savedAlbum);
    }

    public ResponseEntity<AlbumDTO> updateAlbum(Integer id, AlbumDTO updatedAlbumDTO) {
        Optional<Album> optionalAlbum = albumRepository.findById(id);

        if (optionalAlbum.isPresent()) {
            Album existingAlbum = optionalAlbum.get();
            existingAlbum.setName(updatedAlbumDTO.getName());
            existingAlbum.setDescription(updatedAlbumDTO.getDescription());

            Album savedAlbum = albumRepository.save(existingAlbum);
            return new ResponseEntity<>(convertToDTO(savedAlbum), HttpStatus.OK);

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public void deleteAlbum(Integer id) {
        albumRepository.deleteById(id);
    }

    private AlbumDTO convertToDTO(Album album) {
        AlbumDTO albumDTO = new AlbumDTO();
        albumDTO.setId(album.getId());
        albumDTO.setName(album.getName());
        albumDTO.setDescription(album.getDescription());
        return albumDTO;
    }

    private Album convertToEntity(AlbumDTO albumDTO) {
        Album album = new Album();
        album.setId(albumDTO.getId());
        album.setName(albumDTO.getName());
        album.setDescription(albumDTO.getDescription());
        return album;
    }
}
