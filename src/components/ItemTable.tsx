import {Table, TableBody, TableCell, TableRow, Typography} from '@mui/material';
import {Config, Item} from '../types';

import {NumberInput} from './NumberInput';
import {itemRowCalc} from '../utils/calculations';

type ItemTableProps = {
  items: Item[];
  config: Config;
  setItemValue: (prop: string, index: number, quantity: number) => void;
};
export const ItemTable = ({items, config, setItemValue}: ItemTableProps) => (
  <Table>
    <TableBody>
      {items.map((item) => (
        <TableRow key={item.name}>
          <NumberInput
            label="Quantity"
            prop="quantity"
            item={item}
            setItemValue={setItemValue}
          />
          {item.category === 'clean up' && (
            <NumberInput
              label="1/8ths"
              prop="eighths"
              item={item}
              setItemValue={setItemValue}
              disabled={!item.trailer}
            />
          )}
          <TableCell sx={{width: '30%'}}>
            <Typography>{item.name}</Typography>
          </TableCell>
          <TableCell sx={{width: '40%'}}>
            <Typography>{itemRowCalc(item, config)}</Typography>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
