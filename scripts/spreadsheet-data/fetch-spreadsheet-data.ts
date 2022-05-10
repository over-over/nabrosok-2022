import { writeFileSync } from 'fs';
import { join } from 'path';

const SPREADSHEET_ID = '136eT6SdJIkewsnrodINoBJoWMc_XtQmNXNU-aMoaUYc';
const SPREADSHEET_URI = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq`;
const OUTPUT_PATH = join(__dirname, '../../data/spreadsheet.json');

const fetchSpreadsheetData = async () => {
  try {
    const spreadsheetRequest = await fetch(SPREADSHEET_URI);
    const dataText = await spreadsheetRequest.text();
    const formattedJSONText = dataText
      .replace(/\/\*O_o\*\/\ngoogle\.visualization\.Query\.setResponse\(/gm, '')
      .replace(/\);$/gm, '');
    writeFileSync(OUTPUT_PATH, formattedJSONText);
    console.log('Successefuly saved data as JSON file');
  } catch (e) {
    console.error(e, "Couldn't get data from server");
  }
};

fetchSpreadsheetData();
