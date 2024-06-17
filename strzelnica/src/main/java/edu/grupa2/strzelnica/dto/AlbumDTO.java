package edu.grupa2.strzelnica.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import java.io.Serializable;
import java.util.List;

@Data
@Getter
@Setter
public class AlbumDTO implements Serializable {
    private Integer id;
    private String name;
    private String description;
    private CompetitionDTO competition;
    private List<ImageDTO> images;
}
