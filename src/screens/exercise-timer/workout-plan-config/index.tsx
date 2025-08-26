import { useState } from "react";
import { FlatList, ScrollView, View } from "react-native";
import Button from "@components/button";
import Input from "@components/input";
import AppModal from "@components/modal";

import { REP_MODE } from "@lib/constants";

import * as S from "./styled";

import { WorkoutPlanConfigScreenProps } from "../type";

export default function WorkoutPlanConfigScreen({}: WorkoutPlanConfigScreenProps) {
  const [sets, setSets] = useState<number>();
  const [interSetRest, setInterSetRest] = useState<number>();
  const [modalVisible, setModalVisible] = useState(false);
  const [exerciseName, setExerciseName] = useState("");
  const [repMode, setRepMode] = useState<REP_MODE>(REP_MODE.DURATION);
  const [repValue, setRepValue] = useState(0);
  const [restDuration, setRestDuration] = useState(0);

  // const addExercise = () => {
  //   if (exerciseName !== "" && repValue > 0) {
  //     const updatedPlan = workoutPlan.concat([
  //       {
  //         name: exerciseName,
  //         repMode: repMode,
  //         repValue: repValue,
  //       },
  //     ]);
  //     setWorkoutPlan(updatedPlan);
  //     setExerciseName("");
  //     setRepValue(0);
  //   }
  // };

  // const addRest = () => {
  //   if (restDuration > 0) {
  //     const updatedPlan = workoutPlan.concat([restDuration]);
  //     setWorkoutPlan(updatedPlan);
  //     setRestDuration(0);
  //   }
  // };

  // const renderPlanItem = ({
  //   item,
  // }: {
  //   item: Exercise | number;
  //   index: number;
  // }) => {
  //   const isRest = typeof item === "number";
  //   if (isRest) {
  //     return (
  //       <S.PlanItem variant="rest">
  //         <S.PlanItemText>Rest</S.PlanItemText>
  //         <S.PlanItemValue>{item} seconds</S.PlanItemValue>
  //       </S.PlanItem>
  //     );
  //   }
  //   const valueLabel =
  //     item.repMode === COUNT
  //       ? `${item.repValue} reps`
  //       : `${item.repValue} seconds`;
  //   return (
  //     <S.PlanItem variant="exercise">
  //       <S.PlanItemText>{item.name}</S.PlanItemText>
  //       <S.PlanItemValue>{valueLabel}</S.PlanItemValue>
  //     </S.PlanItem>
  //   );
  // };

  return (
    <S.Container>
      <S.Title>Create workout</S.Title>

      <S.InputRow>
        <S.InputLabel>Sets</S.InputLabel>
        <S.InputContainer>
          <Input
            onChangeText={(text) => setSets(Number(text))}
            keyboardType="numeric"
            centreText
          />
        </S.InputContainer>
      </S.InputRow>

      <S.InputRow>
        <S.InputLabel>Inter-set Rest (seconds)</S.InputLabel>
        <S.InputContainer>
          <Input
            onChangeText={(text) => setInterSetRest(Number(text))}
            keyboardType="numeric"
            centreText
          />
        </S.InputContainer>
      </S.InputRow>

      <Button
        label="Add Exercise/Rest +"
        variant="secondary"
        handleOnPress={() => setModalVisible(true)}
      />

      <S.WorkoutPlanSection>
        <S.SectionTitle mode="dark">Workout Plan</S.SectionTitle>
        {/* <S.WorkoutPlanContainer>
          {workoutPlan.length === 0 ? (
            <S.SectionDescription>No exercises added yet.</S.SectionDescription>
          ) : (
            <FlatList
              data={workoutPlan}
              renderItem={renderPlanItem}
              keyExtractor={(_, index) => `plan-${index}`}
              showsVerticalScrollIndicator={false}
            />
          )}
        </S.WorkoutPlanContainer> */}

        <Button
          label="Start Workout"
          variant="primary"
          handleOnPress={() => console.log("start workout")}
        />
      </S.WorkoutPlanSection>

      <AppModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <S.SectionTitle mode="light">Add Exercise</S.SectionTitle>

          <S.ModalLabel>Name</S.ModalLabel>
          <Input
            value={exerciseName}
            onChangeText={(text) => setExerciseName(text)}
            mode="light"
          />

          <S.ModalLabel>Reps</S.ModalLabel>
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
            value={repValue > 0 ? String(repValue) : ""}
            onChangeText={(text) => setRepValue(Number(text))}
            placeholder={repMode === REP_MODE.COUNT ? "Reps" : "Seconds"}
            keyboardType="numeric"
            mode="light"
          />
          {/* <Button
            label="Add Exercise"
            variant="primary"
            handleOnPress={addExercise}
          /> */}

          <S.ModalHeading style={{ marginTop: 28 }}>Add rest</S.ModalHeading>

          <S.ModalLabel>Duration</S.ModalLabel>
          <Input
            value={restDuration > 0 ? String(restDuration) : ""}
            onChangeText={(text) => setRestDuration(Number(text))}
            placeholder="Seconds"
            keyboardType="numeric"
            mode="light"
          />

          {/* <Button label="Add Rest" variant="primary" handleOnPress={addRest} /> */}
        </ScrollView>
      </AppModal>
    </S.Container>
  );
}
