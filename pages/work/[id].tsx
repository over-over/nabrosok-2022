import { GetStaticPaths, GetStaticProps } from 'next';

import { TArtistDetails, TWorkDetails } from '@shared/lib';
import { WorkPage } from '@pages/work';

import works from '../../data/works.json';
import artists from '../../data/artists.json';

type Props = {
  workData: TWorkDetails;
  artistData: TArtistDetails;
};

const Work = ({ workData, artistData }: Props) => {
  return <WorkPage artistData={artistData} workData={workData} />;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const workData = works[id as keyof typeof works];
  const artistData = artists[workData.artistId as keyof typeof artists];
  return {
    props: {
      workData,
      artistData,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(works).map(key => ({ params: { id: key } }));
  return {
    paths,
    fallback: false,
  };
};

export default Work;
