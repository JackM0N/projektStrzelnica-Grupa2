package edu.grupa2.strzelnica.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

@Data
@Getter
@Setter
public class NewsDTO implements Serializable {
    private Long id;
    private String title;
    private String picture;
    private Date date;
    private Long authorId;
    private String content;
    private boolean deleted;
}
