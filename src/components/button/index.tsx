import * as S from "./styled";

import { ButtonProps } from "./type";

export default function Button({
  label,
  variant = "primary",
  disabled = false,
  icon,
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
          {icon}
        </S.SecondaryButton>
      );
    case "tertiary":
      return (
        <S.TertiaryButton
          onPress={handleOnPress}
          disabled={disabled}
          style={style}
        >
          <S.TertiaryButtonText>{label}</S.TertiaryButtonText>
          {icon}
        </S.TertiaryButton>
      );
    default:
      return (
        <S.PrimaryButton
          onPress={handleOnPress}
          disabled={disabled}
          style={style}
        >
          <S.ButtonText>{label}</S.ButtonText>
          {icon}
        </S.PrimaryButton>
      );
  }
}
