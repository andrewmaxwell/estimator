import {read, utils} from 'xlsx';
import {Config} from './types';

const url =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vRMHHIRd9xyZBDVBkTO6unfr4zJ6lsAnnHv0ehFBh6wbquIFuUGbZWIlA4Qy4iEHZrCTZri_v8DEw1E/pub?output=xlsx';

export const loadData = async () => {
  const response = await fetch(url);
  const {Sheets} = read(await response.arrayBuffer(), {cellDates: true});

  return {
    ...(utils.sheet_to_json(Sheets.vars)[0] as any),
    items: utils
      .sheet_to_json(Sheets.items)
      .map((row: any) => ({...row, quantity: 0, eighths: 0}))
      .flatMap((row) => [
        {...row, location: 'front'},
        {...row, location: 'back'},
      ])
      .map((row, index) => ({...row, index})),
  } as Config;
};
