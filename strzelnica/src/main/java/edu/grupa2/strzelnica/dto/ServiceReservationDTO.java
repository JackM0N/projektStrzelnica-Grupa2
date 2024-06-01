package edu.grupa2.strzelnica.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.sql.Time;

@Data
@Getter
@Setter
public class ServiceReservationDTO {
    private Integer id;
    private ServiceDTO service;
    private Date date;
    private Time startTime;
    private Time end_time;
    private Float price;
    private TrackDTO track;
}