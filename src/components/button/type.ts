export interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
  style?: object;
  icon?: React.ReactNode;
  handleOnPress: () => void;
}
