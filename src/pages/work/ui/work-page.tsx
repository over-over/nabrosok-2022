import styled from 'styled-components';

import { TArtistDetails, TWorkDetails } from '@shared/lib';
import { Typography } from '@shared/ui/primitives';

const Wrapper = styled.main`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.palette.background.secondary};
  padding: 18x;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    padding: 16px;
  }
`;
const Content = styled.section`
  padding: 8px;
  padding-bottom: 48px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid ${({ theme }) => theme.palette.border};
  background-color: ${({ theme }) => theme.palette.background.primary};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    padding: 12px;
    padding-bottom: 12px;
    width: 80%;
    flex-direction: row;
  }
`;
const SummaryInfo = styled.summary`
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    margin-left: 16px;
    width: 50%;
  }
`;
const WorkTitle = styled(Typography)`
  padding: 4px 12px;
  background-color: ${({ theme }) => theme.palette.secondary.dark};
  color: ${({ theme }) => theme.palette.secondary.contrastText};
`;
const WorkImage = styled.img`
  width: 100%;
  margin-bottom: 8px;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
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
  workData: TWorkDetails;
  artistData: TArtistDetails;
};

export const WorkPage = ({ workData, artistData }: Props) => {
  return (
    <Wrapper>
      <Content>
        {workData.photo?.localURI && (
          <WorkImage
            src={IMAGE_PREFIX + workData.photo.localURI}
            alt={workData.name}
          />
        )}
        <SummaryInfo>
          <WorkTitle px={1} variant="subtitle1">
            {artistData.name}
          </WorkTitle>
          <WorkTitle mt={2} mb={4} variant="h4">
            {workData.name}
          </WorkTitle>
          <InfoWrapper>
            {workData.technique && (
              <InfoItem>
                <Typography variant="subtitle2" mb={1}>
                  Техника:
                </Typography>
                <Typography>{workData.technique}</Typography>
              </InfoItem>
            )}
            {workData.size && (
              <InfoItem>
                <Typography variant="subtitle2" mb={1}>
                  Размер:
                </Typography>
                <Typography>{workData.size}</Typography>
              </InfoItem>
            )}
            {workData.year && (
              <InfoItem>
                <Typography variant="subtitle2" mb={1}>
                  Год:
                </Typography>
                <Typography>{workData.year}</Typography>
              </InfoItem>
            )}
          </InfoWrapper>
          {workData.description && (
            <Typography variant="body2" mt={4} px={2}>
              {workData.description}
            </Typography>
          )}
        </SummaryInfo>
      </Content>
    </Wrapper>
  );
};
