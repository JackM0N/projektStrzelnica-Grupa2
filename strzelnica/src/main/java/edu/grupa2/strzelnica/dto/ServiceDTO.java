package edu.grupa2.strzelnica.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class ServiceDTO {
    private Integer id;
    private String name;
    private String description;
    private String image_url;
    private Float price;
    private TracktypeDTO tracktype;
}