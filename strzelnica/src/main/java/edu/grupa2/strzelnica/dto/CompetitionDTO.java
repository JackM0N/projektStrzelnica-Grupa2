package edu.grupa2.strzelnica.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

@Data
@Getter
@Setter
public class CompetitionDTO implements Serializable {
    private Integer id;
    private String name;
    private String description;
    private Date date;
    private Integer hourStart;
    private Integer hourEnd;
    private Boolean done;
}
