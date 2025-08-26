import { useState, useMemo } from "react";
import { FlatList, View } from "react-native";
import { useTheme } from "styled-components/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import useCustomNavigateOnBack from "@lib/hooks/useCustomNavigateOnBack";
import { SCREENS, REP_MODE, TIMER_TYPE } from "@lib/constants";

import Typography from "@components/typography";
import Button from "@components/button";
import Input from "@components/input";
import AppModal from "@components/modal";

import * as S from "./styled";
import { Label } from "@components/input/styled";

import { ConfigScreenProps, WorkoutPlan, WorkoutItem } from "../type";

export default function WorkoutPlanConfigScreen({
  onStart,
}: ConfigScreenProps) {
  useCustomNavigateOnBack(SCREENS.HOME);

  const theme = useTheme();

  const [sets, setSets] = useState<number>();
  const [interSetRest, setInterSetRest] = useState<number>();
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutItem[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [exerciseName, setExerciseName] = useState<string>();
  const [repMode, setRepMode] = useState<REP_MODE>(REP_MODE.DURATION);
  const [repValue, setRepValue] = useState<number>();
  const [restDuration, setRestDuration] = useState<number>();

  const validForm = useMemo(
    () =>
      [sets, interSetRest].every(
        (value) => value !== undefined && value !== 0
      ) &&
      workoutPlan.length > 0 &&
      workoutPlan[0].type !== TIMER_TYPE.REST &&
      workoutPlan[workoutPlan.length - 1].type !== TIMER_TYPE.REST,
    [sets, interSetRest, workoutPlan]
  );

  const validExercise = useMemo(
    () =>
      exerciseName !== undefined &&
      exerciseName.trim() !== "" &&
      repValue !== undefined &&
      repValue > 0,
    [exerciseName, repValue]
  );

  const addExercise = () => {
    if (validExercise && exerciseName && repValue) {
      const newExercise: WorkoutItem = {
        name: exerciseName,
        repMode: repMode,
        repValue: repValue,
        type: TIMER_TYPE.EXERCISE,
      };
      const updatedPlan = workoutPlan.concat([newExercise]);
      setWorkoutPlan(updatedPlan);
      setExerciseName("");
      setRepValue(undefined);
    }
  };

  const addRest = () => {
    if (restDuration && restDuration > 0) {
      const newRest: WorkoutItem = {
        name: "Rest",
        repMode: REP_MODE.DURATION,
        repValue: restDuration,
        type: TIMER_TYPE.REST,
      };
      const updatedPlan = workoutPlan.concat([newRest]);
      setWorkoutPlan(updatedPlan);
      setRestDuration(undefined);
    }
  };

  const handleStart = () => {
    if (validForm && interSetRest) {
      const reps = workoutPlan.reduce(
        (count, item) => count + (item.type === TIMER_TYPE.EXERCISE ? 1 : 0),
        0
      );

      const setList = [...workoutPlan];
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

  const renderPlanItem = ({ item }: { item: WorkoutItem; index: number }) => {
    if (item.type === TIMER_TYPE.REST) {
      return (
        <S.PlanItem variant="rest">
          <S.PlanItemText>Rest</S.PlanItemText>
          <S.PlanItemValue>{item.repValue} seconds</S.PlanItemValue>
        </S.PlanItem>
      );
    }

    const valueLabel =
      item.repMode === REP_MODE.COUNT
        ? `${item.repValue} reps`
        : `${item.repValue} seconds`;

    return (
      <S.PlanItem variant="exercise">
        <S.PlanItemText>{item.name}</S.PlanItemText>
        <S.PlanItemValue>{valueLabel}</S.PlanItemValue>
      </S.PlanItem>
    );
  };

  return (
    <S.Container>
      <Typography variant="heading">Create workout</Typography>
      <Typography variant="body">Configure your workout settings:</Typography>

      <S.SetInfoContainer>
        <S.InputRow>
          <Label mode="dark">Sets</Label>
          <S.InputContainer>
            <Input
              value={sets !== undefined ? sets.toString() : ""}
              onChangeText={(text) =>
                setSets(text === "" ? undefined : Number(text))
              }
              keyboardType="numeric"
              centreText
            />
          </S.InputContainer>
        </S.InputRow>

        <S.InputRow>
          <Label mode="dark">Inter-set Rest (seconds)</Label>
          <S.InputContainer>
            <Input
              value={interSetRest !== undefined ? interSetRest.toString() : ""}
              onChangeText={(text) =>
                setInterSetRest(text === "" ? undefined : Number(text))
              }
              keyboardType="numeric"
              centreText
            />
          </S.InputContainer>
        </S.InputRow>
      </S.SetInfoContainer>

      <Button
        label="Add Exercise/Rest"
        variant="secondary"
        handleOnPress={() => setModalVisible(true)}
        icon={
          <MaterialIcons name="add" size={24} color={theme.palette.white} />
        }
      />

      <S.WorkoutPlanSection>
        <S.WorkoutPlanHeadingContainer>
          <Typography variant="subheading">Workout Plan</Typography>
          {workoutPlan.length > 0 && (
            <Button
              label="Reset plan"
              variant="tertiary"
              handleOnPress={() => setWorkoutPlan([])}
              icon={
                <MaterialIcons
                  name="refresh"
                  size={16}
                  color={theme.palette.white}
                />
              }
            />
          )}
        </S.WorkoutPlanHeadingContainer>
        <S.WorkoutPlanContainer>
          {workoutPlan.length === 0 ? (
            <Typography
              variant="body"
              style={{ fontStyle: "italic", marginTop: 5 }}
            >
              No exercises added yet
            </Typography>
          ) : (
            <FlatList
              data={workoutPlan}
              renderItem={renderPlanItem}
              keyExtractor={(_, index) => `plan-${index}`}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => (
                <View style={{ height: theme.spacing(3) }} />
              )}
            />
          )}
        </S.WorkoutPlanContainer>

        <Button
          label="Start Workout"
          variant="primary"
          disabled={!validForm}
          handleOnPress={handleStart}
          style={{ marginTop: theme.spacing(5) }}
        />
      </S.WorkoutPlanSection>

      <AppModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <S.FormContentContainer>
          <Typography variant="subheading" color={theme.palette.text}>
            Add Exercise
          </Typography>
          <Input
            label="Name"
            value={exerciseName}
            onChangeText={(text) => setExerciseName(text)}
            mode="light"
          />

          <S.RepInputContainer>
            <Label mode="light">Reps</Label>
            <S.SegmentedRow>
              <S.SegmentButton
                active={repMode === REP_MODE.DURATION}
                onPress={() => setRepMode(REP_MODE.DURATION)}
              >
                <S.SegmentButtonText active={repMode === REP_MODE.DURATION}>
                  Duration
                </S.SegmentButtonText>
              </S.SegmentButton>
              <S.SegmentButtonRight
                active={repMode === REP_MODE.COUNT}
                onPress={() => setRepMode(REP_MODE.COUNT)}
              >
                <S.SegmentButtonText active={repMode === REP_MODE.COUNT}>
                  Count
                </S.SegmentButtonText>
              </S.SegmentButtonRight>
            </S.SegmentedRow>
            <Input
              value={repValue !== undefined ? repValue.toString() : ""}
              onChangeText={(text) =>
                setRepValue(text === "" ? undefined : Number(text))
              }
              placeholder={repMode === REP_MODE.COUNT ? "Reps" : "Seconds"}
              keyboardType="numeric"
              mode="light"
            />
          </S.RepInputContainer>

          <Button
            label="Add Exercise"
            variant="primary"
            disabled={!validExercise}
            handleOnPress={addExercise}
            style={{ marginTop: 15 }}
          />
        </S.FormContentContainer>

        <S.FormContentContainer>
          <Typography variant="subheading" color={theme.palette.text}>
            Add rest
          </Typography>

          <Input
            label="Duration"
            value={restDuration !== undefined ? restDuration.toString() : ""}
            onChangeText={(text) =>
              setRestDuration(text === "" ? undefined : Number(text))
            }
            placeholder="Seconds"
            keyboardType="numeric"
            mode="light"
          />

          <Button
            label="Add Rest"
            variant="primary"
            handleOnPress={addRest}
            disabled={restDuration === undefined || restDuration < 1}
            style={{ marginTop: 15 }}
          />
        </S.FormContentContainer>
      </AppModal>
    </S.Container>
  );
}
