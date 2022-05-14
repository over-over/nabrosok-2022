import { writeFileSync } from 'fs';
import { join } from 'path';
import spreadsheet from '../../data/spreadsheet.json';
import worksJSON from '../../data/works.json';
import { TWorkDetails } from '../../src/shared/lib';

const WORKS_OUTPUT_PATH = join(__dirname, '../../data/works.json');

const updatePrices = () => {
  let mapWorksByURI: Record<string, TWorkDetails> = {};
  (Object.values(worksJSON) as TWorkDetails[]).forEach(item => {
    if (item?.photo?.externalURI) {
      mapWorksByURI[item.photo.externalURI] = item;
    }
  });

  const rows = spreadsheet.table.rows;
  const works = rows.map(row => row.c.slice(9));
  works.forEach(item => {
    // console.log(item.length);
    item.forEach((cell, cellIndex) => {
      if (cellIndex % 8 === 1) {
        const externalURI = String(item[cellIndex]?.v);
        if (externalURI) {
          // console.log('externalURI', cell);
        }
        const workInfo = mapWorksByURI[externalURI] as TWorkDetails | undefined;
        if (workInfo) {
          // console.log('workInfo', externalURI);
          const size = item[cellIndex + 4]?.v;
          const auction = item[cellIndex + 5]?.f
            ? { price: item[cellIndex + 5].f, link: '' }
            : undefined;
          if (auction) {
            const workId = workInfo.id;
            worksJSON[workId].auction = auction;
          }
          if (size) {
            const workId = workInfo.id;
            worksJSON[workId].size = size;
          }
        }
      }
      if (cellIndex % 8 === 7 && item[cellIndex] !== null) {
        return;
      }
    });
  });

  writeFileSync(WORKS_OUTPUT_PATH, JSON.stringify(worksJSON));
};

updatePrices();
