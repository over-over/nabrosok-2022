import { GetStaticProps } from 'next';

import { QRListPage } from '@pages/qr-list';

type Props = {};

export const QR = ({}: Props) => {
  return <QRListPage />;
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    // returns the default 404 page with a status code of 404 in production
    notFound: process.env.NODE_ENV === 'production',
  };
};

export default QR;
