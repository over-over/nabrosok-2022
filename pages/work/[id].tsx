import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import works from '../../data/works.json';

type Props = {
  artistData: any;
};

const Work = ({ artistData }: Props) => {
  const router = useRouter();
  const { id } = router.query;
  console.log(router);

  return (
    <>
      <p>Work: {JSON.stringify(router)}</p>
      <p>Router: {id}</p>
      <p>ID: {JSON.stringify(artistData)}</p>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const artistData = works[id as keyof typeof works];
  return {
    props: {
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
