package edu.grupa2.strzelnica.models;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Setter
@Getter
public class DateAvailability {
    // Getters and setters
    private Date date;
    private String startTime;
    private String endTime;
    private Track track;

    public DateAvailability(Date date, String startTime, String endTime, Track track) {
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.track = track;
    }

}
