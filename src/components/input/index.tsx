import * as S from "./styled";

import { InputProps } from "./type";

export default function Input({
  value,
  keyboardType = "default",
  placeholder = "",
  label,
  mode = "dark",
  centreText = false,
  onChangeText,
}: InputProps) {
  return (
    <S.Container>
      {label && <S.Label mode={mode}>{label}</S.Label>}
      <S.Input
        value={value || ""}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor="#888"
        onChangeText={(text) => onChangeText(text)}
        mode={mode}
        centreText={centreText}
      />
    </S.Container>
  );
}
