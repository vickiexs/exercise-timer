export interface InputProps {
  value?: string;
  keyboardType?: "default" | "numeric";
  placeholder?: string;
  mode?: "light" | "dark";
  centreText?: boolean;
  onChangeText: (text: string) => void;
}
