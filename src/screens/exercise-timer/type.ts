import { REP_MODE, TIMER_TYPE, CONFIG_TYPE } from "@lib/constants";

export interface SimpleConfigScreenProps {
  onStart: (config: WorkoutPlan) => void;
}

export interface WorkoutPlanConfigScreenProps {
  // workoutPlan: WorkoutPlan;
  // setWorkoutPlan: (props: WorkoutPlan) => void;
  // setSetCount: (props: number) => void;
  // setInterSetRest: (props: number) => void;
}

export interface TimerScreenProps {
  configType: CONFIG_TYPE;
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
  repMode: REP_MODE;
  repValue: number;
  type: TIMER_TYPE;
}
