package edu.grupa2.strzelnica.dto;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class JoinRequestDto {
    private Long userId;
    private String message;
}
