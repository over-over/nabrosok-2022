import styled from 'styled-components';
import { space, SpaceProps } from 'styled-system';

export const Divider = styled.hr<SpaceProps>`
  ${space}
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.palette.border};
`;
