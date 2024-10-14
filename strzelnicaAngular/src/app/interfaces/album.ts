import { Competition } from "./competition";

// Album model
export interface Album {
  id: number;
  name: string;
  description: string;
  competition?: Competition;
  images: string[];
}
