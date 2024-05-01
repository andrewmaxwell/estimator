import {Accordion, AccordionDetails, AccordionSummary} from '@mui/material';
import {ItemTable} from './ItemTable';
import {Config} from '../types';
import {ExpandMore} from '@mui/icons-material';
import {getItemCounts} from '../utils/getItemCounts';

type LocationAccordionProps = {
  location: string;
  config: Config;
  setQuantity: (index: number, quantity: number) => void;
};

export const LocationAccordion = ({
  location,
  config,
  setQuantity,
}: LocationAccordionProps) => {
  const items = config.items.filter((r) => r.location === location);
  const counts = getItemCounts(items);
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        sx={{textTransform: 'capitalize'}}
      >
        {location} Yard Installation {counts ? `(${counts})` : ''}
      </AccordionSummary>
      <AccordionDetails>
        <ItemTable items={items} config={config} setQuantity={setQuantity} />
      </AccordionDetails>
    </Accordion>
  );
};
