import { Album } from "./album";

// Competition model
export interface Competition {
    id: number;
    name: string;
    description: string;
    date: Date;
    hourStart: number;
    hourEnd: number;
    done: boolean;

    // Optional properties
    album?: Album;
  }
  