import React from "react";
import * as S from "./styled";
import { ProgressBarProps } from "./type";

export default function ProgressBar({ progress, fillColor }: ProgressBarProps) {
  return (
    <S.Background>
      <S.Fill progress={progress} fillColor={fillColor} />
    </S.Background>
  );
}
