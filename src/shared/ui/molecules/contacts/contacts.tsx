import styled, { useTheme } from 'styled-components';
import { space } from 'styled-system';

import { IconEmail, IconTelegram, IconVk } from '@shared/ui/icons';
import { Typography } from '@shared/ui/primitives';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const LinksWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const Link = styled.a`
  ${space}
  padding: 20px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;

  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.contrastText};
  text-decoration: none;

  transition: background-color 0.15s;

  &:hover,
  &:active,
  &:focus {
    background-color: ${({ theme }) => theme.palette.primary.dark};
  }
  &:last-child {
    margin-right: 0;
  }
`;
const MainTitle = styled(Typography)`
  padding: 4px 12px;
  background-color: ${({ theme }) => theme.palette.secondary.dark};
  color: ${({ theme }) => theme.palette.secondary.contrastText};
`;

type Props = {
  email?: string;
  vk?: string;
  telegram?: string;
};

export const Contacts = ({ email, vk, telegram }: Props) => {
  const theme = useTheme();
  const hasAnyLink = telegram || vk || email;

  if (!hasAnyLink) {
    return null;
  }

  return (
    <Wrapper>
      <Typography mb={2} variant="h6">
        Контакты
      </Typography>
      <LinksWrapper>
        {telegram && (
          <Link href={telegram}>
            <IconTelegram size={48} color={theme.palette.secondary.dark} />
          </Link>
        )}
        {vk && (
          <Link href={vk}>
            <IconVk size={48} color={theme.palette.secondary.dark} />
          </Link>
        )}
        {email && (
          <Link href={email}>
            <IconEmail size={48} color={theme.palette.secondary.dark} />
          </Link>
        )}
      </LinksWrapper>
    </Wrapper>
  );
};
