import {Config, Item} from '../types';
import {formatMoney} from '../utils/formatMoney';
import {groupBy} from './groupBy';

const itemRowTotal = (
  {quantity, hoursPer, costPer, eighths, rentalCost}: Item,
  {hourlyRate, dumpFeePerEighth, dumpHoursPerEighth}: Config,
) =>
  quantity
    ? quantity * (costPer + hoursPer * hourlyRate) +
      eighths * (dumpFeePerEighth + dumpHoursPerEighth * hourlyRate) +
      rentalCost
    : 0;

export const itemRowCalc = (item: Item, config: Config) => {
  if (!item.quantity) return '';

  const {quantity, hoursPer, costPer, eighths, rentalCost} = item;
  const {hourlyRate, dumpFeePerEighth, dumpHoursPerEighth} = config;

  const cp = costPer ? formatMoney(costPer) + ' + ' : '';
  const dump = eighths
    ? ` + ${eighths} × (${formatMoney(dumpFeePerEighth)} + ${dumpHoursPerEighth} hr × ${formatMoney(hourlyRate)}/hr)`
    : '';
  const rental = rentalCost ? ` + ${formatMoney(rentalCost)} rental` : '';
  const total = formatMoney(itemRowTotal(item, config));

  return `${quantity} × (${cp}${hoursPer} hr × ${formatMoney(hourlyRate)}/hr)${dump}${rental} = ${total}`;
};

const getEfeeCount = (config: Config) => {
  const groups = groupBy(
    config.items.filter((item) => item.quantity > 0),
    (item) => item.location + '|' + item.category,
  );
  return Object.keys(groups).length;
};

const getBhCount = (config: Config) =>
  config.items
    .map(
      (item) =>
        item.quantity * item.hoursPer +
        (item.quantity ? 1 : 0) * (item.eighths * config.dumpHoursPerEighth),
    )
    .reduce((a, b) => a + b, 0);

const getSupplyCost = (config: Config) =>
  config.items
    .map((item) => item.quantity * item.costPer)
    .reduce((a, b) => a + b, 0);

const getEighths = (config: Config) =>
  config.items
    .map((item) => (item.quantity ? 1 : 0) * item.eighths)
    .reduce((a, b) => a + b, 0);

const getRentalCost = (config: Config) =>
  config.items
    .map((item) => (item.quantity ? 1 : 0) * item.rentalCost)
    .reduce((a, b) => a + b, 0);

export const getEstimateTotals = (config: Config) => {
  const efeeCount = getEfeeCount(config);
  const bhCount = getBhCount(config);
  const supplyCost = getSupplyCost(config);
  const rentalCost = getRentalCost(config);
  const eighths = getEighths(config);

  const {estimatorFee, hourlyRate, dumpFeePerEighth} = config;

  const total =
    efeeCount * estimatorFee +
    bhCount * hourlyRate +
    supplyCost +
    rentalCost +
    eighths * dumpFeePerEighth;

  const otherCalculation =
    efeeCount * estimatorFee +
    config.items
      .map((item) => itemRowTotal(item, config))
      .reduce((a, b) => a + b, 0);
  if (total.toFixed(2) !== otherCalculation.toFixed(2)) {
    throw new Error(`${total} should equal ${otherCalculation}`);
  }

  return {total, efeeCount, eighths, supplyCost, bhCount, rentalCost};
};
