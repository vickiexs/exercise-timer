import { COUNT, DURATION } from "../../../lib/constants";

export interface Exercise {
  name: string;
  repMode: typeof COUNT | typeof DURATION;
  repValue: number;
}

export type WorkoutPlan = (Exercise | number)[];
