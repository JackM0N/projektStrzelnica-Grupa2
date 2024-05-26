import { Track } from "./track";

export interface DateAvailability {
  date: Date;
  startTime?: string;
  endTime?: string;
  track?: Track;
}
