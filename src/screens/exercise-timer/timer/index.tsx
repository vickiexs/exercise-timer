import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  useNavigation,
  ParamListBase,
  NavigationProp,
} from "@react-navigation/native";
import { useTheme } from "styled-components/native";
import { Vibration, View } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import Typography from "@components/typography";
import Button from "@components/button";
import IconButton from "@components/icon-button";
import ProgressBar from "@components/progress-bar";

import { formatTime } from "@lib/utils";
import { REP_MODE, SCREENS, TIMER_TYPE } from "@lib/constants";

import * as S from "./styled";

import { TimerScreenProps } from "../type";

export default function TimerScreen({
  configType,
  workoutPlan,
  setIsTimerActive,
}: TimerScreenProps) {
  const { workout, sets, reps } = workoutPlan;

  const theme = useTheme();
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [currentRep, setCurrentRep] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(workout[0].repValue);

  const intervalRef = useRef<number | null>(null);
  const isLastSet = currentSet === sets;
  const isLastRep = currentRep === reps;
  const isLastItem = currentIndex === workout.length - 1;

  useEffect(() => {
    if (!isPaused && workout[currentIndex].repMode === REP_MODE.DURATION) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000) as unknown as number;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current as any);
        intervalRef.current = null;
      }
    };
  }, [isPaused, currentIndex]);

  useEffect(() => {
    if (timeLeft > 3) return;

    if (timeLeft > 0) {
      Vibration.vibrate(150);
      return;
    }

    if (isLastItem) {
      advanceSet();
    } else {
      advanceRep();
    }
  }, [timeLeft]);

  useEffect(() => {
    setTimeLeft(workout[currentIndex]?.repValue);
  }, [currentIndex]);

  const advanceRep = () => {
    if (isLastSet && isLastRep) {
      setIsPaused(true);
      navigation.navigate(SCREENS.SUCCESS, { configType });
      return;
    }

    if (workout[currentIndex + 1].type === TIMER_TYPE.EXERCISE) {
      setCurrentRep((prev) => prev + 1);
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const advanceSet = () => {
    if (isLastSet) {
      setIsPaused(true);
      navigation.navigate(SCREENS.SUCCESS, { configType });
      return;
    }

    setCurrentSet((prev) => prev + 1);
    setCurrentRep(1);
    setCurrentIndex(0);
  };

  const timerColor = useMemo(
    () =>
      workout[currentIndex].type === TIMER_TYPE.EXERCISE
        ? theme.palette.secondary.main
        : theme.palette.tertiary.main,
    [currentIndex]
  );

  const nextExercise = () => {
    let index = currentIndex + 1;

    while (index < workout.length && workout[index].type === TIMER_TYPE.REST) {
      index += 1;
    }

    if (index >= workout.length) {
      advanceSet();
      return;
    }

    setCurrentIndex(index);
    setCurrentRep((prev) => prev + 1);
  };

  const prevExercise = () => {
    if (
      workout[currentIndex].type === TIMER_TYPE.EXERCISE &&
      workout[currentIndex].repValue - timeLeft > 0
    ) {
      setTimeLeft(workout[currentIndex].repValue);
      return;
    }

    let index = currentIndex - 1;

    while (index >= 0 && workout[index].type === TIMER_TYPE.REST) {
      index -= 1;
    }

    if (index < 0 && currentSet === 1) {
      return;
    }

    if (index < 0 && currentSet > 1) {
      let lastIndex = workout.length - 1;
      while (lastIndex > 0 && workout[lastIndex].type === TIMER_TYPE.REST) {
        lastIndex -= 1;
      }

      setCurrentSet((prev) => prev - 1);
      setCurrentIndex(lastIndex);
      setCurrentRep(reps);
      return;
    }

    if (workout[currentIndex].type === TIMER_TYPE.EXERCISE) {
      setCurrentRep((prev) => prev - 1);
    }
    setCurrentIndex(index);
  };

  const completeReps = () => {
    setIsPaused(false);
    if (workout[currentIndex + 1].type === TIMER_TYPE.EXERCISE) {
      setCurrentRep((prev) => prev + 1);
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const overallProgressPercent = useMemo(
    () => (((currentSet - 1) * reps + currentRep) / (sets * reps)) * 100,
    [currentRep, currentSet]
  );

  return (
    <S.Container>
      <S.ProgressContainer>
        <Typography variant="subheading">Overall Progress</Typography>
        <Typography variant="body" style={{ marginBottom: 8 }}>
          {`Set ${currentSet} of ${sets} • Rep ${currentRep} of ${reps}`}
        </Typography>
        <ProgressBar
          progress={overallProgressPercent}
          fillColor={theme.palette.white}
        />
      </S.ProgressContainer>

      <S.ProgressContainer>
        <Typography variant="subheading" color={timerColor}>
          {workout[currentIndex].name}
        </Typography>
        {workout[currentIndex].repMode === REP_MODE.DURATION ? (
          <S.TimerContainer>
            <S.TimerValue color={timerColor}>
              {formatTime(timeLeft)}
            </S.TimerValue>
            <ProgressBar
              progress={(1 - timeLeft / workout[currentIndex].repValue) * 100}
              fillColor={timerColor}
            />
          </S.TimerContainer>
        ) : (
          <View>
            <S.RepCount color={timerColor}>
              {`${workout[currentIndex].repValue} reps`}
            </S.RepCount>
            <Button
              label="Complete"
              variant="primary"
              handleOnPress={completeReps}
              style={{ marginTop: theme.spacing(2) }}
            />
          </View>
        )}
      </S.ProgressContainer>

      <S.ButtonContainer>
        <S.Controls>
          <IconButton
            onPress={prevExercise}
            disabled={
              currentSet === 1 &&
              currentIndex === 0 &&
              timeLeft === workout[0].repValue
            }
          >
            <MaterialIcons name="skip-previous" size={32} color="white" />
          </IconButton>

          <IconButton
            onPress={() => setIsPaused((prev) => !prev)}
            disabled={workout[currentIndex].repMode === REP_MODE.COUNT}
          >
            <MaterialIcons
              name={isPaused ? "play-arrow" : "pause"}
              size={32}
              color="white"
            />
          </IconButton>

          <IconButton onPress={nextExercise}>
            <MaterialIcons name="skip-next" size={32} color="white" />
          </IconButton>
        </S.Controls>
        <Button
          label="Cancel"
          variant="secondary"
          handleOnPress={() => setIsTimerActive(false)}
        />
      </S.ButtonContainer>
    </S.Container>
  );
}
