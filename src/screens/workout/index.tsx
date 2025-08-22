import { useState } from "react";

import Layout from "../../components/layout";

import WorkoutConfiguration from "./configuration";

import { WorkoutPlan } from "./type";

export default function Workout() {
  const [setCount, setSetCount] = useState(0);
  const [interSetRest, setInterSetRest] = useState(0);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan>([]);

  return (
    <Layout>
      <WorkoutConfiguration
        workoutPlan={workoutPlan}
        setSetCount={setSetCount}
        setInterSetRest={setInterSetRest}
        setWorkoutPlan={setWorkoutPlan}
      />
    </Layout>
  );
}
