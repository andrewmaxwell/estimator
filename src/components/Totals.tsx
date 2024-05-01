import {Paper, Typography} from '@mui/material';
import {Config} from '../types';
import {formatMoney} from '../utils/formatMoney';
import {getItemCounts} from '../utils/getItemCounts';
import {getEstimateTotals} from '../utils/calculations';

type TotalsProps = {
  config: Config;
};
export const Totals = ({config}: TotalsProps) => {
  const {items, estimatorFee, hourlyRate, dumpFeePerEighth} = config;
  const {total, efeeCount, eighths, supplyCost, bhCount, rentalCost} =
    getEstimateTotals(config);
  if (!total) return null;
  return (
    <Paper elevation={2} sx={{mt: 4, mb: 4, p: 2}}>
      <Typography variant="h4">Totals</Typography>
      <Typography>
        {`Estimator Fee: ${efeeCount} (${formatMoney(efeeCount * estimatorFee)} @ ${formatMoney(estimatorFee)}/hr)`}
      </Typography>
      <Typography>Supplies: {getItemCounts(items)}</Typography>
      {!!eighths && (
        <Typography>
          Trailer Loads: {eighths / 8} (
          {formatMoney(eighths * dumpFeePerEighth)})
        </Typography>
      )}
      {!!supplyCost && (
        <Typography>Total Supply Cost: {formatMoney(supplyCost)}</Typography>
      )}
      <Typography>
        {`Total Budgeted Hours: ${bhCount} (${formatMoney(bhCount * hourlyRate)} @ ${formatMoney(hourlyRate)}/hr)`}
      </Typography>
      {!!rentalCost && (
        <Typography>{`Rental Cost: ${formatMoney(rentalCost)}`}</Typography>
      )}
      <Typography variant="h6">Grand Total: {formatMoney(total)}</Typography>
    </Paper>
  );
};
