export interface WorkoutConfig {
  sets: number;
  reps: number;
  interSetRest: number;
  interRepRest: number;
  repWorkTime: number;
}

export interface ConfigurationScreenProps {
  onStart: (config: WorkoutConfig) => void;
}

export interface TimerScreenProps {
  workoutConfig: WorkoutConfig;
  setIsTimerActive: (active: boolean) => void;
}
