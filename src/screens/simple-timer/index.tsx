import { useState } from "react";

import Layout from "../../components/layout";

import ConfigurationScreen from "./configuration";
import TimerScreen from "./timer";

import { WorkoutConfig } from "./type";

export default function SimpleTimer() {
  const [workoutConfig, setWorkoutConfig] = useState<WorkoutConfig | null>(
    null
  );
  const [isTimerActive, setIsTimerActive] = useState(false);

  const handleStartWorkout = (workoutConfig: WorkoutConfig) => {
    setWorkoutConfig(workoutConfig);
    setIsTimerActive(true);
  };

  return (
    <Layout>
      {isTimerActive && workoutConfig ? (
        <TimerScreen
          workoutConfig={workoutConfig}
          setIsTimerActive={setIsTimerActive}
        />
      ) : (
        <ConfigurationScreen onStart={handleStartWorkout} />
      )}
    </Layout>
  );
}
