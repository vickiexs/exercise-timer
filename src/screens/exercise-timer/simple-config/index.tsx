import { useState, useMemo } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

import { SCREENS, REP_MODE, TIMER_TYPE } from "@lib/constants";
import useCustomNavigateOnBack from "@lib/hooks/useCustomNavigateOnBack";

import Typography from "@components/typography";
import Input from "@components/input";
import Button from "@components/button";

import * as S from "./styled";

import { SimpleConfigScreenProps, WorkoutPlan } from "../type";

export default function SimpleConfigScreen({
  onStart,
}: SimpleConfigScreenProps) {
  useCustomNavigateOnBack(SCREENS.HOME);

  const [sets, setSets] = useState<number>();
  const [reps, setReps] = useState<number>();
  const [interSetRest, setInterSetRest] = useState<number>();
  const [interRepRest, setInterRepRest] = useState<number>();
  const [repWorkTime, setRepWorkTime] = useState<number>();

  const validForm = useMemo(
    () =>
      [sets, reps, interSetRest, interRepRest, repWorkTime].every(
        (value) => value !== undefined && value !== 0
      ),
    [sets, reps, interSetRest, interRepRest, repWorkTime]
  );

  const handleStart = () => {
    if (validForm && reps) {
      let setList = [];
      for (let i = 0; i < reps; i++) {
        setList.push({
          name: "Exercise",
          repMode: REP_MODE.DURATION,
          repValue: repWorkTime,
          type: TIMER_TYPE.EXERCISE,
        });
        if (i < reps - 1) {
          setList.push({
            name: "Rest",
            repMode: REP_MODE.DURATION,
            repValue: interRepRest,
            type: TIMER_TYPE.REST,
          });
        }
      }
      setList.push({
        name: "Break",
        repMode: REP_MODE.DURATION,
        repValue: interSetRest,
        type: TIMER_TYPE.REST,
      });

      const finalPlan = {
        workout: setList,
        sets: sets,
        reps: reps,
      } as WorkoutPlan;

      onStart(finalPlan);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        style={{ gap: 10 }}
      >
        <Typography variant="heading" style={{ marginBottom: 20 }}>
          Exercise Timer
        </Typography>
        <Typography variant="body">Configure your workout settings:</Typography>
        <S.Container>
          <S.FormContainer>
            <Input
              label="Sets"
              value={sets !== undefined ? sets.toString() : ""}
              onChangeText={(text) =>
                setSets(text === "" ? undefined : Number(text))
              }
              keyboardType="numeric"
              centreText
            />
            <Input
              label="Reps"
              value={reps !== undefined ? reps.toString() : ""}
              onChangeText={(text) =>
                setReps(text === "" ? undefined : Number(text))
              }
              keyboardType="numeric"
              centreText
            />
            <Input
              label="Inter-set Rest (seconds)"
              value={interSetRest !== undefined ? interSetRest.toString() : ""}
              onChangeText={(text) =>
                setInterSetRest(text === "" ? undefined : Number(text))
              }
              keyboardType="numeric"
              centreText
            />
            <Input
              label="Inter-rep Rest (seconds)"
              value={interRepRest !== undefined ? interRepRest.toString() : ""}
              onChangeText={(text) =>
                setInterRepRest(text === "" ? undefined : Number(text))
              }
              keyboardType="numeric"
              centreText
            />
            <Input
              label="Rep Work Time (seconds)"
              value={repWorkTime !== undefined ? repWorkTime.toString() : ""}
              onChangeText={(text) =>
                setRepWorkTime(text === "" ? undefined : Number(text))
              }
              keyboardType="numeric"
              centreText
            />
          </S.FormContainer>
          <Button
            label="Start Workout"
            handleOnPress={handleStart}
            disabled={!validForm}
            style={{ marginTop: 40 }}
          />
        </S.Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
