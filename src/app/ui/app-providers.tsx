import { ReactNode } from 'react';

import { ThemeProvider } from '@shared/ui';

type Props = { children: ReactNode };

export const AppProviders = ({ children }: Props) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
