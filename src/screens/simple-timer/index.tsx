import { useState } from "react";

import { DURATION, EXERCISE, REST } from "../../../lib/constants";

import Layout from "../../components/layout";

import ConfigurationScreen from "./configuration";
import TimerScreen from "./timer";

import { WorkoutConfig, WorkoutPlan } from "./type";

export default function SimpleTimer() {
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const handleStartWorkout = (workoutConfig: WorkoutConfig) => {
    let setList = [];
    for (let i = 0; i < workoutConfig.reps; i++) {
      setList.push({
        name: "Exercise",
        repMode: DURATION,
        repValue: workoutConfig.repWorkTime,
        type: EXERCISE,
      });
      if (i < workoutConfig.reps - 1) {
        setList.push({
          name: "Rest",
          repMode: DURATION,
          repValue: workoutConfig.interRepRest,
          type: REST,
        });
      }
    }
    setList.push({
      name: "Rest",
      repMode: DURATION,
      repValue: workoutConfig.interSetRest,
      type: REST,
    });

    const finalPlan = {
      workout: setList,
      sets: workoutConfig.sets,
      reps: workoutConfig.reps,
    } as WorkoutPlan;

    setWorkoutPlan(finalPlan);
    setIsTimerActive(true);
  };

  return (
    <Layout>
      {isTimerActive && workoutPlan ? (
        <TimerScreen
          workoutPlan={workoutPlan}
          setIsTimerActive={setIsTimerActive}
        />
      ) : (
        <ConfigurationScreen onStart={handleStartWorkout} />
      )}
    </Layout>
  );
}
