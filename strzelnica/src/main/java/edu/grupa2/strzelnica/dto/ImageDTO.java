package edu.grupa2.strzelnica.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class ImageDTO {
    private Long id;
    private String data; // Assuming this holds the Base64-encoded image data
    private AlbumDTO album;

    public ImageDTO() {
    }

    public ImageDTO(Long id, String data, AlbumDTO album) {
        this.id = id;
        this.data = data;
        this.album = album;
    }

    public ImageDTO(String data) {
        this.data = data;
    }

    @JsonProperty("id")
    public Long getId() {
        return id;
    }

    @JsonProperty("id")
    public void setId(Long id) {
        this.id = id;
    }

    @JsonProperty("base64Image")
    public String getData() {
        return data;
    }

    @JsonProperty("base64Image")
    public void setData(String data) {
        this.data = data;
    }

    @JsonProperty("album")
    public AlbumDTO getAlbum() {
        return album;
    }

    @JsonProperty("album")
    public void setAlbum(AlbumDTO album) {
        this.album = album;
    }
}
