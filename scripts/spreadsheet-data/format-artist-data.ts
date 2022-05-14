import { writeFileSync, existsSync } from 'fs';
import { join } from 'path';

import data from '../../data/spreadsheet.json';
import worksJSON from '../../data/works.json';
import { TArtistDetails, TWorkDetails } from '../../src/shared/lib';

const ARTISTS_OUTPUT_PATH = join(__dirname, '../../data/artists.json');
const WORKS_OUTPUT_PATH = join(__dirname, '../../data/works.json');
const PUBLIC_FOLDER = join(__dirname, '../../public');

type TArtistData = Record<number, TArtistDetails>;

let globalWorkId = 0;

const newGlobalWorkId = Object.keys(worksJSON).length;
let brokenWorkAmount = 0;
let normalWorkId: number;

const getArtistData = () => {
  let allWorks: Record<number, TWorkDetails> = {};
  const result: TArtistData = {};

  data.table.rows.forEach((values, index) => {
    const workDetails: Record<number, TWorkDetails> = {};
    const works = values.c.slice(9);
    for (let workIndex = 0; workIndex < works.length; workIndex++) {
      if (workIndex % 8 === 0) {
        if (workIndex > 0) {
          // if (normalWorkId !== undefined) {
          //   globalWorkId = normalWorkId;
          //   normalWorkId = undefined;
          // } else {
          globalWorkId++;
          // }
        }
        const brokenWork =
          worksJSON[globalWorkId as unknown as keyof typeof worksJSON];
        // change sometimes
        if (
          true &&
          brokenWork &&
          brokenWork.name !== String(works[workIndex].v)
        ) {
          // console.log(
          //   String(works[workIndex].v),
          //   String(works[workIndex + 7].v),
          // );
          // normalWorkId = globalWorkId + 1;
          const brokenGlobalWorkId = newGlobalWorkId + brokenWorkAmount;
          brokenWorkAmount++;

          workDetails[String(brokenGlobalWorkId)] = {
            id: String(brokenGlobalWorkId),
            artistId: String(index),
            name: String(works[workIndex].v),
          };
          const localPhoto = `/images/works/work-${brokenGlobalWorkId}.jpg`;
          const localURI = existsSync(PUBLIC_FOLDER + localPhoto)
            ? localPhoto
            : '';
          workDetails[brokenGlobalWorkId].photo = works[workIndex + 1]?.v
            ? {
                externalURI: String(works[workIndex + 1].v),
                localURI,
              }
            : undefined;
          workDetails[brokenGlobalWorkId].technique = works[workIndex + 2]?.v
            ? String(works[workIndex + 2].v)
            : undefined;

          workDetails[brokenGlobalWorkId].year = works[workIndex + 3]?.f
            ? String(works[workIndex + 3].f)
            : undefined;

          workDetails[brokenGlobalWorkId].description = works[workIndex + 4]?.v
            ? String(works[workIndex + 4].v)
            : undefined;

          workDetails[brokenGlobalWorkId].size = works[workIndex + 5]?.v
            ? String(works[workIndex + 5].v)
            : undefined;

          workDetails[brokenGlobalWorkId].auction = works[workIndex + 6]?.f
            ? { price: works[workIndex + 6].f, link: '' }
            : undefined;

          break;
        }

        workDetails[String(globalWorkId)] = {
          id: String(globalWorkId),
          artistId: String(index),
          name: String(works[workIndex].v),
        };
      }
      if (workIndex % 8 === 1) {
        const localPhoto = `/images/works/work-${globalWorkId}.jpg`;
        const localURI = existsSync(PUBLIC_FOLDER + localPhoto)
          ? localPhoto
          : '';
        workDetails[globalWorkId].photo = works[workIndex]?.v
          ? {
              externalURI: String(works[workIndex].v),
              localURI,
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

    const localPhoto = `/images/artists/artist-${index}.jpg`;
    const localURI = existsSync(PUBLIC_FOLDER + localPhoto) ? localPhoto : '';

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
            localURI,
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
