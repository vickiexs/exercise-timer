import { COUNT, DURATION, EXERCISE, REST } from "../../../lib/constants";

export interface ConfigurationScreenProps {
  onStart: (config: WorkoutConfig) => void;
}

export interface TimerScreenProps {
  workoutPlan: WorkoutPlan;
  setIsTimerActive: (active: boolean) => void;
}
export interface WorkoutConfig {
  sets: number;
  reps: number;
  interSetRest: number;
  interRepRest: number;
  repWorkTime: number;
}

export type WorkoutPlan = {
  workout: WorkoutItem[];
  sets: number;
  reps: number;
};

export interface WorkoutItem {
  name: string;
  repMode: typeof COUNT | typeof DURATION;
  repValue: number;
  type: typeof EXERCISE | typeof REST;
}
