import styled from 'styled-components';

import { Typography } from '@shared/ui/primitives';
import { Button } from '@shared/ui/atoms';
import Link from 'next/link';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 4px solid ${({ theme }) => theme.palette.secondary.dark};
`;
const HeaderInfo = styled.div`
  display: flex;
  flex-direction: row;
`;
const Avatar = styled.img`
  width: 30%;
  padding: 8px;
  object-fit: cover;
  border-right: 4px solid ${({ theme }) => theme.palette.secondary.dark};
  border-bottom: 4px solid ${({ theme }) => theme.palette.secondary.dark};
`;
const Info = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
`;
const BioText = styled(Typography)`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`;
const AboutButton = styled(Button)`
  display: inline-block;
  width: 100%;
  text-decoration: none;
  text-align: center;
`;
const ButtonWrapper = styled.div`
  margin: 8px;
`;

type Props = {
  link: string;
  name: string;
  imageURI?: string;
  description?: string;
};

export const AuthorAbout = ({ link, name, imageURI, description }: Props) => {
  return (
    <Wrapper>
      <HeaderInfo>
        {imageURI && <Avatar src={imageURI} alt={name} />}
        <Info>
          <Typography variant="h6" mb={1}>
            {name}
          </Typography>
          {description && <BioText>{description}</BioText>}
        </Info>
      </HeaderInfo>
      <ButtonWrapper>
        <Link href={link} passHref>
          <AboutButton as="a">Об авторе</AboutButton>
        </Link>
      </ButtonWrapper>
    </Wrapper>
  );
};
