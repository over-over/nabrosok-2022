import styled from 'styled-components';
import { QRCodeSVG } from 'qrcode.react';

import works from '../../../../data/works.json';
import artists from '../../../../data/artists.json';
import artistNames from '../../../../data/artist-qr-names.json';
import { TArtistDetails, TWorkDetails } from '@shared/lib';

const Wrapper = styled.main`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const CodeCard = styled.div`
  width: 50%;
  height: 16.666667vh;
  /* height: 49.5mm; */
  font-family: sans-serif;
  padding: 4mm;
  border: 2mm solid black;
  display: flex;
  flex-direction: row;
  overflow-wrap: break-word;
  word-break: break-word;
  &:nth-child(12n) {
    background-color: yellow;
    page-break-after: always;
  }
`;
const WorkInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 3mm;
`;
const Title = styled.p`
  font-size: 16pt;
  font-weight: bold;
  margin-bottom: 3mm;
`;
const InfoText = styled.p`
  font-size: 12pt;
  margin-bottom: 3mm;
`;

type Props = {};

// let titleSizes: Record<string, string> = {};
// const setTitleSizes = (id: string, size: string) => {
//   titleSizes = { ...titleSizes, [id]: size };
// };

export const QRListPage = ({}: Props) => {
  // const [titleSizes, setTitleSizes] = useState<Record<string, string>>({});
  // const [titleSizes, setTitleSizes] = useState<Record<string, string>>({});
  return (
    <Wrapper>
      {(Object.values(works) as TWorkDetails[]).map(item => {
        const artistDetails = artists[
          item.artistId as keyof typeof artists
        ] as TArtistDetails;
        const artistName =
          artistNames[artistDetails.name as keyof typeof artistNames] ??
          artistDetails.name;
        return (
          <CodeCard key={item.id}>
            <QRCodeSVG
              value={`https://over-over.github.io/nabrosok-2022/work/${item.id}`}
              size={141}
              bgColor={'#ffffff'}
              fgColor={'#000000'}
              level={'H'}
              style={{ minWidth: 141 }}
            />
            <WorkInfo>
              <Title
                // ref={ref => {
                //   const divHeight = ref?.offsetHeight ?? 0;
                //   const lineHeight = 21;
                //   const lines = divHeight / lineHeight;
                //   if (lines > 2 || item.name.length > 40) {
                //     // setTitleSizes(item.id, '14pt');
                //     setTitleSizes(values => ({ ...values, [item.id]: '14pt' }));
                //     return;
                //   }
                //   if (lines > 3 || item.name.length > 60) {
                //     // setTitleSizes(item.id, '12pt');
                //     setTitleSizes(values => ({ ...values, [item.id]: '12pt' }));
                //     return;
                //   }
                //   console.log('lines:', lines, item.name);
                // }}
                style={{
                  fontSize:
                    item.name.length > 70
                      ? '10pt'
                      : item.name.length > 40
                      ? '12pt'
                      : item.name.length > 25
                      ? '14pt'
                      : undefined,
                }}
              >
                {item.name}
              </Title>
              <InfoText>{item.year}</InfoText>
              <InfoText>{artistName}</InfoText>
            </WorkInfo>
          </CodeCard>
        );
      })}
    </Wrapper>
  );
};
