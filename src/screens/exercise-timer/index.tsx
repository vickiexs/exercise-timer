import { useState } from "react";
import { Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { CONFIG_TYPE, SCREENS } from "@lib/constants";

import Layout from "@components/layout";

import SimpleConfigScreen from "./simple-config";
import WorkoutPlanConfigScreen from "./workout-plan-config";
import TimerScreen from "./timer";

import { WorkoutPlan } from "./type";

import { RootStackParamList } from "App";

export default function ExerciseTimer({
  route,
}: NativeStackScreenProps<RootStackParamList, SCREENS.EXERCISE_TIMER>) {
  const { configType } = route.params;

  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const handleStartWorkout = (workoutPlan: WorkoutPlan) => {
    setWorkoutPlan(workoutPlan);
    setIsTimerActive(true);
  };

  const ConfigScreen = () => {
    if (configType === CONFIG_TYPE.SIMPLE) {
      return <SimpleConfigScreen onStart={handleStartWorkout} />;
    } else {
      return <WorkoutPlanConfigScreen onStart={handleStartWorkout} />;
    }
  };

  return (
    <Layout>
      {isTimerActive && workoutPlan ? (
        <TimerScreen
          configType={configType}
          workoutPlan={workoutPlan}
          setIsTimerActive={setIsTimerActive}
        />
      ) : (
        <ConfigScreen />
      )}
    </Layout>
  );
}
