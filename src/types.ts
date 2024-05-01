export type Item = {
  name: string;
  category: string;
  subCategory: string;
  hoursPer: number;
  costPer: number;
  unit: string;
  quantity: number;
  location: 'front' | 'back';
  index: number;
};

export type Config = {
  items: Item[];
  hourlyRate: number;
  estimatorFee: number;
};
