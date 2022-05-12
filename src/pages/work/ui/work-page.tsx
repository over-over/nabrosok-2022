import styled from 'styled-components';

import { TWorkDetails } from '@shared/lib';

const Wrapper = styled.main`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.palette.primary.main};
  padding: 16px;
`;
const Content = styled.section`
  min-height: 100%;
  width: 60%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.background.primary};
`;

const IMAGE_PREFIX =
  process.env.NODE_ENV === 'production' ? '/nabrosok-2022/' : '';

type Props = {
  workData: TWorkDetails;
};

export const WorkPage = ({ workData }: Props) => {
  return (
    <Wrapper>
      <Content>
        {workData.photo?.localURI && (
          <img
            src={IMAGE_PREFIX + workData.photo.localURI}
            alt={workData.name}
            width="512"
            height="512"
          />
        )}
        <p>{workData.name}</p>
        {workData.technique && <p>{workData.technique}</p>}
        {workData.size && <p>{workData.size}</p>}
        {workData.year && <p>{workData.year}</p>}
        {workData.description && <p>{workData.description}</p>}
      </Content>
    </Wrapper>
  );
};
