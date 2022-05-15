import styled from 'styled-components';
import { QRCodeSVG } from 'qrcode.react';
import { Box, Typography } from '@shared/ui/primitives';

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
  font-size: 90pt;
  font-weight: bold;
  margin-bottom: 3mm;
`;
const CodeWrapper = styled.div`
  position: relative;
`;
const CodeIndex = styled(Typography)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  margin: auto;
  height: 24px;
  width: 24px;
  text-align: center;
  line-height: 24px;
  font-weight: bold;
`;

type Props = {};

// let titleSizes: Record<string, string> = {};
// const setTitleSizes = (id: string, size: string) => {
//   titleSizes = { ...titleSizes, [id]: size };
// };

export const ARListPage = ({}: Props) => {
  // const [titleSizes, setTitleSizes] = useState<Record<string, string>>({});
  // const [titleSizes, setTitleSizes] = useState<Record<string, string>>({});
  return (
    <Wrapper>
      {[1, 2, 3, 4, 5, 6].map(item => {
        return (
          <CodeCard key={item}>
            <CodeWrapper>
              <QRCodeSVG
                value={`https://over-over.github.io/nabrosok-ar/${item}`}
                size={141}
                bgColor={'#ffffff'}
                fgColor={'#000000'}
                level={'H'}
                style={{ minWidth: 141, zIndex: 0 }}
                imageSettings={{
                  src: '',
                  x: undefined,
                  y: undefined,
                  height: 24,
                  width: 24,
                  excavate: true,
                }}
              />
              <CodeIndex variant="caption">{item}</CodeIndex>
            </CodeWrapper>
            <WorkInfo>
              <Title>AR</Title>
            </WorkInfo>
          </CodeCard>
        );
      })}
    </Wrapper>
  );
};
