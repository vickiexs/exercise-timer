import * as S from "./styled";

import { ButtonProps } from "./type";

export default function Button({
  label,
  variant = "primary",
  mode = "light",
  disabled = false,
  handleOnPress,
}: ButtonProps) {
  switch (variant) {
    case "secondary":
      return (
        <S.SecondaryButton onPress={handleOnPress} disabled={disabled}>
          <S.ButtonText>{label}</S.ButtonText>
        </S.SecondaryButton>
      );
    default:
      return (
        <S.PrimaryButton onPress={handleOnPress} disabled={disabled}>
          <S.ButtonText>{label}</S.ButtonText>
        </S.PrimaryButton>
      );
  }
}
