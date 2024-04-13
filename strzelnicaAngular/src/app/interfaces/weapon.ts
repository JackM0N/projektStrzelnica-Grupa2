// Weapon model
export interface Weapon {
    id?: number;
    name: string;
    uses_since_last_maintenance: number;
    maintenance_every: number;
    fit_for_use: boolean;
    price_per_hour: number;
    in_maintenance: boolean;
    serial_number: string;
  }