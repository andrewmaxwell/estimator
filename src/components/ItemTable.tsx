import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import {Config, Item} from '../types';
import {Add, Remove} from '@mui/icons-material';
import {formatMoney} from '../utils/formatMoney';

const itemRowCalc = (
  {quantity, hoursPer, costPer, unit}: Item,
  {hourlyRate}: Config,
) =>
  quantity
    ? `${quantity} * (${hoursPer} hrs * ${formatMoney(hourlyRate)} / hr + ${formatMoney(costPer)} / ${unit}) = ${formatMoney(quantity * (hoursPer * hourlyRate + costPer))}`
    : '';

type ItemTableProps = {
  items: Item[];
  config: Config;
  setQuantity: (index: number, quantity: number) => void;
};
export const ItemTable = ({items, config, setQuantity}: ItemTableProps) => (
  <Table>
    <TableBody>
      {items.map((item) => (
        <TableRow key={item.name}>
          <TableCell sx={{width: '10%'}}>
            <Box display="flex" alignItems="center">
              <TextField
                type="number"
                label="Quantity"
                onChange={(e) => setQuantity(item.index, +e.target.value)}
                inputProps={{min: 0}}
                value={item.quantity}
                fullWidth
              />
            </Box>
          </TableCell>
          <TableCell sx={{width: '5%'}}>
            <IconButton
              onClick={() => setQuantity(item.index, item.quantity + 1)}
            >
              <Add />
            </IconButton>
          </TableCell>
          <TableCell sx={{width: '5%'}}>
            {item.quantity > 0 && (
              <IconButton
                onClick={() => setQuantity(item.index, item.quantity - 1)}
              >
                <Remove />
              </IconButton>
            )}
          </TableCell>
          <TableCell sx={{width: '30%'}}>
            <Typography>{item.name}</Typography>
          </TableCell>
          <TableCell sx={{width: '50%'}}>
            <Typography>{itemRowCalc(item, config)}</Typography>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
