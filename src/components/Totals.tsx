import {Paper, Typography} from '@mui/material';
import {Config} from '../types';
import {groupBy} from '../utils/groupBy';
import {formatMoney} from '../utils/formatMoney';
import {getItemCounts} from '../utils/getItemCounts';

const getEfeeCount = (config: Config) => {
  const groups = groupBy(
    config.items.filter((item) => item.quantity > 0),
    (item) => item.location + '|' + item.category,
  );
  return Object.keys(groups).length;
};

const getBhCount = (config: Config) =>
  config.items
    .map((item) => item.quantity * item.hoursPer)
    .reduce((a, b) => a + b, 0);

const getSupplyCost = (config: Config) =>
  config.items
    .map((item) => item.quantity * item.costPer)
    .reduce((a, b) => a + b, 0);

type TotalsProps = {
  config: Config;
};
export const Totals = ({config}: TotalsProps) => {
  const efeeCount = getEfeeCount(config);
  const bhCount = getBhCount(config);
  const supplyCost = getSupplyCost(config);
  return (
    <Paper elevation={2} sx={{mt: 4, mb: 4, p: 2}}>
      <Typography variant="h4">Totals</Typography>
      <Typography>
        Estimator Fee: {efeeCount} (
        {formatMoney(efeeCount * config.estimatorFee)})
      </Typography>
      <Typography>Supplies: {getItemCounts(config.items)}</Typography>
      <Typography>Total Supply Cost: {formatMoney(supplyCost)}</Typography>
      <Typography>
        Total BH: {bhCount} hours (
        {formatMoney(bhCount * config.hourlyRate) +
          ' @ ' +
          formatMoney(config.hourlyRate)}
        /hr)
      </Typography>
      <Typography variant="h6">
        Total Estimate:{' '}
        {formatMoney(
          efeeCount * config.estimatorFee +
            bhCount * config.hourlyRate +
            supplyCost,
        )}
      </Typography>
    </Paper>
  );
};
