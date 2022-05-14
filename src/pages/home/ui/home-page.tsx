import styled from 'styled-components';

import { TArtistDetails } from '@shared/lib';
import { Typography } from '@shared/ui/primitives';
import { Contacts } from '@shared/ui/molecules';
import { Box } from '@shared/ui';

const Wrapper = styled.main`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.palette.background.secondary};
  padding: 18x;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    padding: 16px;
  }
`;
const Content = styled.section`
  padding: 8px;
  padding-bottom: 52px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.palette.border};
  background-color: ${({ theme }) => theme.palette.background.primary};
  white-space: pre-wrap;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    padding: 12px;
    padding-bottom: 12px;
    width: 80%;
  }
`;
const MainTitle = styled(Typography)`
  padding: 4px 12px;
  background-color: ${({ theme }) => theme.palette.secondary.dark};
  color: ${({ theme }) => theme.palette.secondary.contrastText};
`;

export const HomePage = () => {
  return (
    <Wrapper>
      <Content>
        <MainTitle variant="h3" mt={3} mb={3}>
          Привет! 👋
        </MainTitle>
        <Typography variant="subtitle1" mb={2} textAlign="center">
          Вы наверное ожидали увидеть нечто крутое или{'\n'}хотя бы интересное
          на главной странице.
        </Typography>
        <Typography variant="subtitle1" textAlign="center">
          Увы, здесь ничего нет.
        </Typography>
        <Typography variant="subtitle1" textAlign="center">
          ¯\_(ツ)_/¯
        </Typography>
        <Typography variant="subtitle1" mt={4} textAlign="center">
          Лучше изучайте работы,{'\n'}почитайте об авторах и{'\n'}наслаждайтесь
          фестивалем!
        </Typography>
      </Content>
    </Wrapper>
  );
};
