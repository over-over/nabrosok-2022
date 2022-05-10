import { ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { lightTheme } from './light-theme';
import { ResetCSS } from './reset-css';

type Props = { children: ReactNode };

export const ThemeProvider = ({ children }: Props) => {
  return (
    <StyledThemeProvider theme={lightTheme}>
      <ResetCSS />
      {children}
    </StyledThemeProvider>
  );
};
