import { ReactNode } from "react";

export interface TypographyProps {
  children: ReactNode;
  variant?: "heading" | "subheading" | "body";
  color?: string;
  style?: object;
}
