import { writeFileSync } from 'fs';
import { join } from 'path';

import artists from '../../data/artists.json';
import works from '../../data/works.json';
import { TArtistDetails, TWorkDetails } from '../../src/shared/lib';

const OUTPUT_FOLDER = join(__dirname, '../../public/images');

// ORIGINAL
// https://drive.google.com/file/d/1sPHb15ARQZos-NYQt2k6rbD7aJ9-5cxf/view

// DOWNLOAD
// https://drive.google.com/u/0/uc?id=1sPHb15ARQZos-NYQt2k6rbD7aJ9-5cxf&export=download

const downloadImage = async (link: string, outputName: string) => {
  const imageId = link.replace(/^.+id=/, '');
  const downloadLink = `https://drive.google.com/u/0/uc?id=${imageId}&export=download`;

  try {
    const imageResponse = await fetch(downloadLink);
    const blob = await imageResponse.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer);
    writeFileSync(outputName, imageBuffer);
    console.log('downloaded and saved image:', outputName);
  } catch (error) {
    console.error('failed to download image:', outputName, error);
  }
};

const fetchImages = async () => {
  const artistLinkQueue = (Object.values(artists) as TArtistDetails[]).reduce(
    (acc, item) => {
      if (item?.photo?.externalURI && !item?.photo?.localURI) {
        acc.push({
          id: item.id,
          link: item.photo.externalURI,
        });
      }
      return acc;
    },
    [] as { id: string; link: string }[],
  );
  const workLinkQueue = (Object.values(works) as TWorkDetails[]).reduce(
    (acc, item) => {
      if (item?.photo?.externalURI && !item?.photo?.localURI) {
        acc.push({
          id: item.id,
          link: item.photo.externalURI,
        });
      }
      return acc;
    },
    [] as { id: string; link: string }[],
  );

  for (const item of artistLinkQueue) {
    const path = `${OUTPUT_FOLDER}/artists/artist-${item.id}.jpg`;
    try {
      console.log(path);
      await downloadImage(item.link, path);
    } catch (error) {
      console.log('failed to download artist image');
    }
  }

  for (const item of workLinkQueue) {
    const path = `${OUTPUT_FOLDER}/works/work-${item.id}.jpg`;
    try {
      await downloadImage(item.link, path);
    } catch (error) {
      console.log('failed to download work image');
    }
  }
};

fetchImages();
