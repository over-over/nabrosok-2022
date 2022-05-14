import styled from 'styled-components';
import { space, SpaceProps } from 'styled-system';

type ButtonVariant = 'primary' | 'secondary' | 'error' | 'warning' | 'success';

export const Button = styled.button<{ $variant?: ButtonVariant } & SpaceProps>`
  ${space}

  padding: 16px 24px;
  background-color: ${({ theme, $variant = 'primary' }) =>
    theme.palette[$variant].main};
  color: ${({ theme, $variant = 'primary' }) =>
    theme.palette[$variant].contrastText};
  border: none;

  text-transform: uppercase;
  font-family: ${({ theme }) => theme.typography.button.fontFamily};
  font-weight: ${({ theme }) => theme.typography.button.fontWeight};
  font-size: ${({ theme }) => theme.typography.button.fontSize};
  line-height: ${({ theme }) => theme.typography.button.lineHeight};
  color: ${({ theme }) => theme.typography.button.color};
  letter-spacing: ${({ theme }) => theme.typography.button.letterSpacing};

  transition: background-color 0.15s;

  &:hover,
  &:active,
  &:focus {
    background-color: ${({ theme }) => theme.palette.primary.dark};
  }
`;
