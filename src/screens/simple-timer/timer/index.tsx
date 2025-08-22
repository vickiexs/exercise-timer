import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigation, StackActions } from "@react-navigation/native";
import { useTheme } from "styled-components/native";
import { Vibration } from "react-native";

import Typography from "../../../components/typography";
import Button from "../../../components/button";

import { TimerScreenProps } from "../type";
import * as S from "./styled";

function formatSeconds(totalSeconds: number) {
  const mm = Math.floor(totalSeconds / 60);
  const ss = totalSeconds % 60;
  return `${mm}:${ss.toString().padStart(2, "0")}`;
}

export default function TimerScreen({
  workoutConfig,
  setIsTimerActive,
}: TimerScreenProps) {
  const { sets, reps, interSetRest, interRepRest, repWorkTime } = workoutConfig;

  const theme = useTheme();
  const navigation = useNavigation<any>();

  const totalReps = sets * reps;
  // const totalSecondsPerRep = repWorkTime + interRepRest;

  const [currentSet, setCurrentSet] = useState(1);
  const [currentRep, setCurrentRep] = useState(1);
  const [isRunning, setIsRunning] = useState(true);
  const [phaseTimeLeft, setPhaseTimeLeft] = useState(repWorkTime);
  const [phaseIsWork, setPhaseIsWork] = useState(true);

  const intervalRef = useRef<number | null>(null);

  const overallProgressPercent = useMemo(() => {
    const completedReps =
      (currentSet - 1) * reps + (currentRep - 1) + (phaseIsWork ? 0 : 1);
    const percent = (completedReps / totalReps) * 100;
    return Math.max(0, Math.min(100, percent));
  }, [currentSet, currentRep, phaseIsWork, reps, totalReps]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setPhaseTimeLeft((prev) => prev - 1);
      }, 1000) as unknown as number;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current as any);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  useEffect(() => {
    if (phaseTimeLeft <= 0) {
      // transition
      if (phaseIsWork) {
        // finished work for a rep -> start inter-rep rest if any
        if (interRepRest > 0) {
          setPhaseIsWork(false);
          setPhaseTimeLeft(interRepRest);
        } else {
          advanceRepOrSet();
        }
      } else {
        // finished rest -> advance rep
        advanceRepOrSet();
      }
    }

    // play tick/beep on the last 3 seconds
    if (isRunning && phaseTimeLeft > 0 && phaseTimeLeft <= 3) {
      Vibration.vibrate(150);
    }
  }, [phaseTimeLeft, phaseIsWork, interRepRest, isRunning]);

  const advanceRepOrSet = () => {
    const isLastRepInSet = currentRep >= reps;
    const isLastSet = currentSet >= sets;

    if (!isLastRepInSet) {
      setCurrentRep((r) => r + 1);
      setPhaseIsWork(true);
      setPhaseTimeLeft(repWorkTime);
    } else if (!isLastSet) {
      // move to next set
      setCurrentSet((s) => s + 1);
      setCurrentRep(1);
      setPhaseIsWork(true);
      setPhaseTimeLeft(repWorkTime);

      // inter-set rest
      if (interSetRest > 0) {
        setPhaseIsWork(false);
        setPhaseTimeLeft(interSetRest);
      }
    } else {
      // workout complete
      setIsRunning(false);
      navigation.navigate("Success");
    }
  };

  const handleStartPause = () => {
    setIsRunning((v) => !v);
  };

  const skipForward = () => {
    // If currently in work phase, try to go to rest (if defined) or advance
    if (phaseIsWork) {
      if (interRepRest > 0) {
        setPhaseIsWork(false);
        setPhaseTimeLeft(interRepRest);
      } else {
        advanceRepOrSet();
      }
    } else {
      // if in rest, advance immediately
      advanceRepOrSet();
    }
  };

  const skipBack = () => {
    // If in rest, go back to work for the current rep
    if (!phaseIsWork) {
      setPhaseIsWork(true);
      setPhaseTimeLeft(repWorkTime);
      return;
    }

    // If in work and not the first rep, go to previous rep's work
    if (currentRep > 1) {
      setCurrentRep((r) => r - 1);
      setPhaseIsWork(true);
      setPhaseTimeLeft(repWorkTime);
      return;
    }

    // If first rep but not first set, go to previous set's last rep
    if (currentSet > 1) {
      setCurrentSet((s) => s - 1);
      setCurrentRep(reps);
      setPhaseIsWork(true);
      setPhaseTimeLeft(repWorkTime);
      return;
    }

    // Otherwise already at the beginning — reset current phase time
    setPhaseTimeLeft(repWorkTime);
  };

  return (
    <S.Container>
      <S.Card>
        <S.CardCenter>
          <Typography variant="body" color={theme.palette.text}>
            Overall Progress
          </Typography>
          <S.ProgressBarBackground>
            <S.ProgressBarFill widthPercent={overallProgressPercent} />
          </S.ProgressBarBackground>
          <S.SmallText>
            {`Set ${currentSet} of ${sets} • Rep ${currentRep} of ${reps}`}
          </S.SmallText>
        </S.CardCenter>
      </S.Card>

      <S.Card>
        <S.CardCenter>
          <S.TimerLabel>{phaseIsWork ? "Work" : "Rest"}</S.TimerLabel>
          <S.TimerValue>{formatSeconds(phaseTimeLeft)}</S.TimerValue>
          <S.ProgressBarBackground>
            <S.ProgressBarFill
              widthPercent={
                phaseIsWork
                  ? (1 - phaseTimeLeft / repWorkTime) * 100
                  : (1 - phaseTimeLeft / (interRepRest || 1)) * 100
              }
            />
          </S.ProgressBarBackground>
        </S.CardCenter>
      </S.Card>

      <S.ControlsRow>
        <S.ControlButton onPress={skipBack} variant="secondary">
          <S.ControlButtonText style={{ color: "#111" }}>
            {"⟵"}
          </S.ControlButtonText>
        </S.ControlButton>

        <S.ControlButton onPress={handleStartPause}>
          <S.ControlButtonText>{isRunning ? "||" : "▶"}</S.ControlButtonText>
        </S.ControlButton>

        <S.ControlButton onPress={skipForward} variant="secondary">
          <S.ControlButtonText style={{ color: "#111" }}>
            {"⟶"}
          </S.ControlButtonText>
        </S.ControlButton>
      </S.ControlsRow>
      <Button
        label="Cancel"
        variant="secondary"
        handleOnPress={() => setIsTimerActive(false)}
      />
    </S.Container>
  );
}
