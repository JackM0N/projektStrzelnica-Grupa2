package edu.grupa2.strzelnica.services;

import edu.grupa2.strzelnica.models.*;
import edu.grupa2.strzelnica.repositories.ServiceAvailabilityRepository;
import edu.grupa2.strzelnica.repositories.ServiceReservationRepository;
import edu.grupa2.strzelnica.repositories.ServiceUnavailabilityRepository;
import edu.grupa2.strzelnica.repositories.TrackRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Date;
import java.sql.Time;
import java.text.SimpleDateFormat;
import java.util.*;

@org.springframework.stereotype.Service
public class AvailabilityService {

    @Autowired
    private ServiceAvailabilityRepository serviceAvailabilityRepository;

    @Autowired
    private ServiceReservationRepository serviceReservationRepository;

    @Autowired
    private ServiceUnavailabilityRepository serviceUnavailabilityRepository;

    @Autowired
    private TrackRepository trackRepository;

    private static final SimpleDateFormat TIME_FORMAT = new SimpleDateFormat("HH:mm:ss");

    public List<DateAvailability> getAvailableSlots(Integer service_id) {
        List<ServiceAvailability> availabilities = serviceAvailabilityRepository.findByServiceId(service_id);
        List<ServiceReservation> reservations = serviceReservationRepository.findByServiceId(service_id);
        List<ServiceUnavailability> unavailabilities = serviceUnavailabilityRepository.findByServiceId(service_id);

        Map<Date, Map<Time, List<Track>>> availableSlotsMap = new HashMap<>();
        List<DateAvailability> availableSlots = new ArrayList<>();
        Date today = new Date(System.currentTimeMillis());

        // Fetch tracks for the given service's track type
        Service service = serviceAvailabilityRepository.findById(service_id).orElse(null).getService();
        if (service == null) {
            return availableSlots;
        }
        List<Track> tracks = trackRepository.findByType(service.getTracktype());

        for (ServiceAvailability availability : availabilities) {
            Date startDate = availability.getStart_date();
            Date endDate = availability.getEnd_date();
            Date serviceDay = availability.getService_day();

            Calendar calendar = Calendar.getInstance();
            calendar.setTime(serviceDay);
            int targetDayOfWeek = calendar.get(Calendar.DAY_OF_WEEK);

            calendar.setTime(startDate);
            while (!startDate.after(endDate)) {
                if (calendar.get(Calendar.DAY_OF_WEEK) == targetDayOfWeek && !startDate.before(today)) {
                    Time startTime = availability.getService_time_start();
                    Time endTime = availability.getService_time_end();

                    availableSlotsMap.putIfAbsent(startDate, new HashMap<>());
                    Map<Time, List<Track>> daySlots = availableSlotsMap.get(startDate);

                    // Generate timeslots within the availability period
                    Time currentTime = startTime;
                    while (currentTime.before(endTime)) {
                        Time slotEndTime = new Time(currentTime.getTime() + 3600000); // Increment by 1 hour
                        if (slotEndTime.after(endTime)) {
                            slotEndTime = endTime;
                        }
                        daySlots.putIfAbsent(currentTime, new ArrayList<>(tracks)); // Initialize with all tracks
                        currentTime = slotEndTime; // Move to the next slot start time
                    }
                }
                // Move to the next day
                calendar.add(Calendar.DATE, 1);
                startDate = new Date(calendar.getTimeInMillis());
            }
        }

        // Remove reserved slots
        for (ServiceReservation reservation : reservations) {
            Date reservationDay = reservation.getDate();
            if (reservationDay.before(today)) {
                continue;
            }

            Time reservationStartTime = reservation.getStartTime();
            Track reservedTrack = reservation.getTrack();

            if (availableSlotsMap.containsKey(reservationDay)) {
                Map<Time, List<Track>> daySlots = availableSlotsMap.get(reservationDay);
                if (daySlots.containsKey(reservationStartTime)) {
                    List<Track> availableTracks = daySlots.get(reservationStartTime);
                    availableTracks.remove(reservedTrack);

                    // If no tracks are available, remove the time slot
                    if (availableTracks.isEmpty()) {
                        daySlots.remove(reservationStartTime);
                    }
                }
            }
        }

        // Remove unavailable slots
        for (ServiceUnavailability unavailability : unavailabilities) {
            Date unavailabilityStartDate = unavailability.getStart_date();
            Date unavailabilityEndDate = unavailability.getEnd_date();
            Time unavailabilityStartTime = unavailability.getStart_time();
            Time unavailabilityEndTime = unavailability.getEnd_time();

            for (Date date = unavailabilityStartDate; date.before(unavailabilityEndDate) || date.equals(unavailabilityEndDate); date = new Date(date.getTime() + 86400000L)) {
                if (date.before(today)) {
                    continue;
                }

                if (availableSlotsMap.containsKey(date)) {
                    Map<Time, List<Track>> daySlots = availableSlotsMap.get(date);

                    if (daySlots != null) {
                        Iterator<Map.Entry<Time, List<Track>>> iterator = daySlots.entrySet().iterator();

                        while (iterator.hasNext()) {
                            Map.Entry<Time, List<Track>> entry = iterator.next();
                            Time time = entry.getKey();

                            if ((time.equals(unavailabilityStartTime) || time.after(unavailabilityStartTime)) && (time.equals(unavailabilityEndTime) || time.before(unavailabilityEndTime))) {
                                iterator.remove();
                            }
                        }
                    }
                }
            }
        }

        // Convert the available slots map to a list of DateAvailability objects
        for (Map.Entry<Date, Map<Time, List<Track>>> entry : availableSlotsMap.entrySet()) {
            Date date = entry.getKey();
            for (Map.Entry<Time, List<Track>> timeEntry : entry.getValue().entrySet()) {
                Time startTime = timeEntry.getKey();
                Time endTime = new Time(startTime.getTime() + 3600000); // End time is one hour after start time
                List<Track> availableTracks = timeEntry.getValue();
                for (Track track : availableTracks) {
                    availableSlots.add(new DateAvailability(date, TIME_FORMAT.format(startTime), TIME_FORMAT.format(endTime), track));
                }
            }
        }

        return availableSlots;
    }
}
