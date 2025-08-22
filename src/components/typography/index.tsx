import * as S from "./styled";

import { TypographyProps } from "./type";

export default function Typography({
  children,
  variant = "body",
  color,
  style,
}: TypographyProps) {
  switch (variant) {
    case "heading":
      return (
        <S.Heading style={style} color={color}>
          {children}
        </S.Heading>
      );
    case "subheading":
      return (
        <S.SubHeading style={style} color={color}>
          {children}
        </S.SubHeading>
      );
    case "body":
      return (
        <S.Body style={style} color={color}>
          {children}
        </S.Body>
      );
  }
}
