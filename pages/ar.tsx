import { GetStaticProps } from 'next';

import { ARListPage } from '@pages/ar-list';

type Props = {};

export const AR = ({}: Props) => {
  return <ARListPage />;
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    // returns the default 404 page with a status code of 404 in production
    notFound: process.env.NODE_ENV === 'production',
  };
};

export default AR;
