import { WorkoutPlan } from "../type";

export interface WorkoutConfigurationProps {
  workoutPlan: WorkoutPlan;
  setWorkoutPlan: (props: WorkoutPlan) => void;
  setSetCount: (props: number) => void;
  setInterSetRest: (props: number) => void;
}
