import type { NextPage } from 'next';
import Head from 'next/head';

import { HomePage } from '@pages/home';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Главная страница</title>
      </Head>
      <HomePage />
    </>
  );
};

export default Home;
