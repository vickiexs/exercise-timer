import * as S from "./styled";

import { IconButtonProps } from "./type";

export default function IconButton({
  children,
  disabled = false,
  style,
  onPress,
}: IconButtonProps) {
  return (
    <S.IconButton onPress={onPress} disabled={disabled} style={style}>
      {children}
    </S.IconButton>
  );
}
