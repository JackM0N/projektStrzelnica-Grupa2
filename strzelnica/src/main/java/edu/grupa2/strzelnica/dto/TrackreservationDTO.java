package edu.grupa2.strzelnica.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Instant;

@Data
@Getter
@Setter
public class TrackreservationDTO {
    private Integer id;
    private UserDTO user;
    private TrackDTO track;
    private Instant reservedFrom;
    private Instant reservedTo;
    private BigDecimal price;
}