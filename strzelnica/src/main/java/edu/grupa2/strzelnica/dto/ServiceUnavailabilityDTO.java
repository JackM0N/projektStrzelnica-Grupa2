package edu.grupa2.strzelnica.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.sql.Time;

@Data
@Getter
@Setter
public class ServiceUnavailabilityDTO {
    private Integer id;
    private ServiceDTO service;
    private Date start_date;
    private Time start_time;
    private Date end_date;
    private Time end_time;
}