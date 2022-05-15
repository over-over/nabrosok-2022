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
  border: 1px solid ${({ theme }) => theme.palette.border};
  background-color: ${({ theme }) => theme.palette.background.primary};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    padding: 12px;
    padding-bottom: 12px;
    width: 80%;
    flex-direction: row;
  }
`;
const SummaryInfo = styled.summary`
  @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    margin-left: 16px;
    width: 50%;
  }
`;
const MainTitle = styled(Typography)`
  padding: 4px 12px;
  background-color: ${({ theme }) => theme.palette.secondary.dark};
  color: ${({ theme }) => theme.palette.secondary.contrastText};
`;
const WorkImage = styled.img`
  width: 100%;
  margin-bottom: 8px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    width: 50%;
  }
`;
const InfoWrapper = styled.ul`
  display: flex;
  flex-direction: row;
`;
const InfoItem = styled.li`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 16px;
  border-right: 2px solid ${({ theme }) => theme.palette.border};
  &:last-child {
    border-right: none;
  }
`;

const IMAGE_PREFIX =
  process.env.NODE_ENV === 'production' ? '/nabrosok-2022/' : '';

type Props = {
  artistData: TArtistDetails;
};

export const ArtistPage = ({ artistData }: Props) => {
  const age = artistData.birthDate
    ? new Date().getFullYear() - new Date(artistData.birthDate).getFullYear()
    : undefined;
  const hasAnyContact =
    artistData.telegram || artistData.vk || artistData.email;
  return (
    <Wrapper>
      <Content>
        {artistData.photo?.localURI && (
          <WorkImage
            src={IMAGE_PREFIX + artistData.photo.localURI}
            alt={artistData.name}
          />
        )}
        <SummaryInfo>
          <MainTitle mb={3} variant="h4">
            {artistData.name}
          </MainTitle>
          <InfoWrapper>
            {artistData.style && (
              <InfoItem>
                <Typography variant="subtitle2" mb={1}>
                  Жанр:
                </Typography>
                <Typography>{artistData.style}</Typography>
              </InfoItem>
            )}
            {age && age < 50 ? (
              <InfoItem>
                <Typography variant="subtitle2" mb={1}>
                  Возраст:
                </Typography>
                <Typography>
                  {age.toLocaleString('ru', {
                    style: 'unit',
                    unit: 'year',
                    unitDisplay: 'long',
                  })}
                </Typography>
              </InfoItem>
            ) : null}
          </InfoWrapper>
          {artistData.biography && (
            <Typography variant="body2" mt={4} px={2}>
              {artistData.biography}
            </Typography>
          )}
          {hasAnyContact && (
            <Box mt={4} px={1}>
              <Contacts
                email={
                  artistData.email ? `mailto:${artistData.email}` : undefined
                }
                vk={artistData.vk}
                telegram={
                  artistData.telegram
                    ? `https://t.me/${artistData.telegram.slice(1)}`
                    : undefined
                }
              />
            </Box>
          )}
        </SummaryInfo>
      </Content>
    </Wrapper>
  );
};
