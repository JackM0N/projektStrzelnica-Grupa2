import { Tracktype } from "./tracktype";

// Service model
export interface Service {
  id: number;
  name: string;
  description: string;
  image_url: string;
  price: number;
  tracktype?: Tracktype;
}
