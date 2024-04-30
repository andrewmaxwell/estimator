import {
  Box,
  CircularProgress,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import {loadData} from './loadData';
import {useEffect, useState} from 'react';
import {Config} from './types';
import {Add, Remove} from '@mui/icons-material';

const Estimator = () => {
  const [config, setConfig] = useState<Config>();
  useEffect(() => {
    loadData().then(setConfig);
  }, []);

  // console.log('config', config);

  if (!config) return <CircularProgress size={72} />;

  const setQuantity = (name: string, quantity: number) =>
    setConfig((config) =>
      config
        ? {
            ...config,
            items: config?.items.map((row) =>
              row.name === name ? {...row, quantity} : row,
            ),
          }
        : config,
    );

  return (
    <>
      <Typography variant="h2">Estimator</Typography>
      <Table>
        <TableBody>
          {config.items.map(({name, hoursPer, costPer, unit, quantity}) => (
            <TableRow key={name}>
              <TableCell sx={{width: '10%'}}>
                <Box display="flex" alignItems="center">
                  <TextField
                    type="number"
                    label="Quantity"
                    onChange={(e) => setQuantity(name, +e.target.value)}
                    inputProps={{min: 0}}
                    value={quantity}
                    fullWidth
                  />
                </Box>
              </TableCell>
              <TableCell sx={{width: '5%'}}>
                <IconButton onClick={() => setQuantity(name, quantity + 1)}>
                  <Add />
                </IconButton>
              </TableCell>
              <TableCell sx={{width: '5%'}}>
                {quantity > 0 && (
                  <IconButton onClick={() => setQuantity(name, quantity - 1)}>
                    <Remove />
                  </IconButton>
                )}
              </TableCell>
              <TableCell sx={{width: '30%'}}>
                <Typography>{name}</Typography>
              </TableCell>
              <TableCell sx={{width: '50%'}}>
                <Typography>
                  {quantity
                    ? `${quantity} * (${hoursPer} hrs * $${config.hourlyRate.toFixed(2)} / hr + $${costPer.toFixed(2)} / ${unit}) = $${(quantity * (hoursPer * config.hourlyRate + costPer)).toFixed(2)}`
                    : ''}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export const App = () => (
  <Box sx={{flexGrow: 1, mt: 10, pb: 10}}>
    <Container maxWidth="xl">
      <Estimator />
    </Container>
  </Box>
);
