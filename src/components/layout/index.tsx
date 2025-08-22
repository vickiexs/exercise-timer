import { Container } from "./styled";

import { LayoutProps } from "./type";

export default function Layout({ children }: LayoutProps) {
  return <Container>{children}</Container>;
}
