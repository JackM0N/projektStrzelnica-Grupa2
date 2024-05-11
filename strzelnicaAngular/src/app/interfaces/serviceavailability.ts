
// Service availability model
export interface ServiceAvailability {
  id?: number;
  service_id: number;
  start_date: Date;
  end_date: Date;
  service_day: Date;
  service_time_start: string;
  service_time_end: string;
}
