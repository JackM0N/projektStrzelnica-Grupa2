
// Service reservation model
export interface ServiceReservation {
  id?: number;
  serviceId: number;
  date: Date;
  start_time: string;
  end_time: string;
}
