package edu.grupa2.strzelnica.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import java.math.BigDecimal;

@Setter
@Getter
@Entity
@Table(name = "course")
public class Course {
    @Id
    @ColumnDefault("nextval('course_id_seq'")
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "trainer_id", nullable = false)
    private Integer trainerId;

    @Column(name = "course_name", nullable = false, length = 100)
    private String courseName;

    @Column(name = "price", nullable = false)
    private BigDecimal price;
}