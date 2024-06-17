package edu.grupa2.strzelnica.services;

import edu.grupa2.strzelnica.dto.AlbumDTO;
import edu.grupa2.strzelnica.dto.ImageDTO;
import edu.grupa2.strzelnica.models.Album;
import edu.grupa2.strzelnica.models.Image;
import edu.grupa2.strzelnica.repositories.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ImagesService {
    private final ImageRepository imageRepository;

    @Autowired
    public ImagesService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public List<ImageDTO> getAllImages() {
        List<Image> images = imageRepository.findAll();
        return images.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public Optional<ImageDTO> getImage(Integer id) {
        Optional<Image> image = imageRepository.findById(id);
        return image.map(this::convertToDTO);
    }

    public ImageDTO saveImage(ImageDTO imageDTO) {
        Image image = convertToEntity(imageDTO);
        Image savedImage = imageRepository.save(image);
        return convertToDTO(savedImage);
    }

    public ResponseEntity<ImageDTO> updateImage(Integer id, ImageDTO updatedImageDTO) {
        Optional<Image> optionalImage = imageRepository.findById(id);

        if (optionalImage.isPresent()) {
            Image existingImage = optionalImage.get();
            existingImage.setData(updatedImageDTO.getData());

            Image savedImage = imageRepository.save(existingImage);
            return new ResponseEntity<>(convertToDTO(savedImage), HttpStatus.OK);

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public void deleteImage(Integer id) {
        imageRepository.deleteById(id);
    }

    private ImageDTO convertToDTO(Image image) {
        ImageDTO imageDto = new ImageDTO(image.getData());
        imageDto.setId(image.getId());
        imageDto.setData(image.getData());
        return imageDto;
    }

    private Image convertToEntity(ImageDTO imageDTO) {
        Image image = new Image();
        image.setId(imageDTO.getId());
        image.setData(imageDTO.getData());
        return image;
    }
}
