package edu.grupa2.strzelnica.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;

@Setter
@Entity
@Table(name = "news")
public class News {
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter
    @Column(name = "title")
    private String title;

    @Getter
    @Column(name = "picture")
    private String picture;

    @Getter
    @Column(name = "date")
    private Date date;

    @Getter
    @Column(name = "author_id")
    private Long authorId;

    @Getter
    @Column(name = "content")
    private String content;

    @Getter
    @Column(name = "deleted")
    private boolean deleted;
}
