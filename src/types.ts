type Item = {
  name: string;
  category: string;
  subCategory: string;
  hoursPer: number;
  costPer: number;
  unit: string;
  quantity: number;
};

export type Config = {
  items: Item[];
  hourlyRate: number;
};
