import { ReactNode } from "react";

export interface IconButtonProps {
  children: ReactNode;
  disabled?: boolean;
  style?: object;
  onPress: () => void;
}
