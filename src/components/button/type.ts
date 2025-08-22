export interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  style?: object;
  handleOnPress: () => void;
}
