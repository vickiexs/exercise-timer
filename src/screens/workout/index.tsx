import { useState } from "react";

import * as S from "./styled";

import WorkoutConfiguration from "./configuration";

import { WorkoutPlan } from "./type";

export default function Workout() {
  const [setCount, setSetCount] = useState(0);
  const [interSetRest, setInterSetRest] = useState(0);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan>([]);

  return (
    <S.Container>
      <WorkoutConfiguration
        workoutPlan={workoutPlan}
        setSetCount={setSetCount}
        setInterSetRest={setInterSetRest}
        setWorkoutPlan={setWorkoutPlan}
      />
    </S.Container>
  );
}
