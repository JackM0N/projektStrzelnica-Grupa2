package edu.grupa2.strzelnica.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CompetitionParticipantDTO {
    private Integer id;
    private Integer competitionId;
    private Long userId;
    private Integer score;
    private Integer weaponId;
    private Integer place;
}
