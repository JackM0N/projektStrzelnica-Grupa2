package edu.grupa2.strzelnica.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.sql.Time;

@Data
@Getter
@Setter
public class ServiceAvailabilityDTO {
    private Integer id;
    private ServiceDTO service;
    private Date start_date;
    private Date end_date;
    private Date service_day;
    private Time service_time_start;
    private Time service_time_end;
}