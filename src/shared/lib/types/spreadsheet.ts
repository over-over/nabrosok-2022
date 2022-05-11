export type TSpreadsheetCol = {
  id: string;
  label: string;
  type: string;
  pattern?: string;
};
export type TSpreadsheetRowData = {
  v: string | number | boolean | null;
  f?: string;
};
export type TSpreadsheetRow = {
  c?: null | Array<TSpreadsheetRowData>;
};

export type TSpreadsheetData = {
  reqId: string;
  sig: string;
  status: string;
  table: {
    cols: Array<TSpreadsheetCol>;
    rows: Array<TSpreadsheetRow>;
    parsedNumHeaders: number;
  };
  version: string;
};

export type TAuctionData = {
  price: string;
  link: string;
};

export type TWorkDetails = {
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

export type TSpreadsheetImage = {
  localURI: string;
  externalURI: string;
};

export type TArtistDetails = {
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
