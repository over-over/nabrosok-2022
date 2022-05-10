import { writeFileSync } from 'fs';
import { join } from 'path';

import data from '../../data/spreadsheet.json';

const ARTISTS_OUTPUT_PATH = join(__dirname, '../../data/artists.json');
const WORKS_OUTPUT_PATH = join(__dirname, '../../data/works.json');

type TAuctionData = {
  price: string;
  link: string;
};

type TWorkDetails = {
  id: string;
  artistId: string;
  name: string;
  photo?: TSpreadsheetImage;
  technique?: string;
  year?: string;
  description?: string;
  size?: string;
  auction?: TAuctionData;
};

type TSpreadsheetImage = {
  localURI: string;
  externalURI: string;
};

type TArtistDetails = {
  id: string;
  name: string;
  style: string;
  biography?: string;
  birthDate?: string;
  photo?: TSpreadsheetImage;
  email?: string;
  vk?: string;
  telegram?: string;
  works: TWorkDetails[];
};

type TArtistData = Record<number, TArtistDetails>;

let globalWorkId = 0;

const getArtistData = () => {
  let allWorks: Record<number, TWorkDetails> = {};
  const result: TArtistData = {};

  data.table.rows.forEach((values, index) => {
    const workDetails: Record<number, TWorkDetails> = {};
    const works = values.c.slice(9);
    let workId = 0;
    for (let workIndex = 0; workIndex < works.length; workIndex++) {
      if (workIndex % 8 === 0) {
        if (workIndex > 0) {
          workId++;
          globalWorkId++;
        }
        workDetails[String(globalWorkId)] = {
          id: String(globalWorkId),
          artistId: String(index),
          name: String(works[workIndex].v),
        };
      }
      if (workIndex % 8 === 1) {
        workDetails[globalWorkId].photo = works[workIndex]?.v
          ? {
              externalURI: String(works[workIndex].v),
              localURI: '',
            }
          : undefined;
      }
      if (workIndex % 8 === 2) {
        workDetails[globalWorkId].technique = works[workIndex]?.v
          ? String(works[workIndex].v)
          : undefined;
      }
      if (workIndex % 8 === 3) {
        workDetails[globalWorkId].year = works[workIndex]?.f
          ? String(works[workIndex].f)
          : undefined;
      }
      if (workIndex % 8 === 4) {
        workDetails[globalWorkId].description = works[workIndex]?.v
          ? String(works[workIndex].v)
          : undefined;
      }
      if (workIndex % 8 === 5) {
        workDetails[globalWorkId].size = works[workIndex]?.v
          ? String(works[workIndex].v)
          : undefined;
      }
      if (workIndex % 8 === 6) {
        workDetails[globalWorkId].auction = works[workIndex]?.f
          ? { price: works[workIndex].f, link: '' }
          : undefined;
      }
      if (workIndex % 8 === 7 && works[workIndex] !== null) {
        break;
      }
    }

    result[index] = {
      id: String(index),
      name: values.c[1]?.v ? String(values.c[1].v) : undefined,
      style: values.c[2]?.v ? String(values.c[2].v) : undefined,
      biography: values.c[3]?.v ? String(values.c[3].v) : undefined,
      birthDate: values.c[4]?.v
        ? values.c[4]?.f.split('.').reverse().join('-') + 'T00:00:00.000Z'
        : undefined,
      photo: values.c[5]?.v
        ? {
            externalURI: String(values.c[5].v),
            localURI: '',
          }
        : undefined,
      email: values.c[6]?.v ? String(values.c[6].v) : undefined,
      vk: values.c[7]?.v ? String(values.c[7].v) : undefined,
      telegram: values.c[8]?.v ? String(values.c[8].v) : undefined,
      works: Object.values(workDetails),
    };

    allWorks = { ...allWorks, ...workDetails };
  });

  writeFileSync(ARTISTS_OUTPUT_PATH, JSON.stringify(result));
  writeFileSync(WORKS_OUTPUT_PATH, JSON.stringify(allWorks));
  console.log('Successefuly saved artist and works data as JSON files');
};

getArtistData();
