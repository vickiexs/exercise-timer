import * as S from "./styled";

import { ButtonProps } from "./type";

export default function Button({
  label,
  variant = "primary",
  disabled = false,
  style,
  handleOnPress,
}: ButtonProps) {
  switch (variant) {
    case "secondary":
      return (
        <S.SecondaryButton
          onPress={handleOnPress}
          disabled={disabled}
          style={style}
        >
          <S.ButtonText>{label}</S.ButtonText>
        </S.SecondaryButton>
      );
    default:
      return (
        <S.PrimaryButton
          onPress={handleOnPress}
          disabled={disabled}
          style={style}
        >
          <S.ButtonText>{label}</S.ButtonText>
        </S.PrimaryButton>
      );
  }
}
