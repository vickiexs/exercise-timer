import styled from "styled-components/native";

import { View, Text, TouchableOpacity, FlatList } from "react-native";

export const Container = styled(View)(({ theme }) => ({
  flex: 1,
  flexDirection: "column",
  gap: "10px",
}));

export const Title = styled(Text)(({ theme }) => ({
  fontFamily: theme.fonts.family,
  fontWeight: theme.fonts.weights.medium as any,
  fontSize: theme.fonts.sizes.large,
  color: theme.palette.white,
}));

export const InputRow = styled(View)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: "24px",
}));

export const InputLabel = styled(Text)(({ theme }) => ({
  fontFamily: theme.fonts.family,
  fontWeight: theme.fonts.weights.regular as any,
  fontSize: theme.fonts.sizes.small,
  color: theme.palette.white,
}));

export const InputContainer = styled(View)(({ theme }) => ({
  width: "55px",
}));

export const SectionTitle = styled(Text)<{ mode: "light" | "dark" }>(
  ({ theme, mode }) => ({
    fontFamily: theme.fonts.family,
    fontWeight: theme.fonts.weights.medium,
    fontSize: "20px",
    color: mode === "light" ? theme.palette.text : theme.palette.white,
    marginTop: "32px",
  })
);

export const SectionDescription = styled(Text)(({ theme }) => ({
  fontFamily: theme.fonts.family,
  fontWeight: theme.fonts.weights.regular,
  fontSize: "14px",
  color: theme.palette.grey,
  fontStyle: "italic",
  marginTop: "10px",
  lineHeight: "22px",
}));

export const WorkoutPlanSection = styled(View)(({ theme }) => ({
  flex: 1,
  justifyContent: "space-between",
  marginTop: "24px",
  paddingBottom: theme.spacing(6),
}));

export const WorkoutPlanContainer = styled(View)(({ theme }) => ({
  flex: 1,
  gap: theme.spacing(2),
}));

export const ModalHeading = styled(Text)(({ theme }) => ({
  fontFamily: theme.fonts.family,
  fontWeight: theme.fonts.weights.medium as any,
  fontSize: theme.fonts.sizes.medium,
  color: theme.palette.black,
  marginTop: "8px",
  marginBottom: "12px",
}));

export const ModalLabel = styled(Text)(({ theme }) => ({
  fontFamily: theme.fonts.family,
  fontWeight: theme.fonts.weights.medium as any,
  fontSize: theme.fonts.sizes.small,
  color: theme.palette.black,
  marginTop: "12px",
  marginBottom: "4px",
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
    fontSize: theme.fonts.sizes.small,
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
    borderRadius: theme.borderRadius.large,
    paddingVertical: theme.spacing(6),
    paddingHorizontal: theme.spacing(8),
    marginTop: theme.spacing(4),
  })
);

export const PlanItemText = styled(Text)(({ theme }) => ({
  fontFamily: theme.fonts.family,
  fontWeight: theme.fonts.weights.regular as any,
  fontSize: theme.fonts.sizes.small,
  color: theme.palette.white,
}));

export const PlanItemValue = styled(PlanItemText)(() => ({}));
