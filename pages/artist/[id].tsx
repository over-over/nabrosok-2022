import { GetStaticPaths, GetStaticProps } from 'next';

import { TArtistDetails } from '@shared/lib';
import { ArtistPage } from '@pages/artist';

import artists from '../../data/artists.json';

type Props = {
  artistData: TArtistDetails;
};

const Artist = ({ artistData }: Props) => {
  return <ArtistPage artistData={artistData} />;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const artistData = artists[id as keyof typeof artists];
  return {
    props: {
      artistData,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(artists).map(key => ({ params: { id: key } }));
  return {
    paths,
    fallback: false,
  };
};

export default Artist;
