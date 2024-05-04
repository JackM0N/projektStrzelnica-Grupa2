// Weapon model
export interface Weapon {
    id?: number;
    name: string;
    usesSinceLastMaintenance: number;
    maintenanceEvery: number;
    fitForUse: boolean;
    pricePerHour: number;
    inMaintenance: boolean;
    serialNumber: string;
  }