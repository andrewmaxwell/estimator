import {Button, TableCell, TextField} from '@mui/material';
import {Item} from '../types';
import {Add, Remove} from '@mui/icons-material';

type NumberInputProps = {
  label: string;
  item: Item;
  prop: keyof Item;
  setItemValue: (prop: string, index: number, quantity: number) => void;
  disabled?: boolean;
};
export const NumberInput = ({
  label,
  prop,
  item,
  setItemValue,
  disabled,
}: NumberInputProps) => (
  <TableCell sx={{width: '10%'}}>
    {!disabled && (
      <>
        <TextField
          type="number"
          label={label}
          onChange={(e) => setItemValue(prop, item.index, +e.target.value)}
          inputProps={{min: 0}}
          value={item[prop]}
          fullWidth
        />

        <Button
          onClick={() => setItemValue(prop, item.index, +item[prop] + 1)}
          sx={{width: '50%'}}
        >
          <Add />
        </Button>

        <Button
          onClick={() =>
            setItemValue(prop, item.index, Math.max(0, +item[prop] - 1))
          }
          sx={{width: '50%'}}
        >
          <Remove />
        </Button>
      </>
    )}
  </TableCell>
);
