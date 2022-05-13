import styled from 'styled-components';
import {
  space,
  color,
  layout,
  flexbox,
  grid,
  display,
  SpaceProps,
  ColorProps,
  LayoutProps,
  GridProps,
  DisplayProps,
} from 'styled-system';

export const Box = styled.div<
  SpaceProps & ColorProps & LayoutProps & GridProps & DisplayProps
>`
  ${space}
  ${color}
  ${layout}
  ${flexbox}
  ${grid}
  ${display}
`;
