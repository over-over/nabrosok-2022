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
