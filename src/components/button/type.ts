export interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary";
  mode?: "dark" | "light";
  disabled?: boolean;
  handleOnPress: () => void;
}
