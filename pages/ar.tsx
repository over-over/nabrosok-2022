import { GetStaticProps } from 'next';
// import 'mind-ar/dist/mindar-image.prod.js';
// import 'aframe';
// import 'mind-ar/dist/mindar-image-aframe.prod.js';
import dynamic from 'next/dynamic';
import { AR51Page } from '@pages/ar';
import Head from 'next/head';

type Props = {};

// export const AR = ({}: Props) => {
//   return (
//     <div>
//       <AR51Page />
//       <Head>
//         <script src="https://cdn.jsdelivr.net/npm/mind-ar@1.1.4/dist/mindar-image.prod.js"></script>
//         <script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
//         <script src="https://cdn.jsdelivr.net/npm/mind-ar@1.1.4/dist/mindar-image-aframe.prod.js"></script>
//       </Head>
//     </div>
//   );
// };

const DynamicComponentWithNoSSR = dynamic(
  () => import('../src/pages/ar/ui/ar-51-page'),
  {
    ssr: false,
  },
);

export default () => <DynamicComponentWithNoSSR />;
