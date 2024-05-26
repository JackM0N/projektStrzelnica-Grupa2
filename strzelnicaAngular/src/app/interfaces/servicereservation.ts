import { Service } from "./service";
import { Track } from "./track";

// Service reservation model
export interface ServiceReservation {
  id?: number;
  service?: Service;
  date: Date;
  startTime: string;
  end_time: string;
  price: number;
  track?: Track;
}
