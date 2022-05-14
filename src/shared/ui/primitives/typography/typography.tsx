import { HTMLAttributes, ReactNode } from 'react';
import styled, { TypographyVariant } from 'styled-components';
import { space, typography, TypographyProps, SpaceProps } from 'styled-system';

const tagTypographyMap: Record<TypographyVariant, string> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  caption: 'p',
  button: 'p',
  overline: 'p',
};

const Text = styled.p<{ $variant: TypographyVariant }>`
  ${space}
  ${typography}
  font-family: ${({ theme, $variant }) =>
    theme.typography[$variant].fontFamily};
  font-weight: ${({ theme, $variant }) =>
    theme.typography[$variant].fontWeight};
  font-size: ${({ theme, $variant }) => theme.typography[$variant].fontSize};
  line-height: ${({ theme, $variant }) =>
    theme.typography[$variant].lineHeight};
  color: ${({ theme, $variant }) => theme.typography[$variant].color};
  letter-spacing: ${({ theme, $variant }) =>
    theme.typography[$variant].letterSpacing};
`;

type Props = { variant?: TypographyVariant; children: ReactNode } & SpaceProps &
  TypographyProps &
  HTMLAttributes<HTMLParagraphElement>;

export const Typography = ({ variant = 'body2', ...rest }: Props) => {
  return (
    <Text
      $variant={variant}
      //@ts-ignore
      as={tagTypographyMap[variant]}
      {...rest}
    />
  );
};
