package edu.grupa2.strzelnica.services;

import edu.grupa2.strzelnica.dto.AlbumDTO;
import edu.grupa2.strzelnica.dto.CompetitionDTO;
import edu.grupa2.strzelnica.dto.ImageDTO;
import edu.grupa2.strzelnica.models.Album;
import edu.grupa2.strzelnica.models.Competition;
import edu.grupa2.strzelnica.models.Image;
import edu.grupa2.strzelnica.repositories.AlbumRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
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

    @Transactional
    public AlbumDTO saveAlbum(AlbumDTO albumDTO) {
        Album album = convertToEntity(albumDTO);

        List<Image> images = album.getImages();
        for (Image image : images) {
            image.setAlbum(album);
        }

        Album savedAlbum = albumRepository.save(album);
        return convertToDTO(savedAlbum);
    }

    @Transactional
    public ResponseEntity<AlbumDTO> updateAlbum(Integer id, AlbumDTO updatedAlbumDTO) {
        Optional<Album> optionalAlbum = albumRepository.findById(id);

        if (optionalAlbum.isPresent()) {
            Album existingAlbum = optionalAlbum.get();
            existingAlbum.setName(updatedAlbumDTO.getName());
            existingAlbum.setDescription(updatedAlbumDTO.getDescription());
            // Ensure that images are updated properly
            List<Image> images = convertToEntity(updatedAlbumDTO.getImages());
            for (Image image : images) {
                image.setAlbum(existingAlbum);
            }
            existingAlbum.setImages(images);

            Album savedAlbum = albumRepository.save(existingAlbum);
            return new ResponseEntity<>(convertToDTO(savedAlbum), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public void deleteAlbum(Integer id) {
        albumRepository.deleteById(id);
    }

    private List<ImageDTO> convertToDTO(List<Image> images) {
        List<ImageDTO> imagesDTO = new ArrayList<>();
        for (Image image : images) {
            ImageDTO imageDTO = new ImageDTO(image.getId(), image.getData(), null);
            imagesDTO.add(imageDTO);
        }
        return imagesDTO;
    }

    private List<Image> convertToEntity(List<ImageDTO> imageDTOs) {
        List<Image> images = new ArrayList<>();
        for (ImageDTO imageDTO : imageDTOs) {
            Image newImage = new Image();
            newImage.setId(imageDTO.getId());
            newImage.setData(imageDTO.getData());
            images.add(newImage);
        }
        return images;
    }

    private AlbumDTO convertToDTO(Album album) {
        AlbumDTO albumDTO = new AlbumDTO();
        albumDTO.setId(album.getId());
        albumDTO.setName(album.getName());
        albumDTO.setDescription(album.getDescription());
        if (album.getCompetition() != null) {
            albumDTO.setCompetition(convertToDTO(album.getCompetition()));
        }
        albumDTO.setImages(convertToDTO(album.getImages()));
        return albumDTO;
    }

    private Album convertToEntity(AlbumDTO albumDTO) {
        Album album = new Album();
        album.setId(albumDTO.getId());
        album.setName(albumDTO.getName());
        album.setDescription(albumDTO.getDescription());
        if (albumDTO.getCompetition() != null) {
            album.setCompetition(convertToEntity(albumDTO.getCompetition()));
        }
        album.setImages(convertToEntity(albumDTO.getImages()));
        return album;
    }

    private CompetitionDTO convertToDTO(Competition competition) {
        CompetitionDTO competitionDTO = new CompetitionDTO();
        competitionDTO.setId(competition.getId());
        competitionDTO.setName(competition.getName());
        competitionDTO.setDescription(competition.getDescription());
        competitionDTO.setDate(competition.getDate());
        competitionDTO.setHourStart(competition.getHourStart());
        competitionDTO.setHourEnd(competition.getHourEnd());
        competitionDTO.setDone(competition.getDone());
        return competitionDTO;
    }

    private Competition convertToEntity(CompetitionDTO competitionDTO) {
        Competition competition = new Competition();
        competition.setId(competitionDTO.getId());
        competition.setName(competitionDTO.getName());
        competition.setDescription(competitionDTO.getDescription());
        competition.setDate(competitionDTO.getDate());
        competition.setHourStart(competitionDTO.getHourStart());
        competition.setHourEnd(competitionDTO.getHourEnd());
        competition.setDone(competitionDTO.getDone());
        return competition;
    }
}
