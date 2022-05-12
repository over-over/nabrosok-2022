import { GetStaticPaths, GetStaticProps } from 'next';

import { TWorkDetails } from '@shared/lib';
import { WorkPage } from '@pages/work';

import works from '../../data/works.json';

type Props = {
  workData: TWorkDetails;
};

const Work = ({ workData }: Props) => {
  // return <div>{JSON.stringify(workData)}</div>;
  return <WorkPage workData={workData} />;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const workData = works[id as keyof typeof works];
  return {
    props: {
      workData,
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
