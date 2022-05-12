import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { TArtistDetails } from '@shared/lib';

import artists from '../../data/artists.json';

type Props = {
  artistData: TArtistDetails;
};

const Artist = ({ artistData }: Props) => {
  const router = useRouter();
  const { id } = router.query;
  console.log(router);

  return (
    <>
      <p>Artist: {JSON.stringify(router)}</p>
      <p>Router: {id}</p>
      <p>ID: {JSON.stringify(artistData)}</p>
    </>
  );
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
