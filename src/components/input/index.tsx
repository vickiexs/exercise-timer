import * as S from "./styled";

import { InputProps } from "./type";

export default function Input({
  value,
  keyboardType = "default",
  placeholder = "",
  mode = "dark",
  centreText = false,
  onChangeText,
}: InputProps) {
  return (
    <S.Input
      value={value || ""}
      keyboardType={keyboardType}
      placeholder={placeholder}
      placeholderTextColor="#888"
      onChangeText={(text) => onChangeText(text)}
      mode={mode}
      centreText={centreText}
    />
  );
}
