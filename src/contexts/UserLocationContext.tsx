import { createContext, Context } from "react";

interface LocationState {
  location: {
    latitude: number;
    longitude: number;
  } | null;
  setLocation: (location: LocationState['location']) => void;
}

export const UserLocationContext: Context<LocationState | null> = createContext<LocationState | null>(null);