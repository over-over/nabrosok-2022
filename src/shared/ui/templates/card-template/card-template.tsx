import { ReactNode } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.background.primary};
  border: 1px solid ${({ theme }) => theme.palette.border};
  padding: 12px;
`;

type Props = {
  className?: string;
  children: ReactNode;
};

export const CardTemplate = ({ className, children }: Props) => {
  return <Wrapper className={className}>{children}</Wrapper>;
};
