import * as S from "./styled";

import { IconButtonProps } from "./type";

export default function IconButton({
  children,
  disabled = false,
  onPress,
}: IconButtonProps) {
  return (
    <S.IconButton onPress={onPress} disabled={disabled}>
      {children}
    </S.IconButton>
  );
}
