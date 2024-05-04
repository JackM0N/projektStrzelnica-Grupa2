package edu.grupa2.strzelnica.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;

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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getTrainerId() {
        return trainerId;
    }

    public void setTrainerId(Integer trainerId) {
        this.trainerId = trainerId;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

}