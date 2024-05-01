export type Item = {
  name: string;
  category: 'install' | 'clean up';
  // subCategory: string; // not used currently
  hoursPer: number;
  costPer: number;
  // unit: string; // not used currently
  location: 'front' | 'back';
  index: number;
  trailer: number;
  rentalCost: number;

  // added on
  quantity: number;
  eighths: number;
};

export type Config = {
  items: Item[];
  hourlyRate: number;
  estimatorFee: number;
  dumpHoursPerEighth: number;
  dumpFeePerEighth: number;
};
