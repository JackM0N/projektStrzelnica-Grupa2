package edu.grupa2.strzelnica.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Lob;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import java.io.Serializable;

@Data
@Getter
@Setter
public class ImageDTO implements Serializable {
    private Long id;

    @JsonProperty("base64Image")
    @Lob
    private String data;

    private AlbumDTO album;

    /*
    @JsonCreator
    public ImageDTO(@JsonProperty("id") Long id, @JsonProperty("base64Image") String data, @JsonProperty("album") AlbumDTO album) {
        this.id = id;
        this.data = data;
        this.album = album;
    }

    @JsonCreator
    public ImageDTO(@JsonProperty("id") Long id, @JsonProperty("base64Image") String data) {
        this.id = id;
        this.data = data;
    }

     */

    @JsonCreator
    public ImageDTO(@JsonProperty("base64Image") String data) {
        this.data = data;
    }
}
