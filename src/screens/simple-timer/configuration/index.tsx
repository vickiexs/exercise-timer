import { useState, useMemo } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

import { SCREENS } from "../../../../lib/constants";
import useCustomNavigateOnBack from "../../../../lib/hooks/useCustomNavigateOnBack";

import Typography from "../../../components/typography";
import Input from "../../../components/input";
import Button from "../../../components/button";

import * as S from "./styled";

import { ConfigurationScreenProps } from "../type";

export default function ConfigurationScreen({
  onStart,
}: ConfigurationScreenProps) {
  useCustomNavigateOnBack(SCREENS.HOME);

  const [sets, setSets] = useState<number | undefined>();
  const [reps, setReps] = useState<number | undefined>();
  const [interSetRest, setInterSetRest] = useState<number | undefined>();
  const [interRepRest, setInterRepRest] = useState<number | undefined>();
  const [repWorkTime, setRepWorkTime] = useState<number | undefined>();

  const validForm = useMemo(
    () =>
      [sets, reps, interSetRest, interRepRest, repWorkTime].every(
        (v) => v !== undefined && v !== 0
      ),
    [sets, reps, interSetRest, interRepRest, repWorkTime]
  );

  const handleStart = () => {
    if (validForm) {
      onStart({
        sets: sets as number,
        reps: reps as number,
        interSetRest: interSetRest as number,
        interRepRest: interRepRest as number,
        repWorkTime: repWorkTime as number,
      });
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
        <Typography variant="body">Configure your workout settings</Typography>
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
