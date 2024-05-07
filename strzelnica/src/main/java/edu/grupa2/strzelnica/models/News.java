package edu.grupa2.strzelnica.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "news")
public class News {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "picture")
    private String picture;

    @Column(name = "date")
    private Date date;

    @Column(name = "author_id", nullable = false)
    private Long authorId;

    @Column(name = "content")
    private String content;

    @Column(name = "deleted")
    private boolean deleted;
}
