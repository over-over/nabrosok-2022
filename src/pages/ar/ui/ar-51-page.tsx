import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';
// import 'mind-ar/dist/mindar-image.prod.js';
// import 'aframe';
// import 'mind-ar/dist/mindar-image-aframe.prod.js';

const IMAGE_PREFIX =
  process.env.NODE_ENV === 'production' ? '/nabrosok-2022' : '';

const ARPage = () => {
  const sceneRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sceneEl = sceneRef.current;
    if (sceneEl) {
      console.log(sceneEl);
      const arSystem = sceneEl.systems['mindar-image-system'];
      sceneEl.addEventListener('renderstart', () => {
        arSystem.start(); // start AR
      });
      return () => {
        arSystem?.stop();
      };
    }
  }, []);

  // if (!visible) {
  //   return <button onClick={() => setVisible(true)}>make visible</button>;
  // }

  return (
    <a-scene
      ref={sceneRef}
      mindar-image="imageTargetSrc: ../ar/mind/targets-51.mind; autoStart: true; uiLoading: no; uiError: no; uiScanning: no;"
      color-space="sRGB"
      embedded
      renderer="colorManagement: true, physicallyCorrectLights"
      vr-mode-ui="enabled: false"
      device-orientation-permission-ui="enabled: false"
    >
      <a-assets>
        <img id="card" src={IMAGE_PREFIX + '/images-max/works/work-51.jpg'} />
        <a-asset-item
          id="avatarModel"
          src="./ar/models/sun.gltf"
        ></a-asset-item>
      </a-assets>

      <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

      <a-entity mindar-image-target="targetIndex: 0">
        <a-plane
          src="#card"
          position="0 0 0"
          height="0.552"
          width="1"
          rotation="0 0 0"
        ></a-plane>
        <a-gltf-model
          rotation="0 0 0 "
          position="0 0 0.1"
          scale="0.005 0.005 0.005"
          src="#avatarModel"
          animation="property: position; to: 0 0.1 0.1; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate"
        ></a-gltf-model>
      </a-entity>
    </a-scene>
  );

  // return (
  //   <a-scene
  //     ref={sceneRef}
  //     mindar-image="imageTargetSrc: https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.0.0/examples/image-tracking/assets/card-example/card.mind; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;"
  //     color-space="sRGB"
  //     // embedded
  //     renderer="colorManagement: true, physicallyCorrectLights"
  //     vr-mode-ui="enabled: false"
  //     device-orientation-permission-ui="enabled: false"
  //   >
  //     <a-assets>
  //       <img
  //         id="card"
  //         src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.0.0/examples/image-tracking/assets/card-example/card.png"
  //       />
  //       <a-asset-item
  //         id="avatarModel"
  //         src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.0.0/examples/image-tracking/assets/card-example/softmind/scene.gltf"
  //       ></a-asset-item>
  //     </a-assets>

  //     <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

  //     <a-entity mindar-image-target="targetIndex: 0">
  //       <a-plane
  //         src="#card"
  //         position="0 0 0"
  //         height="0.552"
  //         width="1"
  //         rotation="0 0 0"
  //       ></a-plane>
  //       <a-gltf-model
  //         rotation="0 0 0 "
  //         position="0 0 0.1"
  //         scale="0.005 0.005 0.005"
  //         src="#avatarModel"
  //         animation="property: position; to: 0 0.1 0.1; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate"
  //       ></a-gltf-model>
  //     </a-entity>
  //   </a-scene>
  // );
};

export const AR51Page = () => {
  return (
    <div>
      <ARPage />
      <Head>
        <script src="https://cdn.jsdelivr.net/npm/mind-ar@1.1.4/dist/mindar-image.prod.js"></script>
        <script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/mind-ar@1.1.4/dist/mindar-image-aframe.prod.js"></script>
      </Head>
    </div>
  );
};

export default AR51Page;

// import { useEffect, useRef } from 'react';
// import 'mind-ar/dist/mindar-image.prod.js';
// import 'aframe';
// import 'mind-ar/dist/mindar-image-aframe.prod.js';

// type Props = {};

// const IMAGE_PREFIX =
//   process.env.NODE_ENV === 'production' ? '/nabrosok-2022' : '';

// export const AR51Page = ({}: Props) => {
//   const sceneRef = useRef(null);

//   useEffect(() => {
//     const sceneEl = sceneRef.current as any;
//     const arSystem = sceneEl.systems['mindar-image-system'];
//     sceneEl.addEventListener('renderstart', () => {
//       arSystem.start(); // start AR
//     });
//     return () => {
//       arSystem.stop();
//     };
//   }, []);

//   return (
//     <a-scene
//       ref={sceneRef}
//       mindar-image="imageTargetSrc: ../lib/mind/targets-51.mind; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;"
//       color-space="sRGB"
//       embedded
//       renderer="colorManagement: true, physicallyCorrectLights"
//       vr-mode-ui="enabled: false"
//       device-orientation-permission-ui="enabled: false"
//     >
//       <a-assets>
//         <img id="card" src={`${IMAGE_PREFIX}/images-max/works/work-51.png`} />
//         <a-asset-item
//           id="avatarModel"
//           src="../lib/models/sun.gltf"
//         ></a-asset-item>
//       </a-assets>

//       <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

//       <a-entity mindar-image-target="targetIndex: 0">
//         <a-plane
//           src="#card"
//           position="0 0 0"
//           height="0.552"
//           width="1"
//           rotation="0 0 0"
//         ></a-plane>
//         <a-gltf-model
//           rotation="0 0 0 "
//           position="0 0 0.1"
//           scale="0.005 0.005 0.005"
//           src="#avatarModel"
//           animation="property: position; to: 0 0.1 0.1; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate"
//         ></a-gltf-model>
//       </a-entity>
//     </a-scene>
//   );
// };
