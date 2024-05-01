import {Item} from '../types';
import {groupBy} from './groupBy';

export const getItemCounts = (items: Item[]) =>
  Object.entries(groupBy(items, (item) => item.name))
    .map(([name, items]) => ({
      quantity: items.reduce((sum, item) => sum + item.quantity, 0),
      name,
    }))
    .filter((item) => item.quantity > 0)
    .map((item) => `${item.quantity} ${item.name}`)
    .join(', ');
