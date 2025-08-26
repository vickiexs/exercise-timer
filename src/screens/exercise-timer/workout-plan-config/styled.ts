import styled from "styled-components/native";

import { View, Text, TouchableOpacity } from "react-native";

export const Container = styled(View)(({ theme }) => ({
  flex: 1,
  flexDirection: "column",
  gap: theme.spacing(5),
}));

export const SetInfoContainer = styled(View)(({ theme }) => ({
  gap: theme.spacing(5),
  marginVertical: theme.spacing(5),
}));

export const InputRow = styled(View)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}));

export const InputContainer = styled(View)(({ theme }) => ({
  width: 55,
}));

export const WorkoutPlanSection = styled(View)(({ theme }) => ({
  flex: 1,
  justifyContent: "space-between",
  marginVertical: theme.spacing(5),
}));

export const WorkoutPlanContainer = styled(View)(({ theme }) => ({
  flex: 1,
  gap: theme.spacing(2),
  marginTop: theme.spacing(3),
}));

export const FormContentContainer = styled(View)(({ theme }) => ({
  gap: theme.spacing(4),
  marginBottom: theme.spacing(8),
}));

export const RepInputContainer = styled(View)(({ theme }) => ({
  gap: theme.spacing(3),
}));

export const SegmentedRow = styled(View)(() => ({
  flexDirection: "row",
  width: "100%",
}));

interface SegmentProps {
  active?: boolean;
}

export const SegmentButton = styled(TouchableOpacity)<SegmentProps>(
  ({ theme, active }) => ({
    flex: 1,
    paddingVertical: "10px",
    alignItems: "center",
    backgroundColor: active ? theme.palette.black : "#D9D9D9",
    borderTopLeftRadius: theme.borderRadius.small,
    borderBottomLeftRadius: theme.borderRadius.small,
  })
);

export const SegmentButtonRight = styled(SegmentButton)(({ theme }) => ({
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  borderTopRightRadius: theme.borderRadius.small,
  borderBottomRightRadius: theme.borderRadius.small,
  marginLeft: "2px",
}));

export const SegmentButtonText = styled(Text)<SegmentProps>(
  ({ theme, active }) => ({
    fontFamily: theme.fonts.family,
    fontWeight: theme.fonts.weights.medium as any,
    fontSize: theme.fontSize(4),
    color: active ? theme.palette.white : theme.palette.black,
  })
);

export const PlanItem = styled(View)<{ variant: "exercise" | "rest" }>(
  ({ theme, variant }) => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor:
      variant === "exercise"
        ? theme.palette.secondary.main
        : theme.palette.tertiary.main,
    borderRadius: theme.borderRadius.small,
    paddingVertical: theme.spacing(3),
    paddingHorizontal: theme.spacing(4),
  })
);

export const PlanItemText = styled(Text)(({ theme }) => ({
  fontFamily: theme.fonts.family,
  fontWeight: theme.fonts.weights.regular as any,
  fontSize: theme.fontSize(4),
  color: theme.palette.white,
}));

export const PlanItemValue = styled(PlanItemText)(() => ({}));
